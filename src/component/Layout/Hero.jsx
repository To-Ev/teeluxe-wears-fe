import React from 'react'
import rabbitImg from '../../assets/Hero-secImg.jpg'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <section className='relative'>
        <img src={rabbitImg} alt="rabbitImg" 
        className='w-full h-[100] md:h-[150] lg:h-[190]'/>
        <div 
        className='absolute inset-0 flex justify-center items-center bg-black/10'>
            <div className='text-center text-white p-6'>
              <h1 className='text-4xl md:text-9xl font-bold uppercase tracking-tighter mb-2'>
                Ready To <br/>Wear
              </h1>
              <p 
              className='text-sm tracking-tighter md:text-lg mb-4'>Explore our ready to wear outfits with Nation wide shipping
              </p>
              <Link to="#" className='px-6 py-3 rounded-md font-semibold bg-white text-gray-900'>Shop Now</Link>
            </div>
        </div>
    </section>
  )
}

export default Hero