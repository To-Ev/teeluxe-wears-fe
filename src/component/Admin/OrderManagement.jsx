import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAdminOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';
import toast from 'react-hot-toast';
import ROLES_LIST from '../../ROLES_LIST';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);
  const { orders, loading, error } = useSelector(state => state.adminOrders);

  useEffect(() => {
    if(!user || user.roles?.Admin !== ROLES_LIST.Admin) {
      navigate("/");
    } else {
      dispatch(fetchAdminOrders());
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }))
      .unwrap()
      .then(() => toast.success("Order status updated"))
      .catch(err => toast.error(err));
  };

  if(loading) return <p className='text-xl text-green-300'>Loading...</p>
  if(error) return <p className='text-gray-500 text-2xl p-6'>{error}</p>

  return (
    <section className='max-w-7xl mx-auto py-6 text-gray-700'>
      <h2 className='text-2xl font-bold mb-6'>Order Management</h2>
      <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <td className="py-3 px-4">Order ID</td>
              <td className="py-3 px-4">Customer</td>
              <td className="py-3 px-4">Total Price</td>
              <td className="py-3 px-4">Status</td>
              <td className="py-3 px-4">Actions</td>
          </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order =>(
                <tr 
                  key={order._id}
                  className='border-b border-gray-200 hover:bg-gray-50 cursor-pointer'
                >
                  <td className="p-4 px-4 text-gray-800 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4">{order.user?.name || "Guest"}</td>
                  <td className="p-4">N{order.totalPrice.toFixed(2)}</td>
                  <td className="p-4">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className='bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-300 block p-2.5 focus:outline-green-200'
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      disabled={order.status === "Delivered"}
                      className={`px-3 py-2 rounded 
                        ${order.status === "Delivered" 
                          ? "bg-green-300 text-white cursor-not-allowed" 
                          : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"}`}
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              )))
            ): (<tr>
                  <td colSpan={5} className='p-4 text-lg text-center text-gray-500'>
                    No orders Found.
                  </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default OrderManagement