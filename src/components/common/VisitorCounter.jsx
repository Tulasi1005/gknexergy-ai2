import { useEffect, useState } from "react";
import { Users, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getActiveUsers,
  subscribeActiveUsers,
  initVisitorClickTracking,
} from "@/utils/visitorTracker";

export const VisitorCounter = ({ theme = "light", className = "" }) => {
  const [activeUsers, setActiveUsers] = useState(() => getActiveUsers());
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    // 1. Initial count
    setActiveUsers(getActiveUsers());

    // 2. Initialize tracking (increases on open, decreases on close)
    const stopTracking = initVisitorClickTracking();

    // 3. Subscriptions to live real-time updates
    const unsubscribe = subscribeActiveUsers((updatedCount) => {
      setActiveUsers(updatedCount);
    });

    return () => {
      stopTracking();
      unsubscribe();
    };
  }, []);

  return (
    <motion.aside
      aria-label="Live visitors active on website"
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-40 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="group relative flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md transition-all duration-300 whitespace-nowrap cursor-default hover:scale-[1.03]"
        style={{
          background: isDark
            ? "rgba(15, 23, 42, 0.92)"
            : "rgba(255, 255, 255, 0.94)",
          border: isDark
            ? "1px solid rgba(56, 189, 248, 0.28)"
            : "1px solid rgba(226, 232, 240, 0.9)",
          boxShadow: isDark
            ? "0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 12px rgba(56, 189, 248, 0.15)"
            : "0 4px 16px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)",
          color: isDark ? "#f8fafc" : "#0f172a",
        }}
        title={`${activeUsers} active visitor${activeUsers === 1 ? "" : "s"} online now`}
      >
        {/* Pulsing Live Beacon */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>

        {/* Users Icon */}
        <Users
          className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
          strokeWidth={2.2}
          aria-hidden="true"
        />

        {/* Label */}
        <span
          className="text-[11px] font-semibold tracking-tight text-slate-600 dark:text-slate-300"
          style={{ letterSpacing: "0.01em" }}
        >
          Live Visitors:
        </span>

        {/* Dynamic Real-Time Count Display */}
        <motion.span
          key={`active-${activeUsers}`}
          initial={{ scale: 1.25, color: "#10b981" }}
          animate={{ scale: 1, color: isDark ? "#34d399" : "#059669" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="text-xs font-bold tabular-nums tracking-wide inline-block"
          data-testid="visitor-count-number"
        >
          {activeUsers}
        </motion.span>

        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
          online
        </span>

        {/* Hover Tooltip Card */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              animate={{ opacity: 1, y: -6, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none absolute bottom-full left-0 mb-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[10.5px] font-medium backdrop-blur-md shadow-lg"
              style={{
                background: isDark ? "rgba(15, 23, 42, 0.96)" : "#0f172a",
                color: "#ffffff",
                border: isDark ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid #1e293b",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Radio className="h-3 w-3 animate-pulse" />
                <span>
                  <strong>{activeUsers}</strong> {activeUsers === 1 ? "visitor" : "visitors"} active on website now
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default VisitorCounter;
