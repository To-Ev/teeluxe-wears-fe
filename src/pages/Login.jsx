import React, { useState } from 'react'
import LoginImg from '../assets/login.webp';
import { Link } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(`User loggedIn:`, {email, password});

        setEmail("");
        setPassword("");
    }

  return (
    <section className='flex m-6'>
        <div className='w-full md:w-1/2 flex justify-center items-center flex-col text-gray-700'>
            <form onSubmit={handleSubmit} className='w-full max-w-md p-8 shadow-md justify-center'>
                <div className='flex justify-center items-center mb-4'>
                    <h1 className='text-xl font-semibold text-gray-800'>Teeluxe Wears</h1>
                </div>
                <h2 className='text-center text-2xl mb-2'>Hey there 👋🏻</h2>
                <p className='text-center tracking-tighter mb-4'>Enter your email and password to Login</p>
                <div className='mb-4'>
                    <label className='text-sm font-semibold block mb-2'>Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) =>setEmail(e.target.value)}
                        className='w-full p-2 text-gray-700 bg-gray-200 rounded  focus:outline-green-200'
                        placeholder='Enter your email'
                    />
                </div>
                <div className='mb-6'>
                    <label className='text-sm font-semibold block mb-2'>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) =>setPassword(e.target.value)}
                        className='w-full p-2 text-gray-700 bg-gray-200 rounded  focus:outline-green-200'
                        placeholder='Enter your password'
                    />
                </div>
                <button type='submit' className='bg-black w-full p-2 text-white rounded hover:bg-gray-800 transition cursor-pointer font-semibold mb-4'>Sign in</button>
                <p className='text-sm text-center font-semibold'>Don't have an account?
                    <Link to="/register" className='text-yellow-300 ml-1'>Register</Link>
                </p>
            </form>
        </div>
        <div className='hidden md:block w-1/2'>
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