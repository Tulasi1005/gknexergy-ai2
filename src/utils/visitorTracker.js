/**
 * Real-Time Live Active Visitors Tracking Utility for GK Nexergy
 * 
 * Rules:
 * 1. Opening the website increases the count (+1).
 * 2. Closing the tab/website decreases the count (-1).
 * 3. Clicking on links/buttons/cards inside the website DOES NOT increase the count.
 * 4. High-frequency 3.5s multi-device heartbeat synchronization for Hostinger and local network.
 * 5. Instant 0ms cross-tab synchronization via BroadcastChannel.
 * 6. Instant leave notification on tab close via sendBeacon.
 */

const ACTIVE_STORAGE_KEY = "gk_active_users_count";
const SESSION_STORAGE_KEY = "gk_device_session_id";

// Primary and fallback endpoints
let resolvedEndpoint = "/api/counter.php";
const CANDIDATE_ENDPOINTS = [
  "/api/counter.php",
  "/public/api/counter.php",
  "/api/counter"
];

let tabSessionId = null;

/**
 * Returns a unique, stable session ID for the current browser tab.
 * Stored in sessionStorage so page refreshes maintain the same session identity.
 */
export function getSessionId() {
  if (typeof window === "undefined") return "gk_srv";

  try {
    let stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) {
      stored = "gk_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
      sessionStorage.setItem(SESSION_STORAGE_KEY, stored);
    }
    return stored;
  } catch {
    if (!tabSessionId) {
      tabSessionId = "gk_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
    }
    return tabSessionId;
  }
}

/**
 * Gets the current count of active users online (minimum 1).
 */
export function getActiveUsers() {
  if (typeof window === "undefined") return 1;

  try {
    let val = parseInt(sessionStorage.getItem(ACTIVE_STORAGE_KEY) || "1", 10);
    return isNaN(val) || val < 1 ? 1 : val;
  } catch {
    return 1;
  }
}

/**
 * Backwards compatibility alias for components expecting getVisitorCount.
 */
export function getVisitorCount() {
  return getActiveUsers();
}

/**
 * Updates active user count and notifies all subscribers.
 */
export function setActiveUsers(count) {
  const safeCount = Math.max(1, count);
  try {
    sessionStorage.setItem(ACTIVE_STORAGE_KEY, String(safeCount));
  } catch { }

  window.dispatchEvent(
    new CustomEvent("gk_active_users_updated", { detail: safeCount })
  );
  window.dispatchEvent(
    new CustomEvent("gk_visitor_count_updated", { detail: safeCount })
  );
}

/**
 * Subscribes to live active users count updates.
 */
export function subscribeActiveUsers(callback) {
  if (typeof window === "undefined") return () => { };

  const handleUpdate = (e) => {
    if (e.detail && typeof e.detail === "number") {
      callback(e.detail);
    } else {
      callback(getActiveUsers());
    }
  };

  window.addEventListener("gk_active_users_updated", handleUpdate);

  return () => {
    window.removeEventListener("gk_active_users_updated", handleUpdate);
  };
}

/**
 * Backwards compatibility alias for components expecting subscribeVisitorCount.
 */
export function subscribeVisitorCount(callback) {
  return subscribeActiveUsers(callback);
}

/**
 * Explicitly disabled: Clicking inside the website does NOT increase the count.
 * Returns current active count without incrementing.
 */
export function incrementVisitorCount() {
  return getActiveUsers();
}

/**
 * Shared state for the tracker singleton.
 */
let isInitialized = false;
const knownTabs = new Set();
let channel = null;
let heartbeatInterval = null;

/**
 * Sends heartbeat ping to Hostinger backend to refresh active status and fetch global multi-device count.
 */
export async function sendHeartbeat() {
  if (typeof window === "undefined") return;

  const sessionId = getSessionId();

  // Try the resolved endpoint first, with automatic fallback
  const endpointsToTry = [
    resolvedEndpoint,
    ...CANDIDATE_ENDPOINTS.filter((e) => e !== resolvedEndpoint)
  ];

  for (const endpoint of endpointsToTry) {
    try {
      const res = await fetch(`${endpoint}?action=heartbeat&session_id=${sessionId}`, {
        cache: "no-store",
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.active_users === "number") {
          resolvedEndpoint = endpoint;
          const localCount = knownTabs.size > 0 ? knownTabs.size : 1;
          const resolved = Math.max(localCount, data.active_users);
          setActiveUsers(resolved);
          return;
        }
      }
    } catch {
      // Continue to next endpoint if this one fails
    }
  }

  // Fallback if network is unreachable
  if (knownTabs.size > 0) {
    setActiveUsers(knownTabs.size);
  }
}

/**
 * Initializes active visitor tracking:
 * - Increases count on open.
 * - Decreases count on tab close.
 * - Multi-device synchronization every 3.5 seconds.
 * - NO click increments.
 */
export function initVisitorClickTracking() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return () => { };
  }

  if (isInitialized) {
    return () => { };
  }
  isInitialized = true;

  const sessionId = getSessionId();
  knownTabs.add(sessionId);

  // 1. Instant Cross-Tab Communication via BroadcastChannel (0ms delay)
  try {
    if (typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel("gk_live_users_channel");

      channel.onmessage = (event) => {
        const { type, id } = event.data || {};
        if (!id) return;

        if (type === "join") {
          knownTabs.add(id);
          setActiveUsers(knownTabs.size);
          channel.postMessage({ type: "here", id: sessionId });
        } else if (type === "here") {
          knownTabs.add(id);
          setActiveUsers(knownTabs.size);
        } else if (type === "leave") {
          knownTabs.delete(id);
          setActiveUsers(Math.max(1, knownTabs.size));
        }
      };

      channel.postMessage({ type: "join", id: sessionId });
      setActiveUsers(knownTabs.size);
    }
  } catch { }

  // 2. High-Frequency Multi-Device Heartbeat (Every 3.5s)
  sendHeartbeat();
  heartbeatInterval = setInterval(sendHeartbeat, 3500);

  // 3. Immediately refresh when user switches tabs or focuses the window
  const handleVisibility = () => {
    if (document.visibilityState === "visible") {
      sendHeartbeat();
    }
  };
  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("focus", sendHeartbeat);

  // 4. Tab Close / Page Leave Handler: Decreases count immediately across all devices
  const handleUnload = () => {
    if (channel) {
      try {
        channel.postMessage({ type: "leave", id: sessionId });
      } catch { }
    }
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${resolvedEndpoint}?action=leave&session_id=${sessionId}`);
    }
  };

  window.addEventListener("beforeunload", handleUnload);
  window.addEventListener("pagehide", handleUnload);

  return () => {
    isInitialized = false;
    clearInterval(heartbeatInterval);
    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("focus", sendHeartbeat);
    window.removeEventListener("beforeunload", handleUnload);
    window.removeEventListener("pagehide", handleUnload);
    if (channel) {
      try {
        channel.close();
      } catch { }
    }
  };
}
