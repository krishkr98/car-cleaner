import { useState } from "react";

const PACKAGES = [
  { type: "Hatchback", price: 499, icon: "🚗", desc: "Perfect for small cars" },
  { type: "Sedan", price: 459, icon: "🚙", desc: "Great value for sedans" },
  { type: "SUV", price: 599, icon: "🛻", desc: "Full coverage for SUVs" },
];

const SLOTS = ["Before 5 AM", "Before 6 AM", "Before 7 AM", "Before 8 AM", "Before 9 AM"];

const mockCustomer = {
  name: "Rahul Sharma",
  email: "rahul@email.com",
  phone: "+91 98765 43210",
  address: "B-42, Sector 15, Noida, UP 201301",
  cars: [
    { id: 1, brand: "Maruti", model: "Swift", type: "Hatchback", plate: "UP32 AB 1234" },
    { id: 2, brand: "Honda", model: "City", type: "Sedan", plate: "DL03 CD 5678" },
  ],
  subscription: { active: true, package: "Hatchback", slot: "Before 7 AM", renewsOn: "Jun 14, 2025", carId: 1 },
};

const mockEmployee = {
  name: "Suresh Kumar",
  area: "Sector 15–20, Noida",
  completedToday: 4,
  totalJobs: 127,
};

const mockTasks = [
  { id: 1, customer: "Rahul Sharma", address: "B-42, Sector 15, Noida", car: "Maruti Swift", plate: "UP32 AB 1234", slot: "Before 7 AM", status: "pending", type: "Hatchback" },
  { id: 2, customer: "Priya Mehta", address: "C-12, Sector 16, Noida", car: "Honda City", plate: "DL03 XY 9876", slot: "Before 6 AM", status: "completed", type: "Sedan", image: "✅" },
  { id: 3, customer: "Amit Verma", address: "A-5, Sector 18, Noida", car: "Toyota Fortuner", plate: "UP16 GH 3344", slot: "Before 8 AM", status: "pending", type: "SUV" },
  { id: 4, customer: "Neha Singh", address: "F-7, Sector 15, Noida", car: "Hyundai i20", plate: "HR26 PQ 7788", slot: "Before 7 AM", status: "completed", type: "Hatchback", image: "✅" },
];

const mockHistory = [
  { date: "May 14, 2025", car: "Maruti Swift", status: "Cleaned", employee: "Suresh K.", time: "6:42 AM" },
  { date: "May 13, 2025", car: "Maruti Swift", status: "Cleaned", employee: "Ramesh P.", time: "6:55 AM" },
  { date: "May 12, 2025", car: "Maruti Swift", status: "Cleaned", employee: "Suresh K.", time: "6:38 AM" },
  { date: "May 10, 2025", car: "Maruti Swift", status: "Cleaned", employee: "Vinod T.", time: "7:01 AM" },
  { date: "May 9, 2025", car: "Maruti Swift", status: "Missed", employee: "–", time: "–" },
];

const mockNotifs = [
  { id: 1, msg: "Your Maruti Swift has been cleaned today by CAR CLEANERS.", time: "6:42 AM · Today", read: false },
  { id: 2, msg: "Your Maruti Swift has been cleaned today by CAR CLEANERS.", time: "6:55 AM · Yesterday", read: true },
  { id: 3, msg: "Subscription renewed successfully for ₹499/month.", time: "May 14 · 12:00 AM", read: true },
];

const clr = {
  blue: "#1a6ef5", blueBg: "#e8f0fe", blueText: "#1a56cc",
  green: "#16a34a", greenBg: "#dcfce7", greenText: "#15803d",
  orange: "#ea580c", orangeBg: "#fff7ed", orangeText: "#c2410c",
  red: "#dc2626", redBg: "#fef2f2", redText: "#b91c1c",
  gray: "#6b7280", grayBg: "#f9fafb", grayBorder: "#e5e7eb",
  dark: "#111827", mid: "#374151", light: "#9ca3af",
};

const Badge = ({ color, children }) => {
  const map = { green: [clr.greenBg, clr.greenText], blue: [clr.blueBg, clr.blueText], orange: [clr.orangeBg, clr.orangeText], red: [clr.redBg, clr.redText] };
  const [bg, txt] = map[color] || [clr.grayBg, clr.gray];
  return <span style={{ background: bg, color: txt, fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 99, display: "inline-block" }}>{children}</span>;
};

