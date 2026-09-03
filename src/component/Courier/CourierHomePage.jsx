import React from "react";
import { FaBox, FaTruck, FaCheckCircle, FaChartLine } from "react-icons/fa";

const CourierHomePage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Pending Deliveries */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
        <FaBox className="text-blue-600 text-3xl" />
        <div>
          <h3 className="text-lg font-semibold">Pending Deliveries</h3>
          <p className="text-gray-600">12 packages awaiting pickup</p>
        </div>
      </div>

      {/* Active Routes */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
        <FaTruck className="text-green-600 text-3xl" />
        <div>
          <h3 className="text-lg font-semibold">Active Routes</h3>
          <p className="text-gray-600">3 ongoing deliveries</p>
        </div>
      </div>

      {/* Completed Deliveries */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
        <FaCheckCircle className="text-amber-500 text-3xl" />
        <div>
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-gray-600">45 deliveries this week</p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4 md:col-span-2 xl:col-span-3">
        <FaChartLine className="text-purple-600 text-3xl" />
        <div>
          <h3 className="text-lg font-semibold">Performance</h3>
          <p className="text-gray-600">92% on-time delivery rate</p>
        </div>
      </div>
    </div>
  );
};

export default CourierHomePage;
