import { useState, useEffect } from "react";
import api from "../../api/axios";

const Completed = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const { data } = await api.get("/tasks/my-history");
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompleted();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Completed Jobs</h1>
      <p className="text-sm text-gray-500 mb-6">Your cleaning history</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Total Completed</div>
          <div className="text-2xl font-bold text-green-600">{tasks.length}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">This Month</div>
          <div className="text-2xl font-bold text-blue-600">
            {tasks.filter((t) => {
              const d = new Date(t.completedAt);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length}
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">✅</div>
          <p>No completed jobs yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((t) => (
            <div key={t._id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">✅</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {t.customer?.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t.car?.brand} {t.car?.model} · {t.car?.licensePlate}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(t.completedAt).toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}{" "}
                    at{" "}
                    {new Date(t.completedAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  Done
                </span>
              </div>
              {t.proofImage && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <img
                    src={t.proofImage}
                    alt="proof"
                    className="w-32 h-24 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Completed;