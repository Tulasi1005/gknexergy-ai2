<?php
/**
 * GK Nexergy - Hostinger Global Live Visitor & Active User Counter
 * Provides synchronized real-time visitor counting and live concurrent active user tracking across all devices.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-cache, no-store, must-revalidate');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Storage path: try local directory first, fallback to sys temp dir if not writable
$dataFile = __DIR__ . '/counter.json';
if (!is_writable(__DIR__) && !file_exists($dataFile)) {
    $dataFile = sys_get_temp_dir() . '/gknexergy_counter.json';
}

$now = time();
$activeWindow = 45; // Users active within last 45 seconds

// Default data structure
$data = [
    'count' => 1,
    'sessions' => [],
    'updated_at' => date('c')
];

if (file_exists($dataFile)) {
    $content = @file_get_contents($dataFile);
    $decoded = json_decode($content, true);
    if (is_array($decoded)) {
        if (isset($decoded['count']) && is_numeric($decoded['count'])) {
            $data['count'] = (int)$decoded['count'];
        }
        if (isset($decoded['sessions']) && is_array($decoded['sessions'])) {
            $data['sessions'] = $decoded['sessions'];
        }
    }
}

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');
$sessionId = isset($_GET['session_id']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['session_id']) : (isset($_POST['session_id']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['session_id']) : '');

// Prune expired sessions older than active window
$validSessions = [];
foreach ($data['sessions'] as $sId => $lastSeen) {
    if ($now - (int)$lastSeen < $activeWindow) {
        $validSessions[$sId] = (int)$lastSeen;
    }
}

// Handle tab leave / close
if ($action === 'leave' && $sessionId) {
    unset($validSessions[$sessionId]);
}
// Handle heartbeat or active user presence
else if ($sessionId) {
    $validSessions[$sessionId] = $now;
}

// Handle link click increment
$isClickIncrement = ($action === 'click' || $action === 'increment' || ($_SERVER['REQUEST_METHOD'] === 'POST' && $action !== 'heartbeat' && $action !== 'leave'));

if ($isClickIncrement) {
    $rawAmount = isset($_GET['amount']) ? (int)$_GET['amount'] : (isset($_POST['amount']) ? (int)$_POST['amount'] : 1);
    $amount = max(1, min(10, $rawAmount));
    $data['count'] += $amount;
}

// Ensure at least 1 active user for active requests
$activeUsers = max(1, count($validSessions));
$data['sessions'] = $validSessions;
$data['updated_at'] = date('c');

@file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);

echo json_encode([
    'success' => true,
    'active_users' => $activeUsers,
    'count' => (int)$data['count']
]);
