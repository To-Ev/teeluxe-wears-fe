import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClosingLogs } from "../../redux/slices/adminOrderSlice";

const ClosingLogsTable = () => {
  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        await dispatch(fetchClosingLogs()).unwrap();
  
        // you can set local state here if needed
        // setLogs(logs);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
      }
    };

    loadLogs();
  }, [dispatch]);

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Closing History</h2>

      {loading && <p className="text-blue-500 text-2xl">Loading logs...</p>}
      {error && <p className="text-red-500 text-2xl">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700 border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Admin</th>
                <th className="py-3 px-4">Orders Cleared</th>
                <th className="py-3 px-4">Revenue Reset</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr
                    key={log._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4">{log.admin?.name || "Unknown"}</td>
                    <td className="p-4">{log.clearedOrders}</td>
                    <td className="p-4">N{log.resetRevenue.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No closing events recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ClosingLogsTable;