const Card = ({ children, style }) => (
  <div style={{ background: "#fff", border: `1px solid ${clr.grayBorder}`, borderRadius: 12, padding: "16px 20px", ...style }}>{children}</div>
);

const Stat = ({ label, value, sub, color }) => (
  <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 16px", flex: 1, minWidth: 100 }}>
    <div style={{ fontSize: 12, color: clr.gray, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 600, color: color || clr.dark }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: clr.light, marginTop: 2 }}>{sub}</div>}
  </div>
);

const NavBar = ({ page, setPage, role, setRole }) => (
  <div style={{ background: "#fff", borderBottom: `1px solid ${clr.grayBorder}`, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, zIndex: 100 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 20 }}>🚿</span>
      <span style={{ fontWeight: 700, fontSize: 15, color: clr.dark, letterSpacing: "-0.3px" }}>CAR CLEANERS</span>
    </div>
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {role === null && (
        <>
          <button onClick={() => setPage("landing")} style={{ background: "none", border: "none", fontSize: 13, color: page === "landing" ? clr.blue : clr.mid, fontWeight: page === "landing" ? 600 : 400, cursor: "pointer", padding: "4px 8px" }}>Home</button>
          <button onClick={() => setPage("pricing")} style={{ background: "none", border: "none", fontSize: 13, color: page === "pricing" ? clr.blue : clr.mid, fontWeight: page === "pricing" ? 600 : 400, cursor: "pointer", padding: "4px 8px" }}>Pricing</button>
          <button onClick={() => { setRole("customer"); setPage("c-dashboard"); }} style={{ background: clr.blue, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, padding: "7px 16px", cursor: "pointer" }}>Customer Login</button>
          <button onClick={() => { setRole("employee"); setPage("e-tasks"); }} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, padding: "7px 16px", cursor: "pointer" }}>Employee Login</button>
        </>
      )}
      {role === "customer" && (
        <>
          {[["c-dashboard", "Dashboard"], ["c-cars", "My Cars"], ["c-subscription", "Subscription"], ["c-history", "History"], ["c-notifs", "Alerts"]].map(([p, l]) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: "none", fontSize: 12, color: page === p ? clr.blue : clr.mid, fontWeight: page === p ? 600 : 400, cursor: "pointer", padding: "4px 8px" }}>{l}</button>
          ))}
          <button onClick={() => { setRole(null); setPage("landing"); }} style={{ background: "#fee2e2", color: clr.red, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 500, padding: "6px 12px", cursor: "pointer" }}>Logout</button>
        </>
      )}
      {role === "employee" && (
        <>
          {[["e-tasks", "My Tasks"], ["e-history", "Completed"], ["e-profile", "Profile"]].map(([p, l]) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: "none", fontSize: 12, color: page === p ? clr.blue : clr.mid, fontWeight: page === p ? 600 : 400, cursor: "pointer", padding: "4px 8px" }}>{l}</button>
          ))}
          <button onClick={() => { setRole(null); setPage("landing"); }} style={{ background: "#fee2e2", color: clr.red, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 500, padding: "6px 12px", cursor: "pointer" }}>Logout</button>
        </>
      )}
    </div>
  </div>
);

const LandingPage = ({ setPage, setRole }) => (
  <div>
    <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)", color: "#fff", padding: "72px 40px", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚿✨</div>
      <h1 style={{ fontSize: 38, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-1px" }}>Your Car, Spotless Every Morning</h1>
      <p style={{ fontSize: 16, color: "#94a3b8", maxWidth: 500, margin: "0 auto 32px" }}>Doorstep car cleaning service between 5–9 AM. Subscribe monthly, relax daily.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => { setRole("customer"); setPage("c-dashboard"); }} style={{ background: clr.blue, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, padding: "12px 28px", cursor: "pointer" }}>Get Started</button>
        <button onClick={() => setPage("pricing")} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 15, fontWeight: 500, padding: "12px 28px", cursor: "pointer" }}>View Pricing</button>
      </div>
    </div>

    <div style={{ padding: "48px 32px", background: "#f9fafb" }}>
      <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: clr.dark, marginBottom: 32 }}>How It Works</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, maxWidth: 720, margin: "0 auto" }}>
        {[
          ["1", "Subscribe", "Choose your car type and time slot", "🗓️"],
          ["2", "We Assign", "Our agent is assigned to your area", "👷"],
          ["3", "Gets Cleaned", "Car cleaned every Mon–Sat morning", "🧹"],
          ["4", "Get Notified", "Photo proof sent after every wash", "📲"],
        ].map(([n, title, desc, icon]) => (
          <Card key={n} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 12, color: clr.blue, fontWeight: 700, marginBottom: 4 }}>Step {n}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: clr.dark, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: clr.gray }}>{desc}</div>
          </Card>
        ))}
      </div>
    </div>

    <div style={{ padding: "48px 32px", textAlign: "center" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: clr.dark, marginBottom: 8 }}>Flexible Packages</h2>
      <p style={{ color: clr.gray, marginBottom: 32 }}>Mon–Sat service · Doorstep cleaning · Photo proof</p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        {PACKAGES.map(p => (
          <Card key={p.type} style={{ minWidth: 160, textAlign: "center" }}>
            <div style={{ fontSize: 32 }}>{p.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: clr.dark, margin: "8px 0 4px" }}>{p.type}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: clr.blue }}>₹{p.price}<span style={{ fontSize: 13, fontWeight: 400, color: clr.gray }}>/mo</span></div>
            <div style={{ fontSize: 12, color: clr.gray, marginTop: 4 }}>{p.desc}</div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

