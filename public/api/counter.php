<?php
/**
 * GK Nexergy - Hostinger Global Live Visitor & Active User Counter
 * Provides synchronized real-time visitor counting, live concurrent active user tracking,
 * and an administrative analytics dashboard.
 */

// Enable CORS and headers
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
$todayDate = date('Y-m-d');
$activeWindow = 45; // Users active within last 45 seconds

// Default data structure
$data = [
    'count' => 1,
    'total_visitors' => 1,
    'today' => $todayDate,
    'today_visitors' => 1,
    'total_clicks' => 0,
    'sessions' => [],
    'seen_sessions' => [],
    'updated_at' => date('c')
];

if (file_exists($dataFile)) {
    $content = @file_get_contents($dataFile);
    $decoded = json_decode($content, true);
    if (is_array($decoded)) {
        if (isset($decoded['count']) && is_numeric($decoded['count'])) {
            $data['count'] = (int)$decoded['count'];
        }
        if (isset($decoded['total_visitors']) && is_numeric($decoded['total_visitors'])) {
            $data['total_visitors'] = (int)$decoded['total_visitors'];
        } else {
            $data['total_visitors'] = $data['count'];
        }
        if (isset($decoded['today']) && $decoded['today'] === $todayDate) {
            $data['today'] = $todayDate;
            $data['today_visitors'] = isset($decoded['today_visitors']) ? (int)$decoded['today_visitors'] : 1;
        } else {
            $data['today'] = $todayDate;
            $data['today_visitors'] = 1;
        }
        if (isset($decoded['total_clicks']) && is_numeric($decoded['total_clicks'])) {
            $data['total_clicks'] = (int)$decoded['total_clicks'];
        }
        if (isset($decoded['sessions']) && is_array($decoded['sessions'])) {
            $data['sessions'] = $decoded['sessions'];
        }
        if (isset($decoded['seen_sessions']) && is_array($decoded['seen_sessions'])) {
            $data['seen_sessions'] = $decoded['seen_sessions'];
        }
    }
}

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');
$sessionId = isset($_GET['session_id']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['session_id']) : (isset($_POST['session_id']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['session_id']) : '');
$isHtmlRequest = (strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'text/html') !== false) && empty($action) && !isset($_GET['json']);

// Prune expired sessions older than active window
$validSessions = [];
foreach ($data['sessions'] as $sId => $lastSeen) {
    if ($now - (int)$lastSeen < $activeWindow) {
        $validSessions[$sId] = (int)$lastSeen;
    }
}

// Prune seen sessions map if it grows too large (> 5000 items)
if (count($data['seen_sessions']) > 5000) {
    $data['seen_sessions'] = array_slice($data['seen_sessions'], -2000, 2000, true);
}

// Handle action: visit (new visitor arriving)
if ($action === 'visit' && $sessionId) {
    $validSessions[$sessionId] = $now;
    if (!isset($data['seen_sessions'][$sessionId])) {
        $data['seen_sessions'][$sessionId] = $now;
        $data['total_visitors'] += 1;
        if ($data['today'] !== $todayDate) {
            $data['today'] = $todayDate;
            $data['today_visitors'] = 1;
        } else {
            $data['today_visitors'] += 1;
        }
        $data['count'] += 1;
    }
}
// Handle action: leave (tab close / pageunload)
else if ($action === 'leave' && $sessionId) {
    unset($validSessions[$sessionId]);
}
// Handle action: heartbeat
else if ($sessionId) {
    $validSessions[$sessionId] = $now;
}

// Handle action: click / increment
$isClickIncrement = ($action === 'click' || $action === 'increment' || ($_SERVER['REQUEST_METHOD'] === 'POST' && $action !== 'heartbeat' && $action !== 'leave' && $action !== 'visit'));

if ($isClickIncrement) {
    $rawAmount = isset($_GET['amount']) ? (int)$_GET['amount'] : (isset($_POST['amount']) ? (int)$_POST['amount'] : 1);
    $amount = max(1, min(10, $rawAmount));
    $data['count'] += $amount;
    $data['total_clicks'] += $amount;
}

$activeUsers = max(1, count($validSessions));
$data['sessions'] = $validSessions;
$data['updated_at'] = date('c');

@file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);

