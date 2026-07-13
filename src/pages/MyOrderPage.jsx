import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../redux/slices/orderSlice';

const MyOrderPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleRowClick = (orderId) =>{
        navigate(`/orders/${orderId}`)
    };

    if(loading) return <p className='text-green-300 text-2xl p-6'>Loading...</p>
    if(error) return <p className='text-red-400 p-6'>{error}</p>

  return (
    <section className='max-w-7xl mx-auto p-4 sm:p-6 text-gray-700'>
        <h1 className='text-xl sm:text-2xl text-gray-700 mb-6 font-semibold'>My Orders</h1>
        <div className='overflow-x-scroll shadow-md sm:rounded-lg'>
            <table className='min-w-full md:w-2/3 text-left'>
                <thead className=' bg-gray-100 text-xs uppercase'>
                    <tr>
                        <th className='py-2 px-4 sm:py-3'>Image</th>
                        <th className='py-2 px-4 sm:py-3'>Order ID</th>
                        <th className='py-2 px-4 sm:py-3'>Created</th>
                        <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                        <th className='py-2 px-4 sm:py-3'>Items</th>
                        <th className='py-2 px-4 sm:py-3'>Price</th>
                        <th className='py-2 p1-4 sm:py-3'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (orders.length > 0 ) ? (
                            orders.map(order => (
                            <tr key={order._id} 
                                onClick={() => handleRowClick(order._id)}
                                className='border-b border-gray-300 hover:border-gray-100 cursor-pointer'>
                                <td className="p-2 sm:p-4">
                                    <div className="flex flex-wrap gap-2">
                                        <img 
                                            src={order.orderItems[0]?.image}
                                            alt={order.orderItems[0]?.name}
                                            className="w-12 h-12 object-cover rounded-md" 
                                        />
                                    </div>
                                </td>
                                <td className='p-2 sm:p-4'>#{order._id}</td>
                                <td className='p-2 sm:p-4'>
                                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                                    {new Date(order.createdAt).toLocaleTimeString()}
                                </td>
                                <td className='p-2 sm:p-4'>
                                    {order.shippingAddress ? 
                                    `${order.shippingAddress.city}, ${order.shippingAddress.country}` : 'N/A'}
                                </td>
                                <td className='p-2 sm:p-4'>{order.orderItems.length}</td>
                                <td className='p-2 sm:p-4'>N{order.totalPrice.toFixed(2)}</td>
                                <td className='p-2 sm:p-4'>
                                    <span 
                                    className={`rounded text-xs px-3 py-2 ${order.isPaid ? `bg-green-100 text-green-500` : 'bg-red-100 text-red-500'}`}>
                                        {order.isPaid ? 'Paid' : 'Pending'}
                                    </span>
                                    
                                </td>
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan={7} className='text-gray-500 text-center px-4 py-6 text-3xl font-semibold'>You have no order</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
       </div>
    </section>
  )
}

export default MyOrderPage