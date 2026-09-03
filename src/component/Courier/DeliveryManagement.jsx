import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const DeliveryManagement = () => {
  const navigate = useNavigate();

  // Example data – replace with API call
  const deliveries = [
    { id: "PKG001", destination: "Lagos", status: "Pending" },
    { id: "PKG002", destination: "Abuja", status: "In Transit" },
    { id: "PKG003", destination: "Port Harcourt", status: "Delivered" },
  ];

  const handleRowClick = (orderId) =>{
    navigate(`/courier/deliveries/${orderId}`)
  };

  return (
    <div className="text-gray-700">
      <h2 className="text-2xl font-bold mb-6">Deliveries</h2>
      <table className="w-full border-collapse bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Package ID</th>
            <th className="p-3">Destination</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((d) => (
            <tr key={d.id} 
            onClick={() => handleRowClick(d.id)}
            className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer">
              <td className="p-3">{d.id}</td>
              <td className="p-3">{d.destination}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    d.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : d.status === "In Transit"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {d.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryManagement;