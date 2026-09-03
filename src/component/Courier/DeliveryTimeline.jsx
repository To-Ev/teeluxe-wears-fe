import React from "react";
import { FaBox, FaTruck, FaHome } from "react-icons/fa";

const DeliveryTimeline = ({ status }) => {
  // Define steps
  const steps = [
    { id: 1, label: "Picked Up", icon: <FaBox />, key: "picked" },
    { id: 2, label: "In Transit", icon: <FaTruck />, key: "transit" },
    { id: 3, label: "Delivered", icon: <FaHome />, key: "delivered" },
  ];

  // Map status to active step
  const activeStep =
    status === "Pending"
      ? 1
      : status === "In Transit"
      ? 2
      : status === "Delivered"
      ? 3
      : 0;

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mt-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex-1 flex flex-col items-center relative">
          {/* Circle */}
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
              activeStep >= step.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-200 text-gray-500 border-gray-300"
            }`}
          >
            {step.icon}
          </div>
          {/* Label */}
          <p
            className={`mt-2 text-sm font-medium ${
              activeStep >= step.id ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {step.label}
          </p>
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`absolute top-6 left-full w-full h-0.5 ${
                activeStep > step.id ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeliveryTimeline;
