<?php
/**
 * GK Nexergy - Hostinger Global Live Visitor & Click Counter
 * Provides synchronized real-time visitor counting across all devices worldwide.
 */

// Enable CORS and JSON responses
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-cache, no-store, must-revalidate');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/counter.json';

// Initialize data file if not present
if (!file_exists($dataFile)) {
    @file_put_contents($dataFile, json_encode(['count' => 1, 'updated_at' => date('c')]), LOCK_EX);
}

// Open file with exclusive lock for concurrency safety
$fp = @fopen($dataFile, 'c+');
if (!$fp) {
    echo json_encode(['count' => 1, 'error' => 'Unable to access counter storage']);
    exit;
}

flock($fp, LOCK_EX);

$fileSize = filesize($dataFile);
$content = $fileSize > 0 ? fread($fp, $fileSize) : '';
$data = json_decode($content, true);

if (!is_array($data) || !isset($data['count']) || !is_numeric($data['count'])) {
    $data = ['count' => 1];
}

$currentCount = (int)$data['count'];

// Check if this request is an increment action
$action = isset($_GET['action']) ? $_GET['action'] : '';
$method = $_SERVER['REQUEST_METHOD'];
$isIncrement = ($action === 'click' || $action === 'increment' || $method === 'POST');

if ($isIncrement) {
    // Read optional amount (defaults to 1; supports 2 for double clicks; max 10 to prevent abuse)
    $rawAmount = isset($_GET['amount']) ? (int)$_GET['amount'] : (isset($_POST['amount']) ? (int)$_POST['amount'] : 1);
    $amount = max(1, min(10, $rawAmount));

    $currentCount += $amount;
    $data['count'] = $currentCount;
    $data['updated_at'] = date('c');

    // Rewrite file
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
}

flock($fp, LOCK_UN);
fclose($fp);

echo json_encode([
    'success' => true,
    'count' => $currentCount
]);

