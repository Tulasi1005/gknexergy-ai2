/**
 * Real-Time Visitor & Link Click Tracking Utility for GK Nexergy
 * 
 * Works seamlessly both on Hostinger live production (via /api/counter.php)
 * and local development (localStorage fallback).
 * 
 * Requirements:
 * 1. Synchronizes global visitor counts across all users worldwide on Hostinger.
 * 2. Instant zero-latency UI update via optimistic local broadcast.
 * 3. Every link click increments the counter; double clicks increment twice (+2).
 * 4. Robust offline and local development fallback.
 */

const STORAGE_KEY = "gk_visitor_count";
const API_ENDPOINT = "/api/counter.php";

/**
 * Gets the current visitor count from storage.
 */
export function getVisitorCount() {
  if (typeof window === "undefined") return 1;

  try {
    let stored = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (isNaN(stored) || stored > 1000 || stored < 1) {
      stored = 1;
      localStorage.setItem(STORAGE_KEY, "1");
    }
    return stored;
  } catch {
    return 1;
  }
}

/**
 * Syncs with Hostinger backend counter on page load.
 */
export async function syncWithGlobalCounter() {
  if (typeof window === "undefined") return;

  try {
    const res = await fetch(API_ENDPOINT, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.count === "number" && data.count >= 1) {
        localStorage.setItem(STORAGE_KEY, String(data.count));
        window.dispatchEvent(
          new CustomEvent("gk_visitor_count_updated", { detail: data.count })
        );
      }
    }
  } catch {
    // Graceful fallback during local dev or offline
  }
}

/**
 * Increments the real click count.
 * 1. Instantly updates local UI so there is zero lag.
 * 2. Asynchronously notifies Hostinger /api/counter.php to update global live count.
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

    // Asynchronously update Hostinger global count in background
    fetch(`${API_ENDPOINT}?action=click&amount=${amount}`, { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.count === "number") {
          localStorage.setItem(STORAGE_KEY, String(data.count));
          window.dispatchEvent(
            new CustomEvent("gk_visitor_count_updated", { detail: data.count })
          );
        }
      })
      .catch(() => {
        // Safe offline/local fallback
      });

    return next;
  } catch {
    return 1;
  }
}

/**
 * Subscribes a React component to real-time counter changes (intra-tab and cross-tab).
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
 * Sets up global click listener for link and navigation interactions.
 * Every link click increments the counter. Double click counts as 2 clicks.
 */
export function initVisitorClickTracking() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return () => {};
  }

  // Trigger global sync on initial load
  syncWithGlobalCounter();

  const handleGlobalClick = (e) => {
    // Exclude clicks inside editable form fields so typing is ignored
    const isInput = e.target.closest(
      "input, textarea, select, [contenteditable='true']"
    );
    if (isInput) return;

    // Detect if click was on a link, anchor, button, or navigation item
    const isLinkOrAction = e.target.closest(
      "a, [role='link'], button, .mega-nav-item, .nav-link, .nav-deck-tab, [data-nav-link]"
    );

    if (isLinkOrAction) {
      // Increments count on every link click. Double-clicking naturally fires 2 clicks (+2).
      incrementVisitorCount(1);
    }
  };

  document.addEventListener("click", handleGlobalClick, {
    capture: true,
    passive: true,
  });

  return () => {
    document.removeEventListener("click", handleGlobalClick, { capture: true });
  };
}
