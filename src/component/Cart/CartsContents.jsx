import React from 'react'
import { RiDeleteBin3Fill, RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItem } from '../../redux/slices/cartSlice';
import toast from 'react-hot-toast';

const CartsContents = ({ cart, userId, guestId }) => {

  const dispatch = useDispatch();

  // handle adding or subtracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if(newQuantity >= 1) {
      dispatch(
        updateCartItem({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size, 
          color,
        })
      )
    }
  };

  const handleRemoveFromCart = async (productId, size, color) => {
    try {
      const resultAction = await dispatch(
        removeFromCart({ productId, userId, guestId, size, color })
      );

      if (removeFromCart.fulfilled.match(resultAction)) {
        toast.success('Item removed from cart successfully!', {
          position: "top-center",
          duration: 3000,
        });
      } else {
        toast.error(resultAction.payload || 'Failed to remove item from cart. Please try again.');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error(error.response?.data?.err || 'Failed to remove item from cart. Please try again.');
    }
  };


  return (
    <div>
     { cart.products.map((item, index) =>
      <div key={index} className='flex items-start justify-between py-3 border-b border-gray-300'>
        <div className='flex items-start'>
          <img src={item.image} alt={item.name} className='h-20 w-24 object-cover mr-4 rounded'/>
          <div>
            <h3>{item.name}</h3>
            <p className='text-sm text-gray-500'> size: {item.size} | color: {item.color}</p>
            <div className='flex justify-center mt-2 items-center'>
              <button 
                onClick={() => handleAddToCart(
                  item.productId,
                  -1,
                  item.quantity,
                  item.size,
                  item.color
                )}
                className='text-xl cursor-pointer border-gray-300 border px-1 rounded'
              >-</button>
              <span className='mx-4'>{item.quantity}</span>
              <button 
                onClick={() => handleAddToCart(
                  item.productId,
                  1,
                  item.quantity,
                  item.size,
                  item.color
                )}
                className='text-xl cursor-pointer border-gray-300 border px-1 rounded'
              >+</button>
            </div>
          </div>
        </div>
        <div className='my-2'>
          <p>N{item.price.toLocaleString()}</p>
          <button
            onClick={() => handleRemoveFromCart(
              item.productId,
              item.size,
              item.color
            )}
          >
            <RiDeleteBin3Line className='h-5 w-5 mt-2 cursor-pointer'/>
          </button>
        </div>
      </div>
      )}
    </div>
  )
}

export default CartsContents