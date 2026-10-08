import React from 'react'
import { Link } from 'react-router-dom';
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from 'react-icons/fi'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { subscribeNewsletter, resetNewsletterState } from '../../redux/slices/newsletterSlice';

const Footer = () => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.newsletter);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(subscribeNewsletter(email));

        setEmail(""); // Clear the input field after submission
    };

    // Show toast notifications when success/error changes
    useEffect(() => {
        if (success) {
            toast.success(
                "Welcome! 🎉 You've subscribed successfully. Please check your Spam folder for our email. If you find it there, press 'Not Spam' so future emails always land in your inbox.",
                {
                    position: "top-center",
                    duration: 15000,
                    style: {
                        background: "#111827",
                        color: "#F9FAFB",
                        border: "1px solid #D4AF37",
                        borderRadius: "14px",
                        padding: "16px 20px",
                        fontWeight: "500",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                        maxWidth: "480px",
                    },
                        iconTheme: {
                        primary: "#D4AF37",
                        secondary: "#111827",
                    },
                }
            );
            dispatch(resetNewsletterState()); // reset success/error
        }
        if (error) {
            toast.error(error);
            dispatch(resetNewsletterState());
        }
    }, [success, error, dispatch]);

  return (
    <footer className='py-12 border-t border-gray-300 bg-gray-50'>
        <div className='container mx-auto grid grid-cols-1 text-center md:grid-cols-3 gap-8 px-4 lg:px-0'>
            {/* Newsletter */}
            <div className='md:pl-3 font-sans font-medium'>
                <h3 className='text-lg text-gray-700 mb-4'>Newsletter</h3>
                <p className='text-gray-500 mb-4'>Be the first to hear about New product, Exclusive events and Online offers</p>
                <form className="flex justify-center" onSubmit={handleSubmit}>
                    <label className="flex w-full relative">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 text-sm bg-gray-200 font-medium text-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-200 transition-all"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white absolute top-1.5 right-2 rounded-md p-2 hover:bg-gray-800 cursor-pointer"
                        >
                            {loading ? "Subscribing..." : "Subscribe"}
                        </button>
                    </label>
                </form>
            </div>
            {/* Support */}
            <div className='font-sans font-medium'>
                <h3 className="text-lg text-gray-800 mb-4">Support</h3>
                <Link to="/about" className='text-gray-500 mb-4 block hover:text-gray-800'>About us</Link>
                <Link to="/derayoFaq" className='text-gray-500 mb-4 block hover:text-gray-800'>FAQ</Link>
                <Link to="/features" className='text-gray-500 mb-4 block hover:text-gray-800'>Features</Link>
            </div>
            {/* Follow Us */}
            <div className='font-sans font-medium'>
                <h3 className="text-lg text-gray-700 mb-4 font-sans font-medium">Follow us</h3>
                <div className='flex space-x-3 space-y-4 justify-center'>
                    <a 
                    href="https://www.facebook.com/share/1EJJMMaqtr/?mibextid=wwXIfr" 
                    target='_blank'
                    rel='noopener noreferrer'
                    ><TbBrandMeta className='h-5 w-5 text-gray-500 hover:text-gray-800 transition'/>
                    </a>
                    <a 
                    href="https://www.instagram.com/derayo.ng?igsh=NXh2b2lid2ZvbWZ4"
                    target='_blank'
                    rel='noopener noreferrer'
                    ><IoLogoInstagram className='h-5 w-5 text-gray-500 hover:text-gray-800 transition'/>
                    </a>
                    <a 
                    href="#"
                    target='_blank'
                    rel='noopener noreferrer'
                    ><RiTwitterXLine className='h-5 w-4 text-gray-500 hover:text-gray-800 transition'/>
                    </a>
                    <a href="https://wa.me/971529004793" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className='hover:text-gray-300'>
                        <FaWhatsapp className='h-5 w-4 text-gray-500 hover:text-gray-800 transition'/>
                    </a>
                </div>
                <p className='text-gray-400 text-lg mb-1'>Call us</p>
                <a href="tel:+2347062821063" className='text-gray-500 hover:text-gray-700'>
                    <FiPhoneCall className=' h-5 w-5 inline-block mr-3 font-mono'/>
                    (+234) 706 2821 063
                </a>
            </div>
        </div>
        <div className='container mx-auto mt-10 font-sans font-medium'>
            <p className='text-gray-500 text-center'>
                ©️ {new Date().getFullYear()}, <i className="icon-Derayo"></i>. All right reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer