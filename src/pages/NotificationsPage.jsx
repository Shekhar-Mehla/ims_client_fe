import React, { useEffect } from "react";
import { markNotificationRead } from "../features/notification/notificationapi";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotificationpActions } from "../features/notification/notificationAction";

const NotificationsPage = () => {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  // Fixed selector handling
  const { notifications, loading } = useSelector(
    (state) => state.notificationInfo
  );

  const markRead = async (id) => {
    try {
      await markNotificationRead(id);
      if (user?._id) {
        dispatch(fetchNotificationpActions(user._id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
     // Optional: Implement bulk mark read if API supports or loop
     // For now, simple implementation or omit if not part of current scope but UI can have the button
  }

  // Effect to ensure we have latest data on page load
  useEffect(() => {
     if (user?._id) {
        dispatch(fetchNotificationpActions(user._id));
     }
  }, [dispatch, user?._id]);

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-gray-50 dark:bg-neutral-900 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Notifications</h2>
            {/* Future improvement: Mark all read button */}
        </div>
        
        {loading && (
            <div className="flex justify-center py-12">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        )}

        {!loading && notifications?.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-neutral-800 rounded-2xl border border-dashed border-gray-300 dark:border-neutral-700">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No notifications yet.</p>
            <p className="text-sm text-gray-400 mt-2">We'll let you know when something important happens.</p>
          </div>
        )}

        <div className="space-y-4">
          {notifications?.slice().reverse().map((n) => ( // Show newest first if not already sorted
            <div
              key={n._id}
              className={`group relative p-5 rounded-xl border transition-all duration-200 ${
                !n.isRead 
                  ? "bg-white dark:bg-neutral-800 border-blue-100 dark:border-blue-900/30 shadow-sm ring-1 ring-blue-50 dark:ring-blue-900/20" 
                  : "bg-gray-50/50 dark:bg-neutral-900 border-transparent hover:border-gray-200 dark:hover:border-neutral-800"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      {!n.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" title="Unread"></span>
                      )}
                      <h3 className={`text-base ${!n.isRead ? "font-semibold text-gray-900 dark:text-gray-100" : "font-medium text-gray-700 dark:text-gray-300"}`}>
                        {n.message || n.subject}
                      </h3>
                   </div>
                  
                  {n.body && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{n.body}</div>
                  )}
                  
                  <div className="mt-3 flex items-center gap-4">
                     <span className="text-xs text-gray-400 font-medium">
                        {new Date(n.createdAt).toLocaleString(undefined, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                        })}
                     </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {!n.isRead && (
                    <button
                      onClick={() => markRead(n._id)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
