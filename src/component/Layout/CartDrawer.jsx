
import {IoMdClose} from 'react-icons/io'
import CartsContents from '../Cart/CartsContents'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const CartDrawer = ({drawerOpen, toggleCartDrawer}) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);
  const userId = user ? user._id : null;

  const handleCheckOut = () =>{
    toggleCartDrawer();
    if(!user) {
      navigate("/login?redirect=checkout")
    } else {
      navigate("/checkout");
    }
  }
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-100 bg-white shadow-lg h-full z-50 flex flex-col transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-full'}`}>

      {/* Close Bar Button */}
      <button onClick={toggleCartDrawer} className='flex justify-end p-6 text-gray-600'>
        <IoMdClose className='cursor-pointer h-6 w-6'/>
      </button>

      {/* Cart content with scrollable area */}
      <div className='grow p-4 overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Cart content</h2>
        {
          cart && cart?.products?.length > 0 ? (
          <CartsContents cart={cart} userId={userId} guestId={guestId} /> 
          ) : (
            <p className='text-xl text-gray-500'>Your cart is empty.</p>
          )
        }
       
      </div>
      {/* Checkout Button fixed at the bottom */}
      {
        cart && cart?.products?.length > 0 && (
          <>
            <div className="sticky p-4 bg-white bottom-0">
              <button 
                onClick={handleCheckOut}
                className='font-semibold bg-black text-white w-full py-3 rounded-xl hover:bg-gray-800 transition duration-300 cursor-pointer'>
                Checkout
              </button>
              <p className='text-sm tracking-tighter mt-2 text-center text-gray-700'>Shipping and Taxes calculated at Checkout</p>
            </div>
          </>
        )
      }
      
    </div>
  )
}

export default CartDrawer