import React, { useEffect } from 'react'
import MyOrderPage from './MyOrderPage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';

const Profile = () => {

  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
    if(!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <section className='min-w-screen p-4 md:p-6'>
      <div className='grow container mx-auto '>
        <div className='flex flex-col md:flex-row text-gray-700 md:space-x-6 space-y-6 md:space-y-0'>
          {/* left section */}
          <div className='w-full md:w-1/3 shadow p-6'> 
            <h1 className='text-2xl md:text-3xl font-semibold mb-3'>{user?.name}</h1>
            <p className='text-lg mb-4 tracking-tight'>{user?.email}</p>
            <button 
              onClick={handleLogout}
              className='w-full bg-red-500 text-white hover:bg-red-600 transition cursor-pointer rounded-lg py-2 font-semibold tracking-wide'
            >Logout</button>
          </div>
          {/* Left section  */}
          <div className='w-full md:w-2/3'>
            <MyOrderPage />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile