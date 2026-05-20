import { Link } from "react-router-dom";

const PACKAGES = [
  { type: "Hatchback", price: 599, icon: "🚗", desc: "Perfect for small cars" },
  { type: "Sedan", price: 599, icon: "🚙", desc: "Great value for sedans" },
  { type: "SUV", price: 699, icon: "🛻", desc: "Full coverage for SUVs" },
];

const Landing = () => {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)" }}
        className="text-white py-20 px-6 text-center">
        <div className="text-5xl mb-4">🚿✨</div>
        <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
          Your Car, Spotless Every Morning
        </h1>
        <p className="text-slate-400 max-w-md mx-auto mb-8 text-lg">
          Doorstep car cleaning service between 5–9 AM. Subscribe monthly, relax daily.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700">
            Get Started
          </Link>
          <Link to="/pricing"
            className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-xl font-semibold hover:bg-white/20">
            View Pricing
          </Link>
        </div>
      </div>

      {/* How it works */}
      <div className="py-16 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto sm:grid-cols-4">
          {[
            ["1", "Subscribe", "Choose your car type and time slot", "🗓️"],
            ["2", "We Assign", "Our agent is assigned to your area", "👷"],
            ["3", "Gets Cleaned", "Car cleaned every Mon–Sat morning", "🧹"],
            ["4", "Get Notified", "Photo proof sent after every wash", "📲"],
          ].map(([n, title, desc, icon]) => (
            <div key={n} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-xs text-blue-600 font-bold mb-1">Step {n}</div>
              <div className="font-semibold text-gray-900 text-sm mb-1">{title}</div>
              <div className="text-xs text-gray-500">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Flexible Packages</h2>
        <p className="text-gray-500 mb-10">Mon–Sat service · Doorstep cleaning · Photo proof</p>
        <div className="flex gap-4 justify-center flex-wrap">
          {PACKAGES.map((p) => (
            <div key={p.type} className="bg-white border border-gray-200 rounded-xl p-6 min-w-40 text-center">
              <div className="text-4xl mb-2">{p.icon}</div>
              <div className="font-bold text-gray-900 mb-1">{p.type}</div>
              <div className="text-2xl font-extrabold text-blue-600">
                ₹{p.price}<span className="text-sm font-normal text-gray-500">/mo</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 py-16 px-6 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
        <p className="text-blue-100 mb-6">Join hundreds of happy customers today.</p>
        <Link to="/register"
          className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50">
          Subscribe Now
        </Link>
      </div>
    </div>
  );
};

export default Landing;