const PricingPage = () => (
  <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
    <h1 style={{ fontSize: 26, fontWeight: 800, color: clr.dark, marginBottom: 4 }}>Simple Pricing</h1>
    <p style={{ color: clr.gray, marginBottom: 32 }}>Prices exclude GST. Service available Mon–Sat, 5–9 AM.</p>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {PACKAGES.map((p, i) => (
        <Card key={p.type} style={{ flex: 1, minWidth: 160, textAlign: "center", border: i === 2 ? `2px solid ${clr.blue}` : undefined }}>
          {i === 2 && <div style={{ background: clr.blueBg, color: clr.blueText, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, display: "inline-block", marginBottom: 8 }}>Most Popular</div>}
          <div style={{ fontSize: 36 }}>{p.icon}</div>
          <div style={{ fontWeight: 700, fontSize: 18, color: clr.dark, margin: "10px 0 4px" }}>{p.type}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: clr.blue, marginBottom: 4 }}>₹{p.price}</div>
          <div style={{ fontSize: 12, color: clr.gray, marginBottom: 16 }}>per month + GST</div>
          {["Daily cleaning Mon–Sat", "Doorstep service (5–9 AM)", "Photo proof after each wash", "In-app notifications", "Flexible time slot"].map(f => (
            <div key={f} style={{ fontSize: 13, color: clr.mid, padding: "4px 0", borderBottom: `1px solid ${clr.grayBorder}`, textAlign: "left" }}>✓ {f}</div>
          ))}
        </Card>
      ))}
    </div>
  </div>
);

const CustomerDashboard = ({ setPage }) => {
  const s = mockCustomer.subscription;
  const car = mockCustomer.cars.find(c => c.id === s.carId);
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "28px 20px" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: clr.dark, margin: 0 }}>Good morning, {mockCustomer.name.split(" ")[0]} 👋</h2>
        <p style={{ color: clr.gray, margin: "4px 0 0", fontSize: 14 }}>Here's your cleaning status for today.</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <Stat label="Active Subscription" value={s.active ? "Active" : "Inactive"} sub={`Renews ${s.renewsOn}`} color={s.active ? clr.green : clr.red} />
        <Stat label="Time Slot" value={s.slot} sub="Mon–Sat" />
        <Stat label="Package" value={s.package} sub={`₹${PACKAGES.find(p => p.type === s.package)?.price}/mo`} />
        <Stat label="Cars Registered" value={mockCustomer.cars.length} />
      </div>

      <Card style={{ marginBottom: 16, background: clr.greenBg, border: `1px solid #bbf7d0` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 28 }}>✅</div>
          <div>
            <div style={{ fontWeight: 600, color: clr.greenText, fontSize: 15 }}>Your car was cleaned today!</div>
            <div style={{ fontSize: 13, color: clr.greenText, opacity: 0.8 }}>{car?.brand} {car?.model} · Cleaned at 6:42 AM by Suresh Kumar</div>
          </div>
          <button onClick={() => setPage("c-history")} style={{ marginLeft: "auto", background: clr.green, color: "#fff", border: "none", borderRadius: 8, fontSize: 12, padding: "6px 14px", cursor: "pointer" }}>View Proof</button>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ fontWeight: 600, fontSize: 14, color: clr.dark, marginBottom: 12 }}>Active Car</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ fontSize: 32 }}>🚗</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: clr.dark }}>{car?.brand} {car?.model}</div>
              <div style={{ fontSize: 12, color: clr.gray }}>{car?.plate} · {car?.type}</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 600, fontSize: 14, color: clr.dark, marginBottom: 12 }}>Recent Notification</div>
          <div style={{ fontSize: 13, color: clr.mid }}>🔔 {mockNotifs[0].msg}</div>
          <div style={{ fontSize: 11, color: clr.light, marginTop: 4 }}>{mockNotifs[0].time}</div>
        </Card>
      </div>
    </div>
  );
};

