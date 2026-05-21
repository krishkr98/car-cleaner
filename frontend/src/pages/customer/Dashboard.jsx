import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [history, setHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, histRes, notifRes] = await Promise.all([
          api.get("/subscriptions"),
          api.get("/tasks/history"),
          api.get("/notifications"),
        ]);
        setSubscription(subRes.data);
        setHistory(histRes.data.slice(0, 3));
        setNotifications(notifRes.data.filter((n) => !n.isRead).slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const lastCleaned = history.find((t) => t.status === "completed");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Good morning, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's your cleaning status for today.
        </p>
      </div>

{/* Stats */}
<div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-4">
  {[
    { label: "Subscriptions", value: Array.isArray(subscription) ? subscription.length : subscription ? 1 : 0, color: "text-green-600" },
    { label: "Package", value: Array.isArray(subscription) && subscription.length > 0 ? subscription.map(s => s.packageType).join(", ") : subscription?.packageType || "—" },
    { label: "Cars Subscribed", value: Array.isArray(subscription) ? subscription.length : subscription ? 1 : 0 },
    { label: "Next Renewal", value: Array.isArray(subscription) && subscription.length > 0 ? new Date(subscription[0].renewalDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : subscription ? new Date(subscription.renewalDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—" },
  ].map((s) => (
    <div key={s.label} className="bg-gray-50 rounded-xl p-4">
      <div className="text-xs text-gray-500 mb-1">{s.label}</div>
      <div className={`text-lg font-semibold ${s.color || "text-gray-900"}`}>{s.value}</div>
    </div>
  ))}
</div>

      {/* Last cleaned */}
      {lastCleaned && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-4">
          <div className="text-3xl">✅</div>
          <div className="flex-1">
            <div className="font-semibold text-green-800">Car cleaned recently!</div>
            <div className="text-sm text-green-700">
              {lastCleaned.car?.brand} {lastCleaned.car?.model} · By{" "}
              {lastCleaned.employee?.name || "Agent"} ·{" "}
              {new Date(lastCleaned.completedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
          {lastCleaned.proofImage && (
            <img src={lastCleaned.proofImage} alt="proof" className="w-14 h-14 rounded-lg object-cover" />
          )}
        </div>
      )}

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="font-semibold text-gray-900 mb-3">Recent Alerts</div>
          {notifications.map((n) => (
            <div key={n._id} className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
              <div className="text-lg">🔔</div>
              <div>
                <div className="text-sm text-gray-800">{n.message}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {new Date(n.createdAt).toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No subscription */}
      {!subscription && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">🚗</div>
          <div className="font-semibold text-blue-900 mb-1">No active subscription</div>
          <div className="text-sm text-blue-700 mb-4">Subscribe to start getting your car cleaned daily!</div>
          <a href="/subscription" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            Subscribe Now
          </a>
        </div>
      )}
    </div>
  );
};

export default Dashboard;