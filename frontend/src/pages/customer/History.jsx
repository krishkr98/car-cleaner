import { useState, useEffect } from "react";
import api from "../../api/axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get("/tasks/history");
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cleaning History</h1>

      {history.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🧹</div>
          <p>No cleaning history yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((t) => (
            <div key={t._id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">
                  {t.status === "completed" ? "✅" : t.status === "missed" ? "⚠️" : "⏳"}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {new Date(t.scheduledDate).toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t.car?.brand} {t.car?.model} ·{" "}
                    {t.employee?.name ? `By ${t.employee.name}` : "—"}
                    {t.completedAt && ` · ${new Date(t.completedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`}
                  </div>
                  {t.remarks && (
                    <div className="text-xs text-gray-400 mt-1">Note: {t.remarks}</div>
                  )}
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  t.status === "completed" ? "bg-green-100 text-green-700" :
                  t.status === "missed" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"}`}>
                  {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </span>
              </div>
              {t.proofImage && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-2">📷 Cleaning Proof</div>
                  <img
                    src={t.proofImage}
                    alt="Cleaning proof"
                    className="w-full max-w-xs rounded-lg object-cover h-40"
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

export default History;