import { useState, useEffect } from "react";
import api from "../../api/axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingArea, setEditingArea] = useState(null);
  const [areaValue, setAreaValue] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await api.get("/admin/employees");
        setEmployees(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleUpdateArea = async (id) => {
    try {
      const { data } = await api.patch(`/admin/employees/${id}`, { area: areaValue });
      setEmployees(employees.map((e) => (e._id === id ? data : e)));
      setEditingArea(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500 mt-1">{employees.length} cleaning agents</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search employees..."
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">👷</div>
          <p>No employees found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((e) => (
            <div key={e._id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600">
                  {e.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{e.name}</div>
                  <div className="text-sm text-gray-500">{e.email} · {e.phone || "No phone"}</div>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  Active
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                {editingArea === e._id ? (
                  <div className="flex gap-2">
                    <input
                      value={areaValue}
                      onChange={(ev) => setAreaValue(ev.target.value)}
                      placeholder="Enter area e.g. Sector 15-20, Noida"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleUpdateArea(e._id)}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingArea(null)}
                      className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      📍 Area: <span className="font-medium">{e.area || "Not assigned"}</span>
                    </div>
                    <button
                      onClick={() => { setEditingArea(e._id); setAreaValue(e.area || ""); }}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Edit Area
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Employees;