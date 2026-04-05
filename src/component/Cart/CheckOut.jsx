import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import PayStackButton from './PayStackButton';
import { useNavigate } from 'react-router-dom';

const Cart = {
  products: [
    {
      name: "T-shirt",
      size: "M",
      color: "Red",
      price: 150,
      image: "https://picsum.photos/200?random=1",
    },
    {
      name: "Sneakers",
      size: "43",
      color: "Gray",
      price: 15,
      image: "https://picsum.photos/200?random=2",
    },
  ],
  totalPrice: 165
}
const CheckOut = () => {

  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    country: "",
    phone: "",
    city: ""
  })
  const [checkOutId, setCheckOutId] = useState(null);

  const handleCheckOut = (e) =>{
    e.preventDefault();
    setCheckOutId(123);
  }
  const handlePaymentSuccess = (details) =>{
    console.log(`Payment successful`, details);
    navigate('/order-confirmation');
  };

  return (
    <section className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 py-10 px-6 tracking-tighter'>
      {/* Left Section  */}
      <div className='rounded-lg p-6'>
        <h2 className='uppercase text-2xl mb-6'>Checkout</h2>
        <form onSubmit={handleCheckOut}>
          <h3 className='text-lg mb-4'>Contact Details</h3>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input 
              type="email"
              value="userexample@email"
              className='w-full text-gray-800 bg-gray-200 rounded p-2'
              disabled
            />
          </div>
          <h3 className='text-lg mb-4'>Delivery</h3>
          <div className='mb-2 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>Firstname</label>
              <input 
                type="text" 
                value={shippingAddress.firstName}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    firstName: e.target.value})
                  }
                className='w-full rounded text-gray-800 bg-gray-100 p-2 focus:outline-green-200'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700'>LastName</label>
              <input 
                type="text" 
                value={shippingAddress.lastName}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    lastName: e.target.value})
                  }
                className='w-full rounded text-gray-800 bg-gray-100 p-2 focus:outline-green-200'
                required
              />
            </div>
          </div>
          <div className='mb-2'>
            <label className='block text-gray-700'>Address</label>
              <input 
                type="text" 
                value={shippingAddress.address}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    address: e.target.value})
                  }
                className='w-full rounded text-gray-800 bg-gray-100 p-2 focus:outline-green-200'
                required
              />
          </div>
          <div className='mb-2 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>City</label>
              <input 
                type="text" 
                value={shippingAddress.city}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    city: e.target.value})
                  }
                className='w-full rounded text-gray-800 bg-gray-100 p-2 focus:outline-green-200'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700'>Postal Code</label>
              <input 
                type="text" 
                value={shippingAddress.postalCode}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    postalCode: e.target.value})
                  }
                className='w-full rounded text-gray-800 bg-gray-100 p-2 focus:outline-green-200'
                required
              />
            </div>
          </div>
          <div className='mb-2'>
            <label className='block text-gray-700'>Country</label>
              <input 
                type="text" 
                value={shippingAddress.country}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    country: e.target.value})
                  }
                className='w-full rounded text-gray-800 bg-gray-100 p-2 focus:outline-green-200'
                required
              />
          </div>
          <div className='mb-2'>
            <label className='block text-gray-700'>Phone</label>
              <input 
                type="tel" 
                value={shippingAddress.phone}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    phone: e.target.value})
                  }
                className='w-full rounded text-lg text-gray-800 bg-gray-100 p-2 focus:outline-green-200'
                required
              />
          </div>
          <div className='mt-6'>
            {
              !checkOutId ? 
              <button 
                type='submit'
                className='bg-black text-white p-3 rounded-lg w-full text-lg cursor-pointer'>Continue to Payment</button> : 
              <div>
                <h3 className='text-lg mb-2 text-gray-800 '>Pay with PayStack</h3>
                {/* PayPal Component  */}
                {/* PayStack Component */}
                <PayStackButton
                  amount={500}
                  email={'usertest@paystack.com'}
                  onSuccess={handlePaymentSuccess}
                />
              </div>
            }
          </div>
        </form>
      </div>

      {/* Right Section*/}
      <div className='bg-gray-50 p-6 rounded-lg text-gray-700'>
        <h3 className='text-xl mb-4 border-b pb-3 border-gray-300'>Order summary</h3>
        <div>
          {Cart.products.map((product, index) =>(
            <div key={index}
              className='flex items-start justify-between py-2'>
              <div className='flex'>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className='w-20 h-24 object-cover mr-8'
                />
                <div>
                  <h3 className='font-semibold text-gray-600'>{product.name}</h3>
                  <p>Size: {product.size}</p>
                  <p>Color: {product.color}</p>
                </div>
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-600'>N{product.price?.toLocaleString()}</h3>
              </div>
            </div>
          ))}
          <div className='flex justify-between pt-3 border-t border-gray-300 text-lg mb-4'>
            <p className='font-semibold text-gray-600'>Subtotal</p>
            <p className='font-semibold'>N{Cart.totalPrice?.toLocaleString()}</p>
          </div>
          <div className='flex justify-between text-lg mb-4'>
            <p className='font-semibold text-gray-600'>Shipping</p>
            <p className='font-medium'>free</p>
          </div>
          <div className='flex justify-between border-t border-gray-300 pt-3 text-lg mb-4'>
            <p className='font-semibold text-gray-600'>Total</p>
            <p className='font-semibold'>N{Cart.totalPrice?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckOut