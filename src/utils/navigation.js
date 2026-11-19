/**
 * Smart back navigation utility for GK Nexergy.
 * Directs the user back to their previous page / history entry if available,
 * preserving scroll context, otherwise falls back gracefully to a default route.
 */
export const smartNavigateBack = (navigate, fallback = "/home") => {
    if (typeof window !== "undefined") {
        // If the current router session has prior history entries
        if (window.history.state && typeof window.history.state.idx === "number" && window.history.state.idx > 0) {
            navigate(-1);
            return;
        }
        // Fallback check on window history length
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }
    }
    navigate(fallback);
};
