import React, { useEffect, useState } from 'react'
import RegisterImg from '../assets/register.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, guestId, loading } = useSelector(state => state.auth);
    const { cart } = useSelector(state => state.cart);
    const [showPassword, setShowPassword] = useState(false);

    // Get redirect parameter and check of it is checkout
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if(user) {
            if(cart?.products.length > 0 && guestId) {
                dispatch(mergeCart(( guestId, user ))).then(() =>{
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
            } else {
                navigate(isCheckoutRedirect ? "checkout" : "/");
            }
        }
    }, [user, guestId, cart, dispatch, navigate, isCheckoutRedirect]);

   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(registerUser({ name, email, password }));

            if (registerUser.fulfilled.match(result)) {
                const loggedInUser = result.payload.user;
                toast.success(`Login successful ${loggedInUser.name}`);
                // navigate somewhere if needed
            } else {
                // result.payload contains the backend error string
                toast.error(result.payload || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please try again.");
        }
        
    };
    
  return (
    <section className='flex m-6'>
        
        <div className='w-full md:w-1/2 flex justify-center items-center flex-col text-gray-700'>
            {/* Left */}
            <form onSubmit={handleSubmit} className='w-full max-w-md p-8 shadow-lg justify-center'>
                <div className='flex justify-center items-center mb-3'>
                    <h1 className='text-4xl font-semibold text-gray-700'>
                        <i className="icon-Derayo"></i>
                    </h1>
                </div>
                <p className='text-center font-semibold text-2xl tracking-tighter mb-4'>Sign Up</p>
                <div className='mb-8'>
                    <label className='text-sm font-semibold flex items-center bg-emerald-100 py-2 px-3 rounded-2xl'>
                        <FaUser className='w-5 h-5 text-gray-500'/>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) =>setName(e.target.value)}
                            className='w-full p-2 text-gray-700  focus:outline-none'
                            placeholder='Username'
                        />
                    </label>
                </div>
               <div className='mb-8'>
                    <label className='w-full bg-emerald-100 py-2 px-4 rounded-2xl text-sm font-medium flex items-center mb-2'>
                        <FaEnvelope className='w-5 h-5 text-gray-500'/>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) =>setEmail(e.target.value)}
                            className='w-full p-2 text-gray-500 focus:outline-none'
                            placeholder='E-mail'
                        />
                    </label>
                </div>
                <div className='relative mb-8'>
                    <label className='text-sm flex items-center mb-2 bg-emerald-100 rounded-2xl px-4 py-2'>
                        <FaLock className='w-5 h-5 text-gray-500'/>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) =>setPassword(e.target.value)}
                            className='w-full p-2 text-gray-500 focus:outline-none'
                            placeholder='Password'
                        />
                    </label>
                    
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-5 cursor-pointer text-gray-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button type='submit' className='bg-gray-800 w-full p-3 text-amber-50 rounded-3xl hover:bg-gray-900 transition cursor-pointer font-semibold mb-4'
                >
                    {loading ? "Please wait..." : "Sign up"}
                </button>
                <p className='text-sm text-center font-semibold'>Already have an account?
                    <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-yellow-300 ml-1'>Login</Link>
                </p>
            </form>
        </div>
        {/* Right */}
        <div className='relative hidden md:block w-1/2'>
            <div className='absolute p-8 text-white bg-black/40 w-full h-full'>
                <div className='text-7xl lg:text-9xl mt-40 mb-2'>
                    <i className="icon-Derayo"></i>
                </div>
                <div>
                    <h1 className='text-5xl font-bold leading-15'>Create your <br /> Account</h1>
                </div>
                <p className='text-xl'>Your journey starts here take the first step.</p>
            </div>
            <img 
                src={RegisterImg} 
                alt="Login image" 
                className='w-full h-188 object-cover'
            />
        </div>
    </section>
  )
}

export default Register