import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';

const OrderConfirmationPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector(state => state.checkout);

    // clear the cart when the order is confirmed
    useEffect(() => {
        if(checkout && checkout._id) {
            dispatch(clearCart());
            localStorage.removeItem("cart");
        } else {
            navigate("/my-orders");
        }
    }, [checkout, dispatch, navigate]);

    const calculateEstimatedDelivery = (createdAt) =>{
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10); //add ten days to orderDate
        return orderDate.toLocaleDateString();
    };

  return (
    <section className='max-w-4xl mx-auto p-6'>
        <div className='flex flex-col justify-center w-full items-center my-8'>
            <h1 className='text-3xl sm:text-4xl text-gray-700 font-bold mb-1'>Your order is completed!</h1>
            <p className='text-gray-600 text-md sm:text-lg'>Thank you. Your Order has been received.</p>
        </div>
        {checkout && 
            (
                <div className='p-6 shadow-lg rounded-lg'>
                    <div className='flex justify-between mb-10 sm:flex-row flex-col'>
                        {/* Order Id & Date  */}
                        <div>
                            <h1 className='sm:text-xl font-semibold text-gray-600 mb-4'>
                                Order ID: #{checkout._id}
                            </h1>
                            <p className='text-gray-700 sm:text-lg'>
                                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        {/* Estimated Delivery  */}
                        <div className='mr-auto mt-1 sm:mr-0 text-right'>
                            <p className='text-emerald-700 text-md'>
                                Estimated Delivery: {" "}
                                {calculateEstimatedDelivery(checkout.createdAt)}
                            </p>
                        </div>
                    </div>
                    {/* Ordered Items  */}
                    <div className='mb-10'>
                        {Array.isArray(checkout?.orderItems) && checkout.orderItems.map((item, index) => (
                        <div key={index} className="flex text-gray-700 space-y-3 items-center">
                            <img
                            className="object-cover w-16 h-16 rounded-md mr-4"
                            src={item.image}
                            alt={item.name}
                            />
                            <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm">{item.size} | {item.color}</p>
                            </div>
                            <div className="ml-auto text-right">
                            <h4 className="sm:text-lg">N{item.price}</h4>
                            <p className="text-md text-gray-500">Qts: {item.quantity}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700'>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Payment Info</h4>
                            <p className='text-lg'>Payment Method: <span className='text-gray-600'>{checkout.paymentMethod}</span></p>
                            <p className='text-lg'>Ref: <span className='text-gray-600'>{checkout.paymentDetails.reference}</span></p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Shipping Info</h4>
                            <p className='text-lg'>Shipping Method: <span className='text-gray-600'>{checkout.shippingMethod}</span></p>
                            <p className='text-lg'>
                                Address: {" "}
                                <span className='text-gray-600'>{`${checkout.shippingAddress?.address}, ${checkout.shippingAddress?.city}, ${checkout.shippingAddress?.country}`}</span>
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