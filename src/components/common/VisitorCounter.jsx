import { useEffect, useState } from "react";
import { Users, Radio, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getVisitorCount,
  getActiveUsers,
  subscribeVisitorCount,
  subscribeActiveUsers,
  initVisitorClickTracking,
} from "@/utils/visitorTracker";

export const VisitorCounter = ({ theme = "light", className = "" }) => {
  const [visitorCount, setVisitorCount] = useState(() => getVisitorCount());
  const [activeUsers, setActiveUsers] = useState(() => getActiveUsers());
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    // 1. Initial values from genuine storage
    setVisitorCount(getVisitorCount());
    setActiveUsers(getActiveUsers());

    // 2. Initialize tracking, heartbeat & cross-tab coordination
    const stopTracking = initVisitorClickTracking();

    // 3. Subscriptions to real-time events
    const unsubCount = subscribeVisitorCount((updatedCount) => {
      setVisitorCount(updatedCount);
    });

    const unsubActive = subscribeActiveUsers((updatedActive) => {
      setActiveUsers(updatedActive);
    });

    return () => {
      stopTracking();
      unsubCount();
      unsubActive();
    };
  }, []);

  const formattedCount = visitorCount ? visitorCount.toLocaleString("en-US") : "1";

  return (
    <motion.aside
      aria-label="Visitor and active user statistics"
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-40 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="group relative flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md transition-all duration-300 whitespace-nowrap cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
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
        title={`${activeUsers} active user${activeUsers === 1 ? "" : "s"} online now • ${formattedCount} total interactions`}
      >
        {/* Pulsing Live Traffic Status Dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>

        {/* Live Active Users Display */}
        <span
          className="text-[11px] font-semibold tracking-tight text-slate-600 dark:text-slate-300"
          style={{ letterSpacing: "0.01em" }}
        >
          Active:
        </span>

        <motion.span
          key={`active-${activeUsers}`}
          initial={{ scale: 1.25, color: "#10b981" }}
          animate={{ scale: 1, color: isDark ? "#34d399" : "#059669" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="text-xs font-bold tabular-nums tracking-wide inline-block"
          data-testid="active-users-number"
        >
          {activeUsers}
        </motion.span>

        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
          online
        </span>

        {/* Separator Dot */}
        <span className="text-slate-300 dark:text-slate-700 select-none">•</span>

        {/* Total Interactions / Visitors */}
        <Users
          className="h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-sky-400 transition-transform duration-200 group-hover:scale-110"
          strokeWidth={2.2}
          aria-hidden="true"
        />

        <motion.span
          key={`count-${visitorCount}`}
          initial={{ scale: 1.2, color: isDark ? "#38bdf8" : "#2563eb" }}
          animate={{ scale: 1, color: isDark ? "#ffffff" : "#0f172a" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="text-xs font-bold tabular-nums tracking-wide inline-block"
          data-testid="visitor-count-number"
        >
          {formattedCount}
        </motion.span>

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
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Radio className="h-3 w-3 animate-pulse" />
                  <span>
                    <strong>{activeUsers}</strong> {activeUsers === 1 ? "user" : "users"} active on website now
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  <span>
                    <strong>{formattedCount}</strong> total link clicks & visits
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default VisitorCounter;
