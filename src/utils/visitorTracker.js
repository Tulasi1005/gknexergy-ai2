/**
 * Real-Time Visitor & Active User Tracking Utility for GK Nexergy
 * 
 * Capabilities:
 * 1. Live Active Users Online tracking via heartbeat and BroadcastChannel.
 * 2. Instant cross-tab and cross-device synchronization on Hostinger.
 * 3. Genuine link click counting with double-click support (+2).
 * 4. Automatic tab cleanup on tab close via sendBeacon.
 * 5. Resilient offline and local storage fallbacks.
 */

const STORAGE_KEY = "gk_visitor_count";
const ACTIVE_STORAGE_KEY = "gk_active_users_count";
const API_ENDPOINT = "/api/counter.php";

/**
 * Returns or generates a unique session ID for the current browser session.
 */
export function getSessionId() {
  if (typeof window === "undefined") return "gk_srv";

  try {
    let id = sessionStorage.getItem("gk_visitor_session_id");
    if (!id) {
      id = "gk_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now();
      sessionStorage.setItem("gk_visitor_session_id", id);
    }
    return id;
  } catch {
    return "gk_anon_" + Date.now();
  }
}

/**
 * Gets the current visitor total interactions from storage.
 */
export function getVisitorCount() {
  if (typeof window === "undefined") return 1;

  try {
    let stored = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (isNaN(stored) || stored >= 10000 || stored < 1) {
      stored = 1;
      localStorage.setItem(STORAGE_KEY, "1");
    }
    return stored;
  } catch {
    return 1;
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
 * Updates active user count and notifies all subscribers.
 */
function setActiveUsers(count) {
  const safeCount = Math.max(1, count);
  try {
    sessionStorage.setItem(ACTIVE_STORAGE_KEY, String(safeCount));
  } catch {}

  window.dispatchEvent(
    new CustomEvent("gk_active_users_updated", { detail: safeCount })
  );
}

/**
 * Increments total visitor click count.
 * Double clicks increment twice (+2).
 */
export function incrementVisitorCount(amount = 1) {
  if (typeof window === "undefined") return 1;

  try {
    const current = getVisitorCount();
    const next = current + amount;
    localStorage.setItem(STORAGE_KEY, String(next));

    window.dispatchEvent(
      new CustomEvent("gk_visitor_count_updated", { detail: next })
    );

    const sessionId = getSessionId();
    fetch(`${API_ENDPOINT}?action=click&amount=${amount}&session_id=${sessionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (typeof data.count === "number") {
            const currentLocal = getVisitorCount();
            const resolved = Math.max(currentLocal, data.count);
            if (resolved !== currentLocal) {
              localStorage.setItem(STORAGE_KEY, String(resolved));
              window.dispatchEvent(
                new CustomEvent("gk_visitor_count_updated", { detail: resolved })
              );
            }
          }
          if (typeof data.active_users === "number") {
            setActiveUsers(data.active_users);
          }
        }
      })
      .catch(() => {});

    return next;
  } catch {
    return 1;
  }
}

/**
 * Sends heartbeat ping to Hostinger backend to refresh active status.
 */
export async function sendHeartbeat() {
  if (typeof window === "undefined") return;

  const sessionId = getSessionId();
  try {
    const res = await fetch(`${API_ENDPOINT}?action=heartbeat&session_id=${sessionId}`, {
      cache: "no-store"
    });
    if (res.ok) {
      const data = await res.json();
      if (data) {
        if (typeof data.active_users === "number") {
          setActiveUsers(data.active_users);
        }
        if (typeof data.count === "number") {
          const currentLocal = getVisitorCount();
          const resolved = Math.max(currentLocal, data.count);
          if (resolved !== currentLocal) {
            localStorage.setItem(STORAGE_KEY, String(resolved));
            window.dispatchEvent(
              new CustomEvent("gk_visitor_count_updated", { detail: resolved })
            );
          }
        }
      }
    }
  } catch {}
}

/**
 * Subscribes to total visitor interaction count changes.
 */
export function subscribeVisitorCount(callback) {
  if (typeof window === "undefined") return () => {};

  const handleUpdate = (e) => {
    if (e.detail && typeof e.detail === "number") {
      callback(e.detail);
    } else {
      callback(getVisitorCount());
    }
  };

  const handleStorage = (e) => {
    if (e.key === STORAGE_KEY) {
      callback(getVisitorCount());
    }
  };

  window.addEventListener("gk_visitor_count_updated", handleUpdate);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("gk_visitor_count_updated", handleUpdate);
    window.removeEventListener("storage", handleStorage);
  };
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
 * Initializes active user tracking, heartbeat loop, tab coordination, and click tracking.
 */
export function initVisitorClickTracking() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return () => {};
  }

  const sessionId = getSessionId();

  // 1. Local Cross-Tab Coordination via BroadcastChannel
  let channel = null;
  const knownTabs = new Set([sessionId]);

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

      // Announce arrival to other tabs
      channel.postMessage({ type: "join", id: sessionId });
      setActiveUsers(knownTabs.size);
    }
  } catch {}

  // 2. Initial Heartbeat & Recurring Heartbeat (every 20s)
  sendHeartbeat();
  const heartbeatInterval = setInterval(sendHeartbeat, 20000);

  // 3. Tab Close / Page Unload Handler
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

  // 4. Global Click Listener for Links, Buttons, Cards, and Badge
  const handleGlobalClick = (e) => {
    const isTextInput = e.target.closest(
      "input:not([type='button']):not([type='submit']), textarea, select, [contenteditable='true']"
    );
    if (isTextInput) return;

    const isClickable = e.target.closest(
      "a, [role='link'], button, [role='button'], aside[aria-label*='Visitor'], .navbar-logo-card, .mega-nav-item, .nav-link, .nav-deck-tab, .pro-card, [data-testid], [data-nav-link], .cursor-pointer"
    );

    if (isClickable) {
      incrementVisitorCount(1);
    }
  };

  document.addEventListener("click", handleGlobalClick, {
    capture: true,
    passive: true,
  });

  return () => {
    clearInterval(heartbeatInterval);
    window.removeEventListener("beforeunload", handleUnload);
    window.removeEventListener("pagehide", handleUnload);
    document.removeEventListener("click", handleGlobalClick, { capture: true });
    if (channel) {
      try {
        channel.close();
      } catch {}
    }
  };
}
