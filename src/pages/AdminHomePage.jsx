import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { closeYear, fetchAdminOrders } from '../redux/slices/adminOrderSlice';
import { fetchAdminProducts } from '../redux/slices/adminProductsSlice';
import toast from 'react-hot-toast';
import ClosingLogsTable from '../component/Admin/ClosingLogsTable';
import { FaLock } from 'react-icons/fa';

const AdminHomePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  
  const {
    products, 
    loading: productLoading, 
    error: productError
  } = useSelector(state => state.adminProducts);

  const {
    orders,
    totalOrders,
    totalSales,
    loading,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector(state => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) =>{
    navigate(`/admin/orders/${orderId}`)
  };

  const handleConfirm = () => {
    dispatch(closeYear())
      .unwrap()
      .then(() => toast.success("Year closed successfully"))
      .catch(err => toast.error(err));
    setShowModal(false);
  };

  return (
    <section className='max-w-7xl mx-auto py-6 text-gray-700'>
      <h1 className="text-3xl font-bold  mb-6">Admin Dashboard</h1>
      {productLoading || ordersLoading ? (
        <p className='text-green-300 text-2xl'>Loading...</p>
      ) : productError ? (
        <p className='text-red-400 text-2xl'>{productError}</p>
      ) : ordersError ? (
        <p className='text-red-400 text-2xl'>{ordersError}</p>
      ) : (
        // Dashboard
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 shadow-md rounded-lg">
            <h2 className='text-xl font-semibold'>Revenue</h2>
            <p className='text-2xl'>N{totalSales.toFixed(2)}</p>
          </div>
          <div className="p-4 shadow-md rounded-lg">
            <h2 className='text-xl font-semibold'>Total Orders</h2>
            <p className='text-2xl'>{totalOrders}</p>
            <Link to="/admin/orders" className='text-blue-500 hover:underline'>Manage Orders
            </Link>
          </div>
          <div className="p-4 shadow-md rounded-lg">
            <h2 className='text-xl font-semibold'>Total Products</h2>
            <p className='text-2xl'>{products.length}</p>
            <Link to="/admin/products" className='text-blue-500 hover:underline'>Manage Products
            </Link>
          </div>
        </div>
      )}

      {/* Closing logs  */}
      <ClosingLogsTable />
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className='min-w-full text-left text-gray-500'>
            <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
              <tr>
                <th className='py-3 px-4'>Order ID</th>
                <th className='py-3 px-4'>User</th>
                <th className='py-3 px-4'>Total Price</th>
                <th className='py-3 px-4'>Status</th>
              </tr>
            </thead>
            <tbody >
              {orders.length > 0 ? (
                orders.map((order) => (
                <tr 
                  key={order._id} 
                  onClick={() => handleRowClick(order._id)}
                  className='border-b border-gray-200 hover:bg-gray-50 cursor-pointer'>
                  <td className='p-4'>#{order._id}</td>
                  <td className='p-4'>{order.user?.name || "Guest"}</td>
                  <td className='p-4'>N{order.totalPrice.toFixed(2)}</td>
                  <td className='p-4'>{order.status}</td>
                </tr>
                ))
              ): (
                <tr className='my-6'>
                  <td colSpan={4} className='p-4 text-center text-lg text-gray-500'> 
                    No recent Order found
                  </td>
                </tr>
              )} 
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal setup */}
      <div className="mt-6 flex w-full justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer transition"
        >
          <FaLock /> End of Year Closing
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Closing</h2>
            <p className="mb-6 text-gray-600">
              This will permanently clear all orders and reset revenue to zero.
              Are you sure?
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Closing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AdminHomePage