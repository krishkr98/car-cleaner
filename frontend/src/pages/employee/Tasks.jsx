import { useState, useEffect } from "react";
import api from "../../api/axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(null);
  const [remarks, setRemarks] = useState({});
  const [image, setImage] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await api.get("/tasks/my-tasks");
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      if (remarks[taskId]) formData.append("remarks", remarks[taskId]);
      if (image[taskId]) formData.append("proofImage", image[taskId]);
      const { data } = await api.patch(`/tasks/${taskId}/complete`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTasks(tasks.map((t) => (t._id === taskId ? data.task : t)));
      setUploading(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete task");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const pending = tasks.filter((t) => t.status === "assigned");
  const completed = tasks.filter((t) => t.status === "completed");

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-sm text-gray-500 mt-1">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: tasks.length },
          { label: "Completed", value: completed.length, color: "text-green-600" },
          { label: "Pending", value: pending.length, color: "text-orange-500" },
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color || "text-gray-900"}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>
      )}

      {tasks.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📋</div>
          <p>No tasks assigned for today.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((t) => (
            <div key={t._id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-gray-900">{t.customer?.name}</div>
                  <div className="text-sm text-gray-500">📍 {t.customer?.address}</div>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  t.status === "completed" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                }`}>
                  {t.status === "completed" ? "Done" : "Pending"}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                <span>🚗 {t.car?.brand} {t.car?.model}</span>
                <span>🔢 {t.car?.licensePlate}</span>
                <span>⏰ {t.timeSlot}</span>
                <span>📦 {t.car?.type}</span>
              </div>

              {t.status === "assigned" && (
                uploading === t._id ? (
                  <div className="bg-gray-50 rounded-xl p-4 mt-2">
                    <div className="font-medium text-sm text-gray-900 mb-3">
                      Upload Cleaning Proof
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage({ ...image, [t._id]: e.target.files[0] })}
                      className="w-full text-sm text-gray-500 mb-3 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <textarea
                      value={remarks[t._id] || ""}
                      onChange={(e) => setRemarks({ ...remarks, [t._id]: e.target.value })}
                      placeholder="Optional remarks..."
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleComplete(t._id)}
                        disabled={submitting}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                      >
                        {submitting ? "Submitting..." : "✅ Mark Complete & Notify"}
                      </button>
                      <button
                        onClick={() => setUploading(null)}
                        className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setUploading(t._id)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    📷 Upload & Complete
                  </button>
                )
              )}

              {t.status === "completed" && (
                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-lg">
                    ✅ Cleaned · {new Date(t.completedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg">
                    🔔 Customer notified
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;