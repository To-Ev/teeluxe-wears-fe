import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MyOrderPage = () => {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        // Simulate orders 
        setTimeout(() => {
            const mockOrder = [
                {
                    _id: 123,
                    createdAt: new Date(),
                    shippingAddress: {city: 'Lagos', country: 'Nigeria'},
                    orderedItems: [
                        {
                            name: 'product 1',
                            image: 'https://picsum.photos/200?random=1'
                        },
                    ],
                    totalPrice: 100,
                    isPaid: true
                },
                {
                    _id: 456,
                    createdAt: new Date(),
                    shippingAddress: {city: 'Kano', country: 'Nigeria'},
                    orderedItems: [
                        {
                            name: 'product 2',
                            image: 'https://picsum.photos/200?random=2'
                        },
                    ],
                    totalPrice: 100,
                    isPaid: false
                },
            ];

            setOrders(mockOrder)
        }, 1000);
    }, [])

    const handleRowClick = (orderId) =>{
        navigate(`/order/${orderId}`)
    }
  return (
    <section className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h1 className='text-xl sm:text-2xl text-gray-700 mb-6 font-semibold'>My Orders</h1>
        <div className='overflow-x-scroll sm:overflow-hidden shadow-md sm:rounded-lg'>
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
                                <td className='p-2 sm:p-4'>
                                    <img 
                                     src={order.orderedItems[0].image} alt={order.orderedItems[0].name} 
                                     className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'
                                    />
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
                                <td className='p-2 sm:p-4'>{order.orderedItems.length}</td>
                                <td className='p-2 sm:p-4'>N{order.totalPrice}</td>
                                <td className='p-2 sm:p-4'>
                                    <span 
                                    className={`rounded text-xs px-3 py-2 ${order.isPaid ? `bg-green-100 text-green-500` : 'bg-red-100 text-red-500'}`}>
                                        {order.isPaid ? 'Paid' : 'Pending'}
                                    </span>
                                    
                                </td>
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan={7} className='text-center px-4 py-6 text-3xl font-semibold'>You have no order</td>
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