const CustomerCars = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ brand: "", model: "", type: "Hatchback", plate: "" });
  const [cars, setCars] = useState(mockCustomer.cars);
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: clr.dark, margin: 0 }}>My Cars</h2>
        <button onClick={() => setShowAdd(!showAdd)} style={{ background: clr.blue, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, padding: "8px 16px", cursor: "pointer" }}>+ Add Car</button>
      </div>
      {showAdd && (
        <Card style={{ marginBottom: 20, border: `1px solid ${clr.blue}` }}>
          <div style={{ fontWeight: 600, marginBottom: 12, color: clr.dark }}>Add New Car</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["brand", "Brand", "e.g. Maruti"], ["model", "Model", "e.g. Swift"], ["plate", "License Plate", "e.g. UP32 AB 1234"]].map(([k, l, ph]) => (
              <div key={k}>
                <label style={{ fontSize: 12, color: clr.gray, display: "block", marginBottom: 4 }}>{l}</label>
                <input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={ph} style={{ width: "100%", border: `1px solid ${clr.grayBorder}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, boxSizing: "border-box" }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, color: clr.gray, display: "block", marginBottom: 4 }}>Car Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ width: "100%", border: `1px solid ${clr.grayBorder}`, borderRadius: 8, padding: "8px 10px", fontSize: 13 }}>
                {["Hatchback", "Sedan", "SUV"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => { if (form.brand && form.model && form.plate) { setCars([...cars, { ...form, id: cars.length + 1 }]); setShowAdd(false); setForm({ brand: "", model: "", type: "Hatchback", plate: "" }); } }} style={{ background: clr.blue, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, padding: "8px 20px", cursor: "pointer" }}>Save</button>
            <button onClick={() => setShowAdd(false)} style={{ background: "#f3f4f6", color: clr.mid, border: "none", borderRadius: 8, fontSize: 13, padding: "8px 16px", cursor: "pointer" }}>Cancel</button>
          </div>
        </Card>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {cars.map(c => (
          <Card key={c.id} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 36 }}>{c.type === "SUV" ? "🛻" : c.type === "Sedan" ? "🚙" : "🚗"}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: clr.dark }}>{c.brand} {c.model}</div>
              <div style={{ fontSize: 13, color: clr.gray }}>{c.plate}</div>
            </div>
            <Badge color={c.type === "SUV" ? "orange" : c.type === "Sedan" ? "blue" : "green"}>{c.type}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CustomerSubscription = () => {
  const [selected, setSelected] = useState(null);
  const [slot, setSlot] = useState("Before 7 AM");
  const [subbed, setSubbed] = useState(true);
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: clr.dark, marginBottom: 20 }}>Subscription</h2>
      {subbed && (
        <Card style={{ marginBottom: 24, background: clr.blueBg, border: `1px solid #bfdbfe` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: clr.blueText }}>Active Plan: Hatchback</div>
              <div style={{ fontSize: 13, color: clr.blue }}>₹499/month · {mockCustomer.subscription.slot} · Renews Jun 14, 2025</div>
            </div>
            <Badge color="blue">Active</Badge>
          </div>
        </Card>
      )}
      <div style={{ fontWeight: 600, fontSize: 15, color: clr.dark, marginBottom: 12 }}>Choose a Package</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {PACKAGES.map(p => (
          <div key={p.type} onClick={() => setSelected(p.type)} style={{ flex: 1, minWidth: 130, border: `2px solid ${selected === p.type ? clr.blue : clr.grayBorder}`, borderRadius: 12, padding: "16px 12px", textAlign: "center", cursor: "pointer", background: selected === p.type ? clr.blueBg : "#fff" }}>
            <div style={{ fontSize: 28 }}>{p.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: clr.dark, margin: "6px 0 2px" }}>{p.type}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: clr.blue }}>₹{p.price}/mo</div>
          </div>
        ))}
      </div>
      <div style={{ fontWeight: 600, fontSize: 15, color: clr.dark, marginBottom: 10 }}>Preferred Time Slot</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {SLOTS.map(s => (
          <button key={s} onClick={() => setSlot(s)} style={{ border: `1px solid ${slot === s ? clr.blue : clr.grayBorder}`, borderRadius: 8, padding: "7px 14px", fontSize: 13, background: slot === s ? clr.blueBg : "#fff", color: slot === s ? clr.blueText : clr.mid, cursor: "pointer", fontWeight: slot === s ? 600 : 400 }}>{s}</button>
        ))}
      </div>
      <button onClick={() => { if (selected) setSubbed(true); }} style={{ background: selected ? clr.blue : clr.grayBorder, color: selected ? "#fff" : clr.gray, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, padding: "12px 28px", cursor: selected ? "pointer" : "default" }}>
        {subbed ? "Update Subscription" : "Subscribe Now"}
      </button>
    </div>
  );
};

