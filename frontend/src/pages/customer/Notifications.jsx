import { useState, useEffect } from "react";
import api from "../../api/axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get("/notifications");
        setNotifications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const markOneRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      ));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-blue-600 hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🔔</div>
          <p>No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => !n.isRead && markOneRead(n._id)}
              className={`border rounded-xl p-4 flex gap-3 cursor-pointer transition ${
                n.isRead
                  ? "bg-white border-gray-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="text-2xl">🔔</div>
              <div className="flex-1">
                <div className={`text-sm ${n.isRead ? "text-gray-700" : "text-gray-900 font-medium"}`}>
                  {n.message}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString("en-IN")}
                </div>
                {n.imageUrl && (
                  <img
                    src={n.imageUrl}
                    alt="proof"
                    className="mt-2 w-32 h-24 rounded-lg object-cover"
                  />
                )}
              </div>
              {!n.isRead && (
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;