// If opened directly in browser, show administrative live dashboard
if ($isHtmlRequest || isset($_GET['view'])) {
    header('Content-Type: text/html; charset=utf-8');
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GK Nexergy | Live Visitor & Traffic Analytics</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
                font-family: 'Inter', -apple-system, sans-serif;
                background: #0B1120;
                color: #F8FAFC;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 24px 16px;
            }
            .dashboard-card {
                background: rgba(15, 23, 42, 0.95);
                border: 1px solid rgba(56, 189, 248, 0.25);
                border-radius: 20px;
                padding: 32px 28px;
                max-width: 680px;
                width: 100%;
                box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.12);
            }
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(56, 189, 248, 0.15);
                padding-bottom: 20px;
                margin-bottom: 24px;
                flex-wrap: wrap;
                gap: 12px;
            }
            .brand-title {
                font-family: 'Manrope', sans-serif;
                font-size: 20px;
                font-weight: 800;
                color: #FFFFFF;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .badge-live {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(16, 185, 129, 0.4);
                color: #34D399;
                font-size: 11px;
                font-weight: 700;
                padding: 4px 10px;
                border-radius: 9999px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .pulse-dot {
                width: 8px;
                height: 8px;
                background: #10B981;
                border-radius: 50%;
                box-shadow: 0 0 8px #10B981;
                animation: pulse 1.6s infinite;
            }
            @keyframes pulse {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.4; transform: scale(1.3); }
                100% { opacity: 1; transform: scale(1); }
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
                gap: 14px;
                margin-bottom: 24px;
            }
            .stat-box {
                background: rgba(30, 41, 59, 0.6);
                border: 1px solid rgba(148, 163, 184, 0.12);
                border-radius: 14px;
                padding: 18px 14px;
                text-align: center;
                transition: transform 0.2s ease, border-color 0.2s ease;
            }
            .stat-box:hover {
                transform: translateY(-2px);
                border-color: rgba(56, 189, 248, 0.4);
            }
            .stat-box.primary {
                background: linear-gradient(135deg, rgba(6, 78, 59, 0.45), rgba(15, 23, 42, 0.8));
                border-color: rgba(16, 185, 129, 0.4);
            }
            .stat-label {
                font-size: 11px;
                color: #94A3B8;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.04em;
                margin-bottom: 6px;
            }
            .stat-val {
                font-size: 26px;
                font-weight: 800;
                color: #FFFFFF;
                font-variant-numeric: tabular-nums;
            }
            .stat-val.emerald { color: #34D399; }
            .stat-val.cyan { color: #38BDF8; }
            .footer-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 11.5px;
                color: #64748B;
                padding-top: 16px;
                border-top: 1px solid rgba(56, 189, 248, 0.12);
                flex-wrap: wrap;
                gap: 10px;
            }
            .btn {
                background: rgba(56, 189, 248, 0.15);
                border: 1px solid rgba(56, 189, 248, 0.35);
                color: #38BDF8;
                font-size: 12px;
                font-weight: 600;
                padding: 6px 14px;
                border-radius: 8px;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.2s;
            }
            .btn:hover {
                background: rgba(56, 189, 248, 0.25);
                color: #FFFFFF;
            }
        </style>
    </head>
    <body>
        <div class="dashboard-card">
            <div class="header">
                <div class="brand-title">
                    <span>GK Nexergy Analytics</span>
                    <span class="badge-live"><span class="pulse-dot"></span> Live</span>
                </div>
                <button class="btn" onclick="location.reload()">Refresh Now</button>
            </div>

            <div class="grid">
                <div class="stat-box primary">
                    <div class="stat-label">Active Online</div>
                    <div class="stat-val emerald"><?= number_format($activeUsers) ?></div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Total Visitors</div>
                    <div class="stat-val cyan"><?= number_format($data['total_visitors']) ?></div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Today's Visitors</div>
                    <div class="stat-val"><?= number_format($data['today_visitors']) ?></div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Total Clicks</div>
                    <div class="stat-val"><?= number_format($data['total_clicks']) ?></div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Footer Count</div>
                    <div class="stat-val"><?= number_format($data['count']) ?></div>
                </div>
            </div>

            <div class="footer-info">
                <span>Last updated: <?= htmlspecialchars($data['updated_at']) ?> (auto-refreshing every 5s)</span>
                <a href="/" class="btn">Return to Website</a>
            </div>
        </div>

        <script>
            setTimeout(function() {
                window.location.reload();
            }, 5000);
        </script>
    </body>
    </html>
    <?php
    exit;
}

// Return JSON response for API requests
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'success' => true,
    'active_users' => $activeUsers,
    'count' => (int)$data['count'],
    'total_visitors' => (int)$data['total_visitors'],
    'today_visitors' => (int)$data['today_visitors'],
    'total_clicks' => (int)$data['total_clicks'],
    'updated_at' => $data['updated_at']
]);
