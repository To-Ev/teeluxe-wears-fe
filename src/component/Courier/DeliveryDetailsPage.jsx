import React from "react";
import { FaBox, FaMapMarkerAlt, FaUser, FaClock, FaCheckCircle } from "react-icons/fa";
import DeliveryTimeline from "./DeliveryTimeline"; // import the timeline component

const DeliveryDetailsPage = () => {
  // Example data – replace with API call
  const delivery = {
    id: "PKG001",
    recipient: "John Doe",
    destination: "Lagos, Nigeria",
    status: "In Transit",
    estimatedDelivery: "Sept 5, 2026 - 2:00 PM",
    courier: "Bee Courier",
  };

  return (
    <div className="max-w-3xl text-gray-700 mx-auto bg-white shadow-lg rounded-lg p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-400 pb-4 mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaBox className="text-blue-600" /> Delivery #{delivery.id}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            delivery.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : delivery.status === "In Transit"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {delivery.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FaUser className="text-gray-500" />
          <p><strong>Recipient:</strong> {delivery.recipient}</p>
        </div>

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-red-500" />
          <p><strong>Destination:</strong> {delivery.destination}</p>
        </div>

        <div className="flex items-center gap-3">
          <FaClock className="text-amber-500" />
          <p><strong>ETA:</strong> {delivery.estimatedDelivery}</p>
        </div>

        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-green-600" />
          <p><strong>Courier:</strong> {delivery.courier}</p>
        </div>
      </div>

      {/* Timeline */}
      <DeliveryTimeline status={delivery.status} />

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Mark as Delivered
        </button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">
          Report Issue
        </button>
      </div>
    </div>
  );
};

export default DeliveryDetailsPage;
