import { useState, useEffect } from "react";
import api from "../../api/axios";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await api.get("/admin/tasks");
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/admin/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = tasks
    .filter((t) => filter === "all" || t.status === filter)
    .filter((t) =>
      search === "" ||
      t.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.employee?.name?.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">{tasks.length} total tasks</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer or employee..."
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "assigned", "completed", "missed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f} ({f === "all" ? tasks.length : tasks.filter((t) => t.status === f).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📋</div>
          <p>No tasks found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t._id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-gray-900">{t.customer?.name}</div>
                  <div className="text-sm text-gray-500">📍 {t.customer?.address}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    t.status === "completed" ? "bg-green-100 text-green-700" :
                    t.status === "missed" ? "bg-red-100 text-red-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                  </span>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="text-red-400 hover:text-red-600 text-sm px-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3 sm:grid-cols-4">
                <span>🚗 {t.car?.brand} {t.car?.model}</span>
                <span>🔢 {t.car?.licensePlate}</span>
                <span>⏰ {t.timeSlot}</span>
                <span>📅 {new Date(t.scheduledDate).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric"
                })}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-sm">
                  👷 Employee:{" "}
                  <span className="font-medium text-gray-900">
                    {t.employee?.name || "Not assigned"}
                  </span>
                  {t.employee?.area && (
                    <span className="text-gray-400"> · {t.employee.area}</span>
                  )}
                </div>
                {t.status === "completed" && t.proofImage && (
                  <a href={t.proofImage} target="_blank" rel="noreferrer"
                    className="text-blue-600 text-sm hover:underline">
                    📷 View Proof
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTasks;