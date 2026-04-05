import React from 'react'
import { RiDeleteBin3Fill, RiDeleteBin3Line } from 'react-icons/ri'

const CartsContents = () => {

  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "XL",
      color: "Gray",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=2",
    },

  ]
  return (
    <div>
     { cartProducts.map((item, index) =>
      <div key={index} className='flex items-start justify-between py-3 border-b border-gray-300'>
        <div className='flex items-start'>
          <img src={item.image} alt={item.name} className='h-20 w-24 object-cover mr-4 rounded'/>
          <div>
            <h3>{item.name}</h3>
            <p className='text-sm text-gray-500'> size: {item.size} | color: {item.color}</p>
            <div className='flex justify-center mt-2 items-center'>
              <button className='text-xl cursor-pointer border-gray-300 border px-1 rounded'>-</button>
              <span className='mx-4'>{item.quantity}</span>
              <button className='text-xl cursor-pointer border-gray-300 border px-1 rounded'>+</button>
            </div>
          </div>
        </div>
        <div className='my-2'>
          <p>$ {item.price.toLocaleString()}</p>
          <RiDeleteBin3Line className='h-5 w-5 mt-2 cursor-pointer'/>
        </div>
      </div>
      )}
    </div>
  )
}

export default CartsContents