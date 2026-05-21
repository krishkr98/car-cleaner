import { useState, useEffect } from "react";
import api from "../../api/axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, subRes] = await Promise.all([
          api.get("/admin/customers"),
          api.get("/admin/subscriptions"),
        ]);
        setCustomers(custRes.data);
        setSubscriptions(subRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getSub = (customerId) =>
    subscriptions.find((s) => s.customer?._id === customerId && s.status === "active");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">{customers.length} registered</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">👤</div>
          <p>No customers found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => {
            const sub = getSub(c._id);
            return (
              <div key={c._id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{c.name}</div>
                    <div className="text-sm text-gray-500">{c.email} · {c.phone || "No phone"}</div>
                    {c.address && <div className="text-xs text-gray-400 mt-0.5">📍 {c.address}</div>}
                  </div>
                  <div className="text-right">
                    {sub ? (
                      <div>
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                          Active · {sub.packageType}
                        </span>
                        <div className="text-xs text-gray-400 mt-1">{sub.timeSlot}</div>
                      </div>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                        No subscription
                      </span>
                    )}
                  </div>
                </div>
                {sub && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex gap-4 text-xs text-gray-500">
                    <span>🚗 {sub.car?.brand} {sub.car?.model}</span>
                    <span>🔢 {sub.car?.licensePlate}</span>
                    <span>💰 ₹{sub.pricePerMonth}/mo</span>
                    <span>🔄 Renews {new Date(sub.renewalDate).toLocaleDateString("en-IN")}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Customers;