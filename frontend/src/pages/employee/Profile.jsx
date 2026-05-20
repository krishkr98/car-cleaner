import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-3">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="font-bold text-lg text-gray-900">{user?.name}</div>
        <div className="text-sm text-gray-500 mb-3">Cleaning Agent</div>
        <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
          Active
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {[
          ["Email", user?.email],
          ["Phone", user?.phone || "—"],
          ["Area", user?.area || "—"],
          ["Role", user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)],
          ["Member Since", new Date(user?.createdAt).toLocaleDateString("en-IN", {
            day: "numeric", month: "long", year: "numeric"
          })],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between items-center px-4 py-3 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm font-medium text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;