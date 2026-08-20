import React, { useEffect, useState } from 'react'
import LoginImg from '../assets/login.jpeg';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaUbuntu } from 'react-icons/fa';

const Login = () => {

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
            if ((cart?.products?.length ?? 0) > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
            } else {
                navigate(redirect);
            }

        }
    }, [user, guestId, cart, redirect, dispatch, navigate, isCheckoutRedirect]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser({ email, password }));

            if (loginUser.fulfilled.match(result)) {
                const loggedInUser = result.payload.user;
                toast.success(`Login successful ${loggedInUser.name}`);
                // navigate somewhere if needed
            } else {
                // result.payload contains the backend error string
                toast.error(result.payload || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.");
        }finally{
            setEmail("");
            setPassword("");
        }
    };

  return (
    <section className='flex m-6'>
        
        <div className='w-full md:w-1/2 flex justify-center items-center flex-col text-gray-700'>
            {/* Left */}
            <form onSubmit={handleSubmit} className='w-full max-w-md p-8 shadow-lg justify-center'>
                <div className='flex justify-center items-center mb-4'>
                    <h1 className='text-4xl text-gray-700'>
                        <i className="icon-Derayo"></i>
                    </h1>
                </div>
                <p className='text-center font-semibold text-2xl tracking-tighter mb-4'>Sign In</p>
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
                    {loading ? "Please wait..." : "Sign in"}
                </button>
                <p className='text-sm text-center font-semibold'>Don't have an account?
                    <Link 
                        to={`/register?redirect=${encodeURIComponent(redirect)}`}
                        className='text-amber-300 ml-1'
                    >Register</Link>
                </p>
            </form>
        </div>
        {/* Right */}
        <div className='relative hidden md:block w-1/2'>
            <div className='absolute p-8 text-white bg-black/40 w-full h-full'>
                <div className='text-7xl lg:text-9xl w-full mt-40 mb-2'>
                    <i className="icon-Derayo"></i>
                </div>
                <div>
                    <h1 className='text-5xl font-semibold leading-15 mb-2'>Sign in</h1>
                </div>
                <p className='text-xl'>Sign in to your account or create a new one.</p>
            </div>
            <img 
                src={LoginImg} 
                alt="Login image" 
                className='w-full h-188 object-cover'
            />
        </div>
    </section>
  )
}

export default Login