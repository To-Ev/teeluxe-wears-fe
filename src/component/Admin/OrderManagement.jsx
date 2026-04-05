import React from 'react'

const OrderManagement = () => {
  const orders = [
    {
      _id: 12313425,
      user: {
        name: "Aderayo Aduke",
      },
      totalPrice: 110,
      status: "processing",
    },
    {
      _id: 1231425,
      user: {
        name: "Jomiloju Aduke",
      },
      totalPrice: 110,
      status: "Delivered",
    },
  ];

  const handleStatusChange= (orderId, status) =>{
    console.log({ id: orderId, status});
  }

  return (
    <section className='max-w-7xl mx-auto p-6 text-gray-700'>
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
                  <td className="p-4">{order.user.name}</td>
                  <td className="p-4">N{order.totalPrice}</td>
                  <td className="p-4">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className='bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-300 block p-2.5 focus:outline-green-200'
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className='bg-green-500 text-white px-3 cursor-pointer py-2 rounded hover:bg-green-600'>
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