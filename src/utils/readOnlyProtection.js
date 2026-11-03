import { useEffect } from "react";

/**
 * useReadOnlyProtection Hook
 * 
 * Implements client-side copy-deterrent and read-only protection measures:
 * 1. Deterrents context menu (right-click) on public content, while keeping it accessible on form inputs.
 * 2. Deterrents dragging of images, logos, and cards.
 * 3. Deterrents inspect shortcuts (Ctrl+U / Cmd+U, Ctrl+S / Cmd+S) when outside editable form controls.
 * 4. Preserves full keyboard accessibility, navigation, interactive buttons, and form inputs.
 */
export function useReadOnlyProtection() {
  useEffect(() => {
    // 1. Right-click contextmenu deterrent
    const handleContextMenu = (e) => {
      // Allow right-click inside editable elements (input, textarea, select, contenteditable)
      // or elements explicitly marked with .allow-context-menu
      const isEditable = e.target.closest(
        "input, textarea, select, [contenteditable='true'], .allow-context-menu, [data-allow-copy='true']"
      );
      if (isEditable) return;

      e.preventDefault();
    };

    // 2. Image and asset dragstart deterrent
    const handleDragStart = (e) => {
      const isDraggableAllowed = e.target.closest(".allow-drag");
      if (isDraggableAllowed) return;

      // Prevent dragging images, cards, banners, or links to desktop
      if (
        e.target.tagName === "IMG" ||
        e.target.closest("img, .pro-card, .brand-logo, picture, video")
      ) {
        e.preventDefault();
      }
    };

    // 3. Keyboard shortcut deterrent (View Source Ctrl+U, Save Page Ctrl+S)
    const handleKeyDown = (e) => {
      // Allow all key combinations if typing in input/textarea/select
      const isEditable = e.target.closest(
        "input, textarea, select, [contenteditable='true']"
      );
      if (isEditable) return;

      const isMac =
        typeof navigator !== "undefined" &&
        navigator.platform &&
        navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier) {
        const key = e.key ? e.key.toLowerCase() : "";
        // Ctrl+U (View Source) or Ctrl+S (Save Page)
        if (key === "u" || key === "s") {
          e.preventDefault();
        }
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, { capture: false });
    document.addEventListener("dragstart", handleDragStart, { capture: false });
    document.addEventListener("keydown", handleKeyDown, { capture: false });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}

