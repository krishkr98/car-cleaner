import { useState, useEffect } from "react";
import api from "../../api/axios";

const PACKAGES = [
  { type: "Hatchback", price: 599, icon: "🚗", desc: "Perfect for small cars" },
  { type: "Sedan", price: 599, icon: "🚙", desc: "Great value for sedans" },
  { type: "SUV", price: 699, icon: "🛻", desc: "Full coverage for SUVs" },
];

const SLOTS = ["Before 5 AM", "Before 6 AM", "Before 7 AM", "Before 8 AM", "Before 9 AM"];

const Subscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, carsRes] = await Promise.all([
          api.get("/subscriptions"),
          api.get("/cars"),
        ]);
        setSubscription(subRes.data);
        setCars(carsRes.data);
        if (subRes.data) {
          setSelectedPackage(subRes.data.packageType);
          setSelectedSlot(subRes.data.timeSlot);
          setSelectedCar(subRes.data.car?._id || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!selectedCar || !selectedPackage || !selectedSlot) {
      setError("Please select a car, package and time slot");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await api.post("/subscriptions", {
        carId: selectedCar,
        packageType: selectedPackage,
        timeSlot: selectedSlot,
      });
      setSubscription(data);
      setSuccess("Subscription updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save subscription");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel your subscription?")) return;
    try {
      await api.delete("/subscriptions");
      setSubscription(null);
      setSelectedCar("");
      setSelectedPackage("");
      setSelectedSlot("");
      setSuccess("Subscription cancelled.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel");
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Subscription</h1>

      {subscription && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex justify-between items-center">
          <div>
            <div className="font-semibold text-blue-900">Active Plan: {subscription.packageType}</div>
            <div className="text-sm text-blue-700">
              ₹{subscription.pricePerMonth}/month · {subscription.timeSlot} · Renews{" "}
              {new Date(subscription.renewalDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </div>
          </div>
          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">Active</span>
        </div>
      )}

      {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm mb-4">{success}</div>}

      {/* Car Selection */}
      <div className="mb-6">
        <div className="font-semibold text-gray-900 mb-3">Select Car</div>
        {cars.length === 0 ? (
          <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
            No cars added yet. <a href="/cars" className="text-blue-600 hover:underline">Add a car first</a>
          </div>
        ) : (
          <div className="space-y-2">
            {cars.map((c) => (
              <div
                key={c._id}
                onClick={() => setSelectedCar(c._id)}
                className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer ${selectedCar === c._id ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              >
                <div className="text-2xl">{c.type === "SUV" ? "🛻" : c.type === "Sedan" ? "🚙" : "🚗"}</div>
                <div>
                  <div className="font-medium text-sm text-gray-900">{c.brand} {c.model}</div>
                  <div className="text-xs text-gray-500">{c.licensePlate}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Package Selection */}
      <div className="mb-6">
        <div className="font-semibold text-gray-900 mb-3">Choose Package</div>
        <div className="grid grid-cols-3 gap-3">
          {PACKAGES.map((p) => (
            <div
              key={p.type}
              onClick={() => setSelectedPackage(p.type)}
              className={`border rounded-xl p-4 text-center cursor-pointer ${selectedPackage === p.type ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
            >
              <div className="text-3xl mb-1">{p.icon}</div>
              <div className="font-semibold text-sm text-gray-900">{p.type}</div>
              <div className="text-blue-600 font-bold">₹{p.price}<span className="text-xs font-normal text-gray-500">/mo</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Slot Selection */}
      <div className="mb-8">
        <div className="font-semibold text-gray-900 mb-3">Preferred Time Slot</div>
        <div className="flex flex-wrap gap-2">
          {SLOTS.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSlot(s)}
              className={`border rounded-lg px-4 py-2 text-sm ${selectedSlot === s ? "border-blue-500 bg-blue-50 text-blue-700 font-medium" : "border-gray-200 text-gray-600"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : subscription ? "Update Subscription" : "Subscribe Now"}
        </button>
        {subscription && (
          <button
            onClick={handleCancel}
            className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-medium hover:bg-red-100"
          >
            Cancel Plan
          </button>
        )}
      </div>
    </div>
  );
};

export default Subscription;