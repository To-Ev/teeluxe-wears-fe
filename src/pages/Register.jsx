import React, { useEffect, useState } from 'react'
import RegisterImg from '../assets/register.webp';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';

const Register = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
     const navigate = useNavigate();
    const { user, guestId, loading } = useSelector(state => state.auth);
    const { cart } = useSelector(state => state.cart);

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
                toast.success(`Login successful ${loggedInUser.name}!`);
                // navigate somewhere if needed
            } else {
                // result.payload contains the backend error string
                toast.error(result.payload || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please try again.");
        }

        setName("");
        setEmail("");
        setPassword("");
    };
    
  return (
    <section className='flex m-6'>
        <div className='w-full md:w-1/2 flex justify-center items-center flex-col text-gray-700'>
            <form onSubmit={handleSubmit} className='w-full max-w-md p-8 shadow-md justify-center'>
                <div className='flex justify-center items-center mb-4'>
                    <h1 className='text-xl font-semibold text-gray-800'>Teeluxe Wears</h1>
                </div>
                <h2 className='text-center text-2xl mb-2'>Hey there 👋🏻</h2>
                <p className='text-center tracking-tighter mb-4'>Enter your username, email and password to Register</p>
                <div className='mb-4'>
                    <label className='text-sm font-semibold block mb-2'>Name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) =>setName(e.target.value)}
                        className='w-full p-2 bg-gray-200 text-gray-700 rounded  focus:outline-green-200'
                        placeholder='Enter your name'
                    />
                </div>
                <div className='mb-4'>
                    <label className='text-sm font-semibold block mb-2'>Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) =>setEmail(e.target.value)}
                        className='w-full p-2 bg-gray-200 text-gray-700 rounded  focus:outline-green-200'
                        placeholder='Enter your email'
                    />
                </div>
                <div className='mb-6'>
                    <label className='text-sm font-semibold block mb-2'>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) =>setPassword(e.target.value)}
                        className='w-full p-2 bg-gray-200 text-gray-700 rounded  focus:outline-green-200'
                        placeholder='Enter your password'
                    />
                </div>
                <button type='submit' className='bg-black w-full p-2 text-white rounded hover:bg-gray-800 transition cursor-pointer font-semibold mb-4'
                >
                    {loading ? "Loading..." : "Sign up"}
                </button>
                <p className='text-sm text-center font-semibold'>Already have an account?
                    <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-yellow-300 ml-1'>Login</Link>
                </p>
            </form>
        </div>
        <div className='hidden md:block w-1/2'>
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