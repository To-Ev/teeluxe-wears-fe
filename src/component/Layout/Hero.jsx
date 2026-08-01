import React from 'react'
import rabbitImg from '../../assets/Hero-secImg.jpg'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from "react-icons/fa"

const Hero = () => {
  return (
    <section className='relative min-h-full'>
      <img src={rabbitImg} alt="rabbitImg" 
      className='w-full h-screen sm:h-full object-cover'/>

      {/* Desktop Screen */}
      <div 
        className='absolute top-1/2 -translate-y-1/2 ml-8 hidden sm:grid md:grid-cols-3'>
        <div className=' text-white p-6 col-span-2'>
          <h1 className=' sm:text-6xl whitespace-nowrap md:text-8xl font-serif mb-6'>
            African Heritage.<br/> <span className='text-amber-400 italic text-7xl'>Timeless Luxury.</span>
          </h1>
          <p 
          className='text-lg font-thin tracking-wider mb-9'>Timeless pieces inspired by African heritage crafted with <br /> culture for the modern era for sophisticated use.
          </p>
          <button className='w-60 hover:bg-amber-500 transition bg-amber-400 py-2 rounded-md'>
            <Link to="/collections/all" className='text-gray-900 w-full flex items-center justify-center gap-3'>
              SHOP THE COLLECTION <FaLongArrowAltRight />
            </Link>
          </button>
        </div>
      </div>

      {/* Mobile screen */}
      <div 
        className='absolute inset-0 flex sm:hidden justify-center items-center bg-black/10'>
        <div className='text-center text-white p-6'>
          <h1 className='text-7xl font-bold uppercase tracking-tighter mb-2'>
            African<br/> <span className='text-amber-400 italic text-6xl'>Heritage</span>
          </h1>
          <p 
          className='text-md sm:text-sm tracking-tighter md:text-lg sm:mb-5 mb-6'>Timeless pieces inspired by African heritage crafted with culture for the modern era for sophisticated use
          </p>
          <Link to="/collections/all" className='px-6 py-3 rounded-md font-semibold bg-white cursor-pointer text-gray-900 transition duration-300'>Shop Now</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero