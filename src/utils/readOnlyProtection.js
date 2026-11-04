import { useEffect } from "react";

/**
 * useReadOnlyProtection Hook
 * 
 * Production-Grade Client-Side Asset & Content Protection:
 * 1. Anti-Copying: Disables text selection (outside form inputs), blocks copy/cut/selectstart events,
 *    and clears unauthorized clipboard payloads with an informative security toast.
 * 2. Anti-Downloading: Blocks context menu (right-click) on all images and page elements, prevents image
 *    dragging to desktop/tabs, and suppresses mobile long-press image save sheets (-webkit-touch-callout).
 * 3. Anti-Screenshot & Screen Capture Deterrent:
 *    - Intercepts Win+Shift+S (Shift+S outside inputs) and PrintScreen keystrokes immediately.
 *    - Triggers full-screen warning shield: "Screenshot is Disabled in this Website".
 *    - Tiles entire viewport with high-contrast watermark: "⚠️ SCREENSHOT IS DISABLED".
 *    - Overwrites system clipboard with warning declaration so no captured image buffer can be pasted.
 *    - Shows persistent on-screen warning toast upon focus regain or snip attempt.
 *    - Strict @media print blackout preventing Save-as-PDF and print capture.
 * 4. DevTools & Inspection Deterrent: Blocks F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S, Ctrl+P.
 * 5. Full Interactive Accessibility: Preserves 100% functionality of form inputs, textareas, selects,
 *    dropdowns, buttons, links, course registration, chatbot, and certificate verification.
 */

// Helper to safely show temporary protection toast
let toastTimeout = null;
const showProtectionToast = (message) => {
  if (typeof document === "undefined") return;

  let toast = document.getElementById("gk-protection-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "gk-protection-toast";
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.innerHTML = `
      <svg class="protection-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <span id="gk-protection-toast-text"></span>
    `;
    document.body.appendChild(toast);
  }

  const textEl = document.getElementById("gk-protection-toast-text");
  if (textEl) textEl.textContent = message;

  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    if (toast) toast.classList.remove("show");
  }, 2600);
};

// Helper to flash full-screen anti-screenshot shield
let shieldTimeout = null;
const triggerScreenshotWarning = (customMessage = "Screenshot is disabled in this website.") => {
  if (typeof document === "undefined") return;

  // Clear system clipboard buffer to neutralize screen dump
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(
        "⚠️ WARNING: Screenshot is disabled in this website. Content is protected by GK Nexergy (https://gknexergy.com)."
      )
      .catch(() => {});
  }

  let shield = document.getElementById("gk-screenshot-shield");
  if (!shield) {
    shield = document.createElement("div");
    shield.id = "gk-screenshot-shield";
    shield.innerHTML = `
      <div class="screenshot-shield-content">
        <svg class="screenshot-shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <span class="screenshot-shield-badge">⚠️ Security Alert</span>
        <h3 class="screenshot-shield-title">Screenshot is Disabled in this Website</h3>
        <p class="screenshot-shield-desc">
          Windows+Shift+S, Snipping Tool, and screen capturing are strictly prohibited on GK Nexergy. All content is protected intellectual property.
        </p>
        <span class="screenshot-shield-chip">Intellectual Property Protected</span>
      </div>
    `;
    document.body.appendChild(shield);
  }

  shield.classList.add("active");

  if (shieldTimeout) clearTimeout(shieldTimeout);
  shieldTimeout = setTimeout(() => {
    if (shield) shield.classList.remove("active");
  }, 2000);

  showProtectionToast(customMessage);
};

export function useReadOnlyProtection() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    // 1. Right-Click Context Menu Deterrent
    const handleContextMenu = (e) => {
      // Allow right-click ONLY inside genuine editable text inputs or explicit opt-ins
      const isEditable = e.target.closest(
        "input:not([type='button']):not([type='submit']), textarea, select, [contenteditable='true'], .allow-context-menu"
      );
      if (isEditable) return;

      e.preventDefault();
      e.stopPropagation();

      const isImage = e.target.tagName === "IMG" || e.target.closest("img, picture, svg, video, canvas");
      if (isImage) {
        showProtectionToast("Image downloading is disabled to protect intellectual property.");
      } else {
        showProtectionToast("Right-click is disabled on this website.");
      }
      return false;
    };

    // 2. Drag & Drop Deterrent for Images, Links, and Media
    const handleDragStart = (e) => {
      const isAllowed = e.target.closest(".allow-drag");
      if (isAllowed) return;

      e.preventDefault();
      e.stopPropagation();
      showProtectionToast("Image and asset dragging is disabled.");
      return false;
    };

    // 3. Selection & Copy / Cut Deterrent
    const handleCopy = (e) => {
      const isEditable = e.target.closest(
        "input, textarea, select, [contenteditable='true'], .allow-copy, [data-allow-copy='true']"
      );
      if (isEditable) return;

      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData(
          "text/plain",
          "⚠️ WARNING: Screenshot & copying are disabled on this website.\nGK NEXERGY (https://gknexergy.com) — Content Protected."
        );
      }
      showProtectionToast("Copying content is disabled on this website.");
      return false;
    };

    const handleCut = (e) => {
      const isEditable = e.target.closest(
        "input, textarea, select, [contenteditable='true']"
      );
      if (isEditable) return;

      e.preventDefault();
      showProtectionToast("Cutting content is disabled.");
      return false;
    };

    const handleSelectStart = (e) => {
      const isEditable = e.target.closest(
        "input, textarea, select, [contenteditable='true'], .allow-select"
      );
      if (isEditable) return;

      e.preventDefault();
      return false;
    };

    // 4. Keyboard Shortcuts Deterrent (Win+Shift+S, PrintScreen, Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+P, F12)
    const handleKeyDown = (e) => {
      const isEditable = e.target.closest(
        "input, textarea, select, [contenteditable='true']"
      );

      // Check for PrintScreen key immediately (on any element)
      if (e.key === "PrintScreen" || e.code === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        triggerScreenshotWarning("Screenshot is disabled in this website.");
        return false;
      }

      // Check for Windows + Shift + S or Shift + S outside text inputs
      if (!isEditable && e.shiftKey && (e.key === "s" || e.key === "S" || e.code === "KeyS")) {
        e.preventDefault();
        e.stopPropagation();
        triggerScreenshotWarning("Screenshot is disabled in this website.");
        return false;
      }

      // If user is editing text inside input/textarea, allow normal editing shortcuts
      if (isEditable) {
        return;
      }

      const isMac =
        typeof navigator !== "undefined" &&
        navigator.platform &&
        navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key ? e.key.toLowerCase() : "";

      // Developer Tools / Inspect Element Shortcuts
      if (
        e.key === "F12" ||
        (modifier && e.shiftKey && (key === "i" || key === "j" || key === "c")) ||
        (isMac && e.metaKey && e.altKey && (key === "i" || key === "j" || key === "c"))
      ) {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast("Developer inspection tools are disabled.");
        return false;
      }

      // Print / Save-as-PDF Deterrent (Ctrl+P / Cmd+P)
      if (modifier && key === "p") {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast("Printing and saving as PDF are prohibited.");
        return false;
      }

      // Save Webpage Deterrent (Ctrl+S / Cmd+S)
      if (modifier && key === "s") {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast("Saving webpage is disabled.");
        return false;
      }

      // View Source Deterrent (Ctrl+U / Cmd+U)
      if (modifier && key === "u") {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast("Viewing source code is disabled.");
        return false;
      }

      // Copy & Cut Shortcuts outside form controls (Ctrl+C / Cmd+C, Ctrl+X / Cmd+X)
      if (modifier && (key === "c" || key === "x")) {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast("Copying content is disabled on this website.");
        return false;
      }

      // Select All outside form controls (Ctrl+A / Cmd+A)
      if (modifier && key === "a") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "PrintScreen" || e.code === "PrintScreen" || e.keyCode === 44) {
        triggerScreenshotWarning("Screenshot is disabled in this website.");
      }
      if (e.shiftKey && (e.key === "s" || e.key === "S" || e.code === "KeyS")) {
        triggerScreenshotWarning("Screenshot is disabled in this website.");
      }
    };

    // 5. Anti-Snipping Tool Deterrent (Instant frosted shield & watermark when screen grabbers steal window focus)
    let wasBlurred = false;
    const handleWindowBlur = () => {
      // Allow focus loss if actively typing inside genuine inputs
      if (document.activeElement && ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        return;
      }
      wasBlurred = true;
      document.body.classList.add("gk-window-unfocused");

      // Overwrite clipboard buffer immediately so any OS capture cannot be pasted
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(
          "⚠️ WARNING: Screenshot is disabled in this website. Content is protected by GK Nexergy (https://gknexergy.com)."
        ).catch(() => {});
      }
    };

    const handleWindowFocus = () => {
      document.body.classList.remove("gk-window-unfocused");
      if (wasBlurred) {
        wasBlurred = false;
        // Show prominent warning on screen when returning from screen clip attempt
        showProtectionToast("⚠️ Warning: Screenshot is disabled in this website.");

        // Clear clipboard buffer again to purge any snip stored by Windows
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(
            "⚠️ WARNING: Screenshot is disabled in this website. Content is protected by GK Nexergy (https://gknexergy.com)."
          ).catch(() => {});
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add("gk-window-unfocused");
      } else {
        document.body.classList.remove("gk-window-unfocused");
        if (wasBlurred) {
          wasBlurred = false;
          showProtectionToast("⚠️ Warning: Screenshot is disabled in this website.");
        }
      }
    };

    // Inject Anti-Snipping Frosted Curtain Element into DOM
    let snippingCurtain = document.getElementById("gk-anti-snipping-curtain");
    if (!snippingCurtain) {
      snippingCurtain = document.createElement("div");
      snippingCurtain.id = "gk-anti-snipping-curtain";
      snippingCurtain.innerHTML = `
        <div class="snipping-curtain-card">
          <svg style="width: 48px; height: 48px; color: #ef4444; margin: 0 auto 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span class="warning-curtain-badge">⚠️ Security Warning</span>
          <h4 class="snipping-curtain-title">Screenshot is Disabled in this Website</h4>
          <p class="snipping-curtain-desc">
            Windows+Shift+S, Snipping Tool, and screen capturing are prohibited on GK Nexergy. All content is protected intellectual property.
          </p>
          <span class="snipping-curtain-action">Click anywhere to return to active viewing</span>
        </div>
      `;
      document.body.appendChild(snippingCurtain);

      snippingCurtain.addEventListener("click", handleWindowFocus);
    }

    // Inject Permanent Intellectual Property Watermark Shield
    let watermarkShield = document.getElementById("gk-security-watermark");
    if (!watermarkShield) {
      watermarkShield = document.createElement("div");
      watermarkShield.id = "gk-security-watermark";
      watermarkShield.setAttribute("aria-hidden", "true");
      document.body.appendChild(watermarkShield);
    }

    // 6. Print Event Interception
    const handleBeforePrint = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      showProtectionToast("Printing this website is prohibited.");
    };

    // Register event listeners
    document.addEventListener("contextmenu", handleContextMenu, { capture: true });
    document.addEventListener("dragstart", handleDragStart, { capture: true });
    document.addEventListener("copy", handleCopy, { capture: true });
    document.addEventListener("cut", handleCut, { capture: true });
    document.addEventListener("selectstart", handleSelectStart, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("keyup", handleKeyUp, { capture: true });
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeprint", handleBeforePrint);

    // Re-focus on genuine user window click
    window.addEventListener("click", handleWindowFocus, { capture: true, passive: true });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      document.removeEventListener("dragstart", handleDragStart, { capture: true });
      document.removeEventListener("copy", handleCopy, { capture: true });
      document.removeEventListener("cut", handleCut, { capture: true });
      document.removeEventListener("selectstart", handleSelectStart, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("keyup", handleKeyUp, { capture: true });
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("click", handleWindowFocus);
      if (toastTimeout) clearTimeout(toastTimeout);
      if (shieldTimeout) clearTimeout(shieldTimeout);
    };
  }, []);
}
