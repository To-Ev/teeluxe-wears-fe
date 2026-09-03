import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBox, FaTruck, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const CourierSidebar = () => {
  return (
    <aside className="flex flex-col bg-gray-900 text-amber-50 w-full min-h-screen shadow-lg">
      {/* Logo / Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-xl font-bold text-amber-400">Courier Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          to="/courier"
          className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-gray-800 transition"
        >
          <FaHome className="w-6 h-7"/> <span>Dashboard</span>
        </Link>

        <Link
          to="/courier/deliveries"
          className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-gray-800 transition"
        >
          <FaBox className="w-6 h-7"/> <span>Deliveries</span>
        </Link>

        <Link
          to="/courier/active-routes"
          className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-gray-800 transition"
        >
          <FaTruck className="w-6 h-7"/> <span>Active Routes</span>
        </Link>

        <Link
          to="/courier/profile"
          className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-gray-800 transition"
        >
          <FaUserCircle className="w-6 h-7"/> <span>Profile</span>
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button className="flex items-center gap-3 w-full px-3 py-4 rounded-md hover:bg-gray-800 transition">
          <FaSignOutAlt className="w-6 h-6"/> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default CourierSidebar;
