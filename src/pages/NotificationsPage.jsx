import React, { useEffect } from "react";
import { markNotificationRead } from "../features/notification/notificationapi";
import { useSelector, useDispatch } from "react-redux";
import { fetchInternshipActions } from "../features/internship/internshipaction";

const NotificationsPage = () => {
  const { user } = useSelector((state) => state.userInfo);
  const { notifications, loading } = useSelector(
    (state) => state.notificationInfo
  );

  const markRead = async (id) => {
    try {
      await markNotificationRead(id);
      // refresh from DB after marking as read
      // if (users?._id) {

      // }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        {loading && <div className="text-gray-500">Loading…</div>}

        {!loading && notifications?.length === 0 && (
          <div className="text-gray-500">No notifications yet.</div>
        )}

        <div className="space-y-3 mt-4">
          {notifications?.map((n) => (
            <div
              key={n._id}
              className={`p-4 border rounded-md ${
                n.isRead ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{n.message || n.subject}</div>
                  {n.body && (
                    <div className="text-sm text-gray-500 mt-1">{n.body}</div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                  {!n.isRead && (
                    <button
                      onClick={() => markRead(n._id)}
                      className="text-sm text-blue-600"
                    >
                      Mark read
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
