import { useState, useEffect } from "react";
import api from "../../api/axios";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ brand: "", model: "", type: "Hatchback", licensePlate: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data } = await api.get("/cars");
      setCars(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/cars", form);
      setCars([...cars, data]);
      setShowAdd(false);
      setForm({ brand: "", model: "", type: "Hatchback", licensePlate: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add car");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/cars/${id}`);
      setCars(cars.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Cars</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Add Car
        </button>
      </div>

      {showAdd && (
        <div className="bg-white border border-blue-300 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Add New Car</h2>
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[["brand", "Brand", "e.g. Maruti"], ["model", "Model", "e.g. Swift"], ["licensePlate", "License Plate", "e.g. UP32 AB 1234"]].map(([k, l, ph]) => (
                <div key={k}>
                  <label className="block text-xs text-gray-500 mb-1">{l}</label>
                  <input
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    placeholder={ph}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Car Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {["Hatchback", "Sedan", "SUV"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                Save Car
              </button>
              <button type="button" onClick={() => setShowAdd(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {cars.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🚗</div>
          <p>No cars added yet. Add your first car!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cars.map((c) => (
            <div key={c._id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <div className="text-4xl">{c.type === "SUV" ? "🛻" : c.type === "Sedan" ? "🚙" : "🚗"}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{c.brand} {c.model}</div>
                <div className="text-sm text-gray-500">{c.licensePlate}</div>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${c.type === "SUV" ? "bg-orange-100 text-orange-700" : c.type === "Sedan" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                {c.type}
              </span>
              <button onClick={() => handleDelete(c._id)} className="text-red-400 hover:text-red-600 text-sm">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;