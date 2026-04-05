import React from 'react'

const OrderConfirmationPage = () => {

    const calculateEstimatedDelivery = (createdAt) =>{
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10); //add ten days to orderDate
        return orderDate.toLocaleDateString();
    }
    const checkOut = {
        _id: "100456",
        createdAt: new Date(),
        paymentMethod: "Paystack",
        checkOutProduct: [
            {
                productId: "1",
                name: "Jacket",
                size: "M",
                color: "Black",
                price: 200,
                quantity: 1,
                image: "https://picsum.photos/200?random=1"
            },
            {
                productId: "2",
                name: "Shoe",
                size: 43,
                color: "Black",
                price: 200,
                quantity: 1,
                image: "https://picsum.photos/200?random=2"
            },
        ],
        shippingAddress: {
            address: "N0 38 polyfarm Nariya",
            city: "Kaduna",
            country: "Nigeria",
        }
    }
  return (
    <section className='max-w-4xl mx-auto p-6'>
        <h1 className='text-4xl text-center text-emerald-700 mb-8'>Thank you for your order!</h1>
        {checkOut && 
            (
                <div className='p-6 bg-gray-50 shadow-lg rounded-lg'>
                    <div className='flex justify-between mb-10'>
                        {/* Order Id & Date  */}
                        <div>
                            <h1 className='text-xl font-semibold text-gray-700 mb-4'>
                                Order ID: {checkOut._id}
                            </h1>
                            <p className='text-gray-700'>
                                Order Date: {new Date(checkOut.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        {/* Estimated Delivery  */}
                        <div>
                            <p className='text-emerald-700 text-sm'>
                                Estimated Delivery: {" "}
                                {calculateEstimatedDelivery(checkOut.createdAt)}
                            </p>
                        </div>
                    </div>
                    {/* Ordered Items  */}
                    <div className='mb-10'>
                        {
                            checkOut.checkOutProduct.map((item) =>(
                                <div className='flex text-gray-700 space-y-3 items-center'
                                    key={item.productId}>
                                    <img 
                                     className='object-cover w-16 h-16 rounded-md mr-4'
                                     src={item.image} alt={item.name}/>
                                    <div>
                                        <h4 className='font-semibold'>{item.name}</h4>
                                        <p className="text-sm">
                                            {item.size} | {item.color}
                                        </p>
                                    </div>
                                    <div className='ml-auto text-right'>
                                        <h4 className='text-md'>N{item.price}</h4>
                                        <p className="text-sm text-gray-500">
                                            Qts: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                               
                            ))
                        }
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 text-gray-700'>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                            <p>Payment Method: {checkOut.paymentMethod}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                            <p>Shipping Method: {checkOut.shippingMethod}</p>
                            <p>
                                Address: {" "}
                                {`${checkOut.shippingAddress.city}, ${checkOut.shippingAddress.country}`}
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    </section>
  )
}

export default OrderConfirmationPage