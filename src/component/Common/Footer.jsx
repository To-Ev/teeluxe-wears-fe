import React from 'react'
import { Link } from 'react-router-dom';
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { FiPhoneCall } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className='py-12 border-t border-gray-300 bg-gray-50'>
        <div className='container mx-auto grid grid-cols-1 text-center md:grid-cols-3 gap-8 px-4 lg:px-0'>
            <div className='md:pl-3'>
                <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
                <p className='text-gray-500 mb-4'>Be the first to hear about New product, Exclusive events and Online offers</p>
                <form className='flex justify-center'>
                   <label className='flex w-full relative'>
                        <input 
                            type="email" 
                            placeholder='Enter your email'
                            className='w-full p-4 text-sm bg-gray-200 font-medium text-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-200 transition-all' required
                        />
                        <button 
                        type='submit'
                        className='bg-black text-white absolute top-1.5 right-2 rounded-md p-2 hover:bg-gray-800 cursor-pointer'>Subscribe</button>
                   </label>
                </form>
            </div>
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Support</h3>
                <Link to="#" className='text-gray-500 mb-4 block'>Contact us</Link>
                <Link to="#" className='text-gray-500 mb-4 block'>About us</Link>
                <Link to="#" className='text-gray-500 mb-4 block'>FAQ</Link>
                <Link to="#" className='text-gray-500 mb-4 block'>Features</Link>
            </div>
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Follow us</h3>
                <div className='flex space-x-3 space-y-4 justify-center'>
                    <a 
                    href="#"
                    target='_blank'
                    rel='noopener noreferrer'
                    ><TbBrandMeta className='h-5 w-5 text-gray-500 hover:text-gray-800 transition'/>
                    </a>
                    <a 
                    href="#"
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
                </div>
                <p className='text-gray-400 text-lg mb-1'>Call us</p>
                <p className='text-gray-500'>
                    <FiPhoneCall className=' h-5 w-5 inline-block mr-3'/>
                    0123-4567-89
                </p>
            </div>
        </div>
        <div className='container mx-auto mt-10'>
            <p className='text-gray-500 text-center'>
                ©️ 2025, teeluxe. All right reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer