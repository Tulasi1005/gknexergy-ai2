<?php
/**
 * GK Nexergy - Hostinger Global Live Active User & Visitor Counter
 * Concurrency-safe atomic multi-device session tracker.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Cache-Control: no-cache, no-store, must-revalidate');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. Determine storage file path
$dataFile = __DIR__ . '/counter.json';
if (!file_exists($dataFile)) {
    $created = @file_put_contents($dataFile, json_encode(['sessions' => []], JSON_PRETTY_PRINT));
    if ($created === false || !is_writable($dataFile)) {
        $dataFile = sys_get_temp_dir() . '/gknexergy_counter.json';
    }
} else if (!is_writable($dataFile)) {
    $dataFile = sys_get_temp_dir() . '/gknexergy_counter.json';
}

$now = time();
$activeWindow = 25; // 25 seconds sliding window for active devices

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');
$sessionId = isset($_GET['session_id']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['session_id']) : (isset($_POST['session_id']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['session_id']) : '');

$activeUsers = 1;
$totalVisits = 1;

// 2. Open file with exclusive lock for atomic read-modify-write
$fp = @fopen($dataFile, 'c+');
if ($fp) {
    if (flock($fp, LOCK_EX)) {
        $fileSize = filesize($dataFile);
        $content = $fileSize > 0 ? fread($fp, $fileSize) : '';
        $decoded = json_decode($content, true);

        $data = [
            'sessions' => [],
            'total_visits' => 1,
            'updated_at' => date('c')
        ];

        if (is_array($decoded) && isset($decoded['sessions']) && is_array($decoded['sessions'])) {
            $data['sessions'] = $decoded['sessions'];
            if (isset($decoded['total_visits']) && is_numeric($decoded['total_visits'])) {
                $data['total_visits'] = (int)$decoded['total_visits'];
            }
        }

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
        // Handle heartbeat / visitor presence
        else if ($sessionId) {
            if (!isset($validSessions[$sessionId])) {
                $data['total_visits'] = isset($data['total_visits']) ? $data['total_visits'] + 1 : 1;
            }
            $validSessions[$sessionId] = $now;
        }

        $activeUsers = count($validSessions);
        if ($action !== 'leave' && $activeUsers < 1) {
            $activeUsers = 1;
        }

        $totalVisits = isset($data['total_visits']) ? (int)$data['total_visits'] : $activeUsers;
        $data['sessions'] = $validSessions;
        $data['updated_at'] = date('c');

        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
        fflush($fp);
        flock($fp, LOCK_UN);
    }
    fclose($fp);
}

echo json_encode([
    'success' => true,
    'active_users' => $activeUsers,
    'total_visits' => $totalVisits
]);
