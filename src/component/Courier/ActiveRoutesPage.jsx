import React from "react";

const ActiveRoutesPage = () => {
  // Example data – replace with API call
  const routes = [
    { id: "RT001", origin: "Abuja", destination: "Lagos", packages: 5 },
    { id: "RT002", origin: "Kano", destination: "Port Harcourt", packages: 3 },
  ];

  return (
    <section className="text-gray-700">
      <h2 className="text-2xl font-bold mb-6">Active Routes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routes.map((r) => (
          <div
            key={r.id}
            className="bg-white shadow rounded-lg p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold mb-2">Route {r.id}</h3>
            <p className="text-gray-600">
              <strong>Origin:</strong> {r.origin}
            </p>
            <p className="text-gray-600">
              <strong>Destination:</strong> {r.destination}
            </p>
            <p className="text-gray-600">
              <strong>Packages:</strong> {r.packages}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActiveRoutesPage;
