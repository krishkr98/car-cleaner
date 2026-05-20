import { Link } from "react-router-dom";

const PACKAGES = [
  { type: "Hatchback", price: 599, icon: "🚗", desc: "Perfect for small cars", popular: false },
  { type: "Sedan", price: 599, icon: "🚙", desc: "Great value for sedans", popular: false },
  { type: "SUV", price: 699, icon: "🛻", desc: "Full coverage for SUVs", popular: true },
];

const FEATURES = [
  "Daily cleaning Mon–Sat",
  "Doorstep service (5–9 AM)",
  "Photo proof after each wash",
  "In-app notifications",
  "Flexible time slot",
  "Dedicated cleaning agent",
];

const Pricing = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Simple Pricing</h1>
        <p className="text-gray-500">Prices exclude GST. Service available Mon–Sat, 5–9 AM.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {PACKAGES.map((p) => (
          <div
            key={p.type}
            className={`bg-white rounded-2xl border p-6 text-center relative ${
              p.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <div className="text-5xl mb-3">{p.icon}</div>
            <div className="font-bold text-xl text-gray-900 mb-1">{p.type}</div>
            <div className="text-3xl font-extrabold text-blue-600 mb-1">
              ₹{p.price}
            </div>
            <div className="text-sm text-gray-500 mb-6">per month + GST</div>
            <div className="space-y-2 mb-6 text-left">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-500 font-bold">✓</span>
                  {f}
                </div>
              ))}
            </div>
            <Link
              to="/register"
              className={`block w-full py-2.5 rounded-xl text-sm font-semibold ${
                p.popular
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            ["What days is the service available?", "Monday to Saturday. No service on Sundays."],
            ["What time will my car be cleaned?", "You choose your preferred slot: before 5, 6, 7, 8, or 9 AM."],
            ["How do I know my car has been cleaned?", "You get an in-app notification with a photo proof after every wash."],
            ["Can I change my time slot?", "Yes, you can update your time slot anytime from the Subscription page."],
            ["Is GST included in the price?", "No, GST is charged extra on the listed prices."],
          ].map(([q, a]) => (
            <div key={q} className="bg-gray-50 rounded-xl p-4">
              <div className="font-semibold text-gray-900 text-sm mb-1">{q}</div>
              <div className="text-gray-500 text-sm">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;