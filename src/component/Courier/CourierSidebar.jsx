import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaTruck, FaStore, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { removeFromCart } from "../../redux/slices/cartSlice";

const CourierSidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logoutUser());
    dispatch(removeFromCart());
    navigate("/");
  };

  return (
    <aside className="flex flex-col bg-gray-900 text-amber-50 w-full min-h-screen shadow-lg">
      {/* Logo / Header */}
      <i className="icon-Derayo text-4xl p-4 text-amber-100"></i>
      <div className="flex items-center justify-center h-10 border-b border-gray-700">
        <h1 className="text-xl font-bold text-amber-200 pb-3">Courier Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          to="/courier"
          className="text-gray-300 hover:bg-gray-300 hover:text-white py-3 px-4 rounded flex items-center space-x-2">
          <FaHome className="w-6 h-7"/> <span>Dashboard</span>
        </Link>

        <NavLink
          to="/courier/deliveries"
          className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-300 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
          <FaBox className="w-6 h-7"/> <span>Deliveries</span>
        </NavLink>

        <NavLink
          to="/courier/active-routes"
          className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-300 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
          <FaTruck className="w-6 h-7"/> <span>Active Routes</span>
        </NavLink>

        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-gray-800 transition"
        >
          <FaStore className="w-6 h-7"/> <span>Shop</span>
        </NavLink>
      </nav>

      {/* Footer / Logout */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className="flex items-center cursor-pointer gap-3 w-full px-3 py-4 rounded-md hover:bg-gray-800 transition">
            <FaSignOutAlt className="w-6 h-6"/> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default CourierSidebar;
