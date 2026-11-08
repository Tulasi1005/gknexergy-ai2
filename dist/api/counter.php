<?php
/**
 * GK Nexergy - Hostinger Global Live Active User & Visitor Counter
 * 
 * Rules:
 * 1. Opening the link increases the count (+1).
 * 2. Closing the link/tab decreases the count (-1).
 * 3. Clicking anywhere inside the website DOES NOT increase the count.
 * 4. Automatic pruning of sessions older than 35 seconds.
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
$activeWindow = 35; // Sessions expire if no heartbeat for 35 seconds

// Default data structure
$data = [
    'sessions' => [],
    'total_visits' => 1,
    'updated_at' => date('c')
];

if (file_exists($dataFile)) {
    $content = @file_get_contents($dataFile);
    $decoded = json_decode($content, true);
    if (is_array($decoded)) {
        if (isset($decoded['sessions']) && is_array($decoded['sessions'])) {
            $data['sessions'] = $decoded['sessions'];
        }
        if (isset($decoded['total_visits']) && is_numeric($decoded['total_visits'])) {
            $data['total_visits'] = (int)$decoded['total_visits'];
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

// 1. Tab Leave / Close: immediately remove this session to decrease count
if ($action === 'leave' && $sessionId) {
    unset($validSessions[$sessionId]);
}
// 2. Open link / Heartbeat ping: register or refresh session
else if ($sessionId) {
    if (!isset($validSessions[$sessionId])) {
        // Brand new visitor session
        $data['total_visits'] = isset($data['total_visits']) ? $data['total_visits'] + 1 : 1;
    }
    $validSessions[$sessionId] = $now;
}

$activeUsers = count($validSessions);

// If an active visitor is currently connected (and not leaving), active count is at least 1
if ($action !== 'leave' && $activeUsers < 1) {
    $activeUsers = 1;
}

$data['sessions'] = $validSessions;
$data['updated_at'] = date('c');

@file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);

echo json_encode([
    'success' => true,
    'active_users' => $activeUsers,
    'total_visits' => isset($data['total_visits']) ? (int)$data['total_visits'] : $activeUsers
]);
