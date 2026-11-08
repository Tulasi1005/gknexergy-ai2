/**
 * Real-Time Live Active Visitors Tracking Utility for GK Nexergy
 * 
 * Rules:
 * 1. Opening the website increases the count (+1).
 * 2. Closing the tab/website decreases the count (-1).
 * 3. Clicking on links/buttons/cards inside the website DOES NOT increase the count.
 * 4. Instant 0ms cross-tab synchronization via BroadcastChannel.
 * 5. Worldwide multi-device synchronization via Hostinger /api/counter.php heartbeat.
 * 6. Instant leave notification on tab close via sendBeacon.
 */

const ACTIVE_STORAGE_KEY = "gk_active_users_count";
const API_ENDPOINT = "/api/counter.php";

let tabSessionId = null;

/**
 * Returns a unique session ID for the current tab.
 * Unique in memory per tab so duplicate tabs always get distinct IDs.
 */
export function getSessionId() {
  if (typeof window === "undefined") return "gk_srv";
  if (!tabSessionId) {
    tabSessionId = "gk_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
  }
  return tabSessionId;
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
  } catch {}

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
  if (typeof window === "undefined") return () => {};

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
  // Intentionally NO-OP per user requirement:
  // "If we click it should not increase count"
  return getActiveUsers();
}

/**
 * Shared state for the tracker singleton.
 */
let isInitialized = false;
const knownTabs = new Set();
let channel = null;
let heartbeatInterval = null;
let pingInterval = null;

/**
 * Sends heartbeat ping to Hostinger backend to refresh active status and fetch global count.
 */
export async function sendHeartbeat() {
  if (typeof window === "undefined") return;

  const sessionId = getSessionId();
  try {
    const res = await fetch(`${API_ENDPOINT}?action=heartbeat&session_id=${sessionId}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.active_users === "number") {
        const localCount = knownTabs.size > 0 ? knownTabs.size : 1;
        const resolved = Math.max(localCount, data.active_users);
        setActiveUsers(resolved);
      }
    }
  } catch {
    // If offline or local dev without PHP, ensure local tabs count is active
    if (knownTabs.size > 0) {
      setActiveUsers(knownTabs.size);
    }
  }
}

/**
 * Initializes active visitor tracking:
 * - Increases count on open.
 * - Decreases count on tab close.
 * - NO click increments.
 */
export function initVisitorClickTracking() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return () => {};
  }

  if (isInitialized) {
    return () => {};
  }
  isInitialized = true;

  const sessionId = getSessionId();
  knownTabs.add(sessionId);

  // 1. Instant Cross-Tab Communication via BroadcastChannel
  try {
    if (typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel("gk_live_users_channel");

      channel.onmessage = (event) => {
        const { type, id } = event.data || {};
        if (!id) return;

        if (type === "join") {
          knownTabs.add(id);
          setActiveUsers(knownTabs.size);
          // Greet the newly joined tab so it learns about us
          channel.postMessage({ type: "here", id: sessionId });
        } else if (type === "here") {
          knownTabs.add(id);
          setActiveUsers(knownTabs.size);
        } else if (type === "ping") {
          knownTabs.add(id);
        } else if (type === "leave") {
          knownTabs.delete(id);
          setActiveUsers(Math.max(1, knownTabs.size));
        }
      };

      // Announce arrival to other open tabs in the same browser
      channel.postMessage({ type: "join", id: sessionId });
      setActiveUsers(knownTabs.size);

      // Periodic local tab ping (every 10s) to keep tab registry fresh
      pingInterval = setInterval(() => {
        if (channel) {
          try {
            channel.postMessage({ type: "ping", id: sessionId });
          } catch {}
        }
      }, 10000);
    }
  } catch {}

  // 2. Initial Server Heartbeat & recurring 10-second heartbeat to Hostinger
  sendHeartbeat();
  heartbeatInterval = setInterval(sendHeartbeat, 10000);

  // 3. Immediately refresh when user switches tabs or focuses the window
  const handleVisibility = () => {
    if (document.visibilityState === "visible") {
      sendHeartbeat();
    }
  };
  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("focus", sendHeartbeat);

  // 4. Tab Close / Page Leave Handler: Decreases count immediately
  const handleUnload = () => {
    if (channel) {
      try {
        channel.postMessage({ type: "leave", id: sessionId });
      } catch {}
    }
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${API_ENDPOINT}?action=leave&session_id=${sessionId}`);
    }
  };

  window.addEventListener("beforeunload", handleUnload);
  window.addEventListener("pagehide", handleUnload);

  // NOTE: NO document.addEventListener("click", ...) here!
  // Per requirement: "If we click it should not increase count"

  return () => {
    isInitialized = false;
    clearInterval(heartbeatInterval);
    clearInterval(pingInterval);
    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("focus", sendHeartbeat);
    window.removeEventListener("beforeunload", handleUnload);
    window.removeEventListener("pagehide", handleUnload);
    if (channel) {
      try {
        channel.close();
      } catch {}
    }
  };
}
