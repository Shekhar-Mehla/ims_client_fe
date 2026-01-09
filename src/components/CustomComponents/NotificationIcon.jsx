import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { markNotificationRead } from "../../features/notification/notificationapi";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationpActions } from "../../features/notification/notificationAction";


const NotificationIcon = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Fixed selector: state.notificationInfo.notifications
  const { notifications } = useSelector(
    (state) => state.notificationInfo
  );

  const { user } = useSelector((state) => state.userInfo); // Fixed selector: users -> user matches Header.jsx usage

  useEffect(() => {
    if (!user?._id) return;
    // fetch on mount
    dispatch(fetchNotificationpActions(user._id));
    // optional: keep interval if you prefer polling
    const id = setInterval(
      () => dispatch(fetchNotificationpActions(user._id)),
      60_000
    );
    return () => clearInterval(id);
  }, [dispatch, user?._id]);

  // Handle both boolean and string "false" for unread status due to schema defining isRead as String
  const unreadCount = (notifications || []).filter((n) => !n.isRead || n.isRead === "false").length;

  const toggleOpen = () => setOpen((s) => !s);

  const handleViewAll = () => {
    setOpen(false);
    navigate("/notifications");
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      // refresh from DB
      dispatch(fetchNotificationpActions(user?._id));
    } catch (err) {
      console.error("mark read", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        aria-label="Notifications"
      >
        <Bell className={`w-6 h-6 ${unreadCount > 0 ? "text-gray-700 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 border-2 border-white dark:border-neutral-900 shadow-sm animate-pulse-subtle">
             {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-xl z-50 overflow-hidden ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between bg-gray-50/50 dark:bg-neutral-800/50 backdrop-blur-sm">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
              <button 
                className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20" 
                onClick={handleViewAll}
              >
                View all
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
              {notifications?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 dark:text-gray-400">
                  <Bell className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600 opacity-50" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="py-2">
                  {notifications?.slice(0, 5).map((n) => {
                    const isUnread = !n.isRead || n.isRead === "false";
                    return (
                    <div
                      key={n._id}
                      className={`group relative px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors border-b last:border-0 border-gray-50 dark:border-neutral-800 ${
                        isUnread ? "bg-blue-50/30 dark:bg-blue-900/10" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${isUnread ? "bg-blue-600 shadow-sm" : "bg-transparent"}`} />
                        <div className="flex-1 min-w-0">
                           <p className={`text-sm leading-snug ${isUnread ? "font-semibold text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"}`}>
                            {n.message || n.subject}
                          </p>
                          {n.body && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                              {n.body}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                              {new Date(n.createdAt).toLocaleString(undefined, { 
                                month: 'short', 
                                day: 'numeric', 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                             {isUnread && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkRead(n._id);
                                }}
                                className="text-[10px] font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                   {notifications?.length > 5 && (
                    <button 
                      onClick={handleViewAll}
                      className="w-full py-3 text-xs font-medium text-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-50/50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors border-t border-gray-100 dark:border-neutral-800"
                    >
                      View {notifications.length - 5} more...
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationIcon;
