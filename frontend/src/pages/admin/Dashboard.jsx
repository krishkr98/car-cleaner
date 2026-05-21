import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your CAR CLEANERS platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-5">
        {[
          { label: "Customers", value: stats?.customers || 0, color: "text-blue-600", icon: "👤" },
          { label: "Employees", value: stats?.employees || 0, color: "text-purple-600", icon: "👷" },
          { label: "Active Subs", value: stats?.subscriptions || 0, color: "text-green-600", icon: "📦" },
          { label: "Total Tasks", value: stats?.tasks || 0, color: "text-orange-600", icon: "📋" },
          { label: "Done Today", value: stats?.completedToday || 0, color: "text-green-600", icon: "✅" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { title: "Assign Tasks", desc: "Assign cleaning tasks to employees", link: "/admin/assign", icon: "📋", color: "bg-blue-600" },
          { title: "View Tasks", desc: "Monitor all cleaning tasks", link: "/admin/tasks", icon: "👁️", color: "bg-purple-600" },
          { title: "Customers", desc: "View all registered customers", link: "/admin/customers", icon: "👤", color: "bg-green-600" },
          { title: "Employees", desc: "Manage cleaning agents", link: "/admin/employees", icon: "👷", color: "bg-orange-600" },
        ].map((a) => (
          <Link key={a.title} to={a.link}
            className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className={`${a.color} text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
              {a.icon}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{a.title}</div>
              <div className="text-sm text-gray-500">{a.desc}</div>
            </div>
            <div className="ml-auto text-gray-400">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;