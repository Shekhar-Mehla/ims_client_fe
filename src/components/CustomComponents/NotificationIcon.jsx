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
  const { items: notifications } = useSelector(
    (state) => state.notificationInfo
  );

  const { users } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!users?._id) return;
    // fetch on mount
    dispatch(fetchNotificationpActions(users?._id));
    // optional: keep interval if you prefer polling
    const id = setInterval(
      () => dispatch(fetchNotificationpActions(users?._id)),
      60_000
    );
    return () => clearInterval(id);
  }, [dispatch, users?._id]);

  const unreadCount = (notifications || []).filter((n) => !n.isRead).length;

  const toggleOpen = () => setOpen((s) => !s);

  const handleViewAll = () => {
    setOpen(false);
    navigate("/notifications");
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      // refresh from DB
      dispatch(fetchNotifications(users?._id));
    } catch (err) {
      console.error("mark read", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition relative"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-900 border rounded-md shadow-lg z-50">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Notifications</div>
              <button className="text-sm text-blue-600" onClick={handleViewAll}>
                View all
              </button>
            </div>

            {notifications.length === 0 && (
              <div className="text-sm text-gray-500">No notifications</div>
            )}

            <div className="space-y-2 max-h-64 overflow-auto">
              {notifications.slice(0, 8).map((n) => (
                <div
                  key={n._id}
                  className={`p-2 rounded-md hover:bg-gray-50 dark:hover:bg-neutral-800 ${
                    n.isRead ? "opacity-80" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm">
                      {n.message || n.body || n.subject}
                    </div>
                    {!n.isRead && (
                      <button
                        onClick={() => handleMarkRead(n._id)}
                        className="text-xs text-blue-600"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
