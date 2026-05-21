import { useState, useEffect } from "react";
import api from "../../api/axios";

const AssignTask = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    subscriptionId: "",
    employeeId: "",
    scheduledDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, empRes] = await Promise.all([
          api.get("/admin/subscriptions"),
          api.get("/admin/employees"),
        ]);
        setSubscriptions(subRes.data.filter((s) => s.status === "active"));
        setEmployees(empRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedSub = subscriptions.find((s) => s._id === form.subscriptionId);

  const handleSubmit = async () => {
    if (!form.subscriptionId || !form.employeeId || !form.scheduledDate) {
      setError("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/admin/tasks", {
        customerId: selectedSub.customer._id,
        employeeId: form.employeeId,
        carId: selectedSub.car._id,
        scheduledDate: form.scheduledDate,
        timeSlot: selectedSub.timeSlot,
        subscriptionId: form.subscriptionId,
      });
      setSuccess("Task assigned successfully! Employee will see it in their task list.");
      setForm({ subscriptionId: "", employeeId: "", scheduledDate: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign task");
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Assign Task</h1>
        <p className="text-sm text-gray-500 mt-1">
          Assign a cleaning task to an employee
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">{success}</div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">

        {/* Select Subscription */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Customer Subscription
          </label>
          <select
            value={form.subscriptionId}
            onChange={(e) => setForm({ ...form, subscriptionId: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a subscription --</option>
            {subscriptions.map((s) => (
              <option key={s._id} value={s._id}>
                {s.customer?.name} · {s.car?.brand} {s.car?.model} ({s.car?.licensePlate}) · {s.timeSlot}
              </option>
            ))}
          </select>
        </div>

        {/* Show selected subscription details */}
        {selectedSub && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <div className="font-semibold text-blue-900 mb-2">Subscription Details</div>
            <div className="grid grid-cols-2 gap-2 text-blue-800">
              <span>👤 {selectedSub.customer?.name}</span>
              <span>📍 {selectedSub.customer?.address}</span>
              <span>🚗 {selectedSub.car?.brand} {selectedSub.car?.model}</span>
              <span>🔢 {selectedSub.car?.licensePlate}</span>
              <span>📦 {selectedSub.packageType}</span>
              <span>⏰ {selectedSub.timeSlot}</span>
            </div>
          </div>
        )}

        {/* Select Employee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign to Employee
          </label>
          <select
            value={form.employeeId}
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select an employee --</option>
            {employees.map((e) => (
              <option key={e._id} value={e._id}>
                {e.name} {e.area ? `· ${e.area}` : "· No area assigned"}
              </option>
            ))}
          </select>
        </div>

        {/* Select Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scheduled Date
          </label>
          <input
            type="date"
            value={form.scheduledDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Assigning..." : "✅ Assign Task to Employee"}
        </button>
      </div>
    </div>
  );
};

export default AssignTask;