const CustomerHistory = () => (
  <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: clr.dark, marginBottom: 20 }}>Cleaning History</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {mockHistory.map((h, i) => (
        <Card key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 28 }}>{h.status === "Cleaned" ? "🧹" : "⚠️"}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: clr.dark }}>{h.date}</div>
            <div style={{ fontSize: 13, color: clr.gray }}>{h.car} · By {h.employee} {h.time !== "–" ? `at ${h.time}` : ""}</div>
          </div>
          <Badge color={h.status === "Cleaned" ? "green" : "red"}>{h.status}</Badge>
          {h.status === "Cleaned" && <button style={{ background: clr.grayBg, border: `1px solid ${clr.grayBorder}`, borderRadius: 8, fontSize: 12, padding: "5px 10px", cursor: "pointer", color: clr.mid }}>📷 Proof</button>}
        </Card>
      ))}
    </div>
  </div>
);

const CustomerNotifs = () => {
  const [notifs, setNotifs] = useState(mockNotifs);
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: clr.dark, margin: 0 }}>Notifications</h2>
        <button onClick={() => setNotifs(notifs.map(n => ({ ...n, read: true })))} style={{ background: "none", border: "none", color: clr.blue, fontSize: 13, cursor: "pointer" }}>Mark all read</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {notifs.map(n => (
          <Card key={n.id} style={{ display: "flex", gap: 12, background: n.read ? "#fff" : clr.blueBg, border: n.read ? `1px solid ${clr.grayBorder}` : `1px solid #bfdbfe` }}>
            <div style={{ fontSize: 22 }}>🔔</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: clr.dark, fontWeight: n.read ? 400 : 600 }}>{n.msg}</div>
              <div style={{ fontSize: 12, color: clr.light, marginTop: 4 }}>{n.time}</div>
            </div>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: clr.blue, marginTop: 6 }} />}
          </Card>
        ))}
      </div>
    </div>
  );
};

