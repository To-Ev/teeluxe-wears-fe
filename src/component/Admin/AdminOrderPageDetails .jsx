import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetails } from '../../redux/slices/adminOrderSlice';

const AdminOrderPageDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedOrder, loading, error } = useSelector(state => state.adminOrders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-green-300 text-2xl p-6">Loading...</p>;
  if (error) return <p className="text-red-400 p-6">Error: {error}</p>;
  if (!selectedOrder) return <p>No Order details found</p>;

  return (
    <section className="max-w-7xl mx-auto p-0 sm:p-6 text-gray-700">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Admin Order Details</h2>
      <div className="p-4 sm:p-6 rounded-lg shadow-lg text-gray-700">
        {/* Order info */}
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Order ID: #{selectedOrder._id}
            </h3>
            <p className="text-gray-600">
              {new Date(selectedOrder.createdAt).toLocaleDateString()}{" "}
              {new Date(selectedOrder.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end mt-4 mb-3 sm:mt-0">
            <span
              className={`${
                selectedOrder.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } px-3 py-1 rounded-full text-sm font-medium mb-3`}
            >
              Payment: {selectedOrder.isPaid ? "Approved" : "Pending"}
            </span>
            <span
              className={`${
                selectedOrder.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              } px-3 py-1 rounded-full text-sm font-medium mb-2`}
            >
              Delivery Status: {selectedOrder.isDelivered ? "Delivered" : selectedOrder.status}
            </span>
          </div>
        </div>

        {/* Customer, payment, shipping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-semibold mb-2">Customer Info</h4>
            <p className="text-lg">Name:{" "}
              <span className="text-gray-600">
                {selectedOrder.shippingAddress?.firstName && selectedOrder.shippingAddress?.lastName
                  ? `${selectedOrder.shippingAddress.firstName} ${selectedOrder.shippingAddress.lastName}`
                  : selectedOrder.user?.name || "N/A"}
              </span>
            </p>
            <p className="text-lg">Email: <span className="text-gray-600">{selectedOrder.user?.email}</span></p>
            <p className="text-lg">Phone: <span className="text-gray-600">{selectedOrder.shippingAddress?.phone ? selectedOrder.shippingAddress?.phone : "N/A"}</span></p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Payment Info</h4>
            <p className="text-lg">Ref: <span className="text-gray-600">
              {selectedOrder.paymentDetails.reference || "N/A"}
            </span></p>
            <p className="text-lg">Status: <span className="text-gray-600">{selectedOrder.isPaid ? "Paid" : "Unpaid"}</span></p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Shipping Info</h4>
            <p className="text-lg">Method: <span className="text-gray-600">{selectedOrder.shippingMethod}</span></p>
            <p className="text-lg">
              Postal Code: <span className="text-gray-600">
                {`${selectedOrder.shippingAddress?.postalCode}`}
              </span>
            </p>
            <p className="text-lg">
              Address: <span className="text-gray-600">
                {`${selectedOrder.shippingAddress?.address}, ${selectedOrder.shippingAddress?.city}, ${selectedOrder.shippingAddress?.country}`}
              </span>
            </p>
          </div>
        </div>

        {/* Product list */}
        <div>
          <h4 className="text-2xl font-semibold mb-4">Order Items</h4>
          <div className="overflow-x-auto sm:overflow-x-hidden">
            <table className="min-w-[500px] md:min-w-0 w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Products</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.orderItems.map(item => (
                  <tr key={item._id} className="border-b text-center border-gray-300">
                    <td className="py-2 px-4 flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg mr-4"/>
                      <Link to={`/product/${item.productId._id}`} className="text-blue-500 hover:underline">
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">N{item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">N{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back link */}
        <Link to="/admin/orders" className="block mt-6 text-blue-500 hover:underline">
          Back to Admin Orders
        </Link>
      </div>
    </section>
  );
};

export default AdminOrderPageDetails;