const EmployeeTasks = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [uploading, setUploading] = useState(null);
  const [remarks, setRemarks] = useState({});
  const [notifSent, setNotifSent] = useState({});

  const complete = (id) => {
    setUploading(null);
    setTasks(tasks.map(t => t.id === id ? { ...t, status: "completed", image: "✅" } : t));
    setNotifSent(n => ({ ...n, [id]: true }));
  };

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "28px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: clr.dark, margin: 0 }}>Assigned Tasks</h2>
        <p style={{ color: clr.gray, fontSize: 14, margin: "4px 0 0" }}>Area: {mockEmployee.area} · Today, May 15</p>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <Stat label="Total Today" value={tasks.length} />
        <Stat label="Completed" value={tasks.filter(t => t.status === "completed").length} color={clr.green} />
        <Stat label="Pending" value={tasks.filter(t => t.status === "pending").length} color={clr.orange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {tasks.map(t => (
          <Card key={t.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: clr.dark }}>{t.customer}</div>
                <div style={{ fontSize: 13, color: clr.gray }}>📍 {t.address}</div>
              </div>
              <Badge color={t.status === "completed" ? "green" : "orange"}>{t.status === "completed" ? "Done" : "Pending"}</Badge>
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: clr.mid, marginBottom: 10 }}>
              <span>🚗 {t.car} ({t.plate})</span>
              <span>⏰ {t.slot}</span>
              <span>📦 {t.type}</span>
            </div>
            {t.status === "pending" && (
              uploading === t.id ? (
                <div style={{ background: clr.grayBg, borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: clr.dark, marginBottom: 8 }}>Upload cleaning proof</div>
                  <div style={{ border: `2px dashed ${clr.grayBorder}`, borderRadius: 8, padding: "20px", textAlign: "center", marginBottom: 10, cursor: "pointer", color: clr.gray, fontSize: 13 }}>
                    📷 Click to upload photo
                  </div>
                  <input value={remarks[t.id] || ""} onChange={e => setRemarks({ ...remarks, [t.id]: e.target.value })} placeholder="Optional remarks..." style={{ width: "100%", border: `1px solid ${clr.grayBorder}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, marginBottom: 10, boxSizing: "border-box" }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => complete(t.id)} style={{ background: clr.green, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, padding: "8px 18px", cursor: "pointer" }}>✅ Mark Complete & Notify</button>
                    <button onClick={() => setUploading(null)} style={{ background: "#f3f4f6", color: clr.mid, border: "none", borderRadius: 8, fontSize: 13, padding: "8px 14px", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setUploading(t.id)} style={{ background: clr.blue, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, padding: "8px 18px", cursor: "pointer" }}>📷 Upload & Complete</button>
              )
            )}
            {t.status === "completed" && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ background: clr.greenBg, borderRadius: 8, padding: "6px 12px", fontSize: 13, color: clr.greenText, fontWeight: 500 }}>✅ Cleaned · Photo uploaded</div>
                {notifSent[t.id] && <div style={{ background: clr.blueBg, borderRadius: 8, padding: "6px 12px", fontSize: 13, color: clr.blueText }}>🔔 Customer notified</div>}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

const EmployeeHistory = () => (
  <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: clr.dark, marginBottom: 20 }}>Completed Jobs</h2>
    <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
      <Stat label="Today" value="4" color={clr.green} />
      <Stat label="This Week" value="23" />
      <Stat label="This Month" value="94" />
      <Stat label="Total" value="127" />
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {mockTasks.filter(t => t.status === "completed").map(t => (
        <Card key={t.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 28 }}>✅</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: clr.dark }}>{t.customer} · {t.car}</div>
            <div style={{ fontSize: 13, color: clr.gray }}>{t.address} · {t.slot}</div>
          </div>
          <Badge color="green">Done</Badge>
        </Card>
      ))}
    </div>
  </div>
);

const EmployeeProfile = () => (
  <div style={{ maxWidth: 500, margin: "0 auto", padding: "28px 20px" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: clr.dark, marginBottom: 20 }}>My Profile</h2>
    <Card style={{ textAlign: "center", marginBottom: 20 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: clr.blueBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: clr.blueText, margin: "0 auto 12px" }}>SK</div>
      <div style={{ fontWeight: 700, fontSize: 18, color: clr.dark }}>{mockEmployee.name}</div>
      <div style={{ fontSize: 13, color: clr.gray, marginBottom: 12 }}>Cleaning Agent</div>
      <Badge color="green">Active</Badge>
    </Card>
    <Card>
      {[["Area", mockEmployee.area], ["Jobs Today", mockEmployee.completedToday], ["Total Completed", mockEmployee.totalJobs], ["Rating", "4.8 ⭐"]].map(([l, v]) => (
        <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${clr.grayBorder}`, fontSize: 14 }}>
          <span style={{ color: clr.gray }}>{l}</span>
          <span style={{ fontWeight: 500, color: clr.dark }}>{v}</span>
        </div>
      ))}
    </Card>
  </div>
);

export default function App() {
  const [page, setPage] = useState("landing");
  const [role, setRole] = useState(null);

  const views = {
    landing: <LandingPage setPage={setPage} setRole={setRole} />,
    pricing: <PricingPage />,
    "c-dashboard": <CustomerDashboard setPage={setPage} />,
    "c-cars": <CustomerCars />,
    "c-subscription": <CustomerSubscription />,
    "c-history": <CustomerHistory />,
    "c-notifs": <CustomerNotifs />,
    "e-tasks": <EmployeeTasks />,
    "e-history": <EmployeeHistory />,
    "e-profile": <EmployeeProfile />,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <NavBar page={page} setPage={setPage} role={role} setRole={setRole} />
      <div>{views[page] || views.landing}</div>
    </div>
  );
}