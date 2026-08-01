import React from 'react'
import featuredImg from '../../assets/featured.jpg'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from "react-icons/fa"

const FeaturedProducts = () => {
  return (
    <section className='py-12 px-4 h-full lg:px-0'>
        {/* Desktop Screen */}
        <div className='relative mx-auto hidden lg:flex overflow-hidden rounded-2x lg:flex-row items-center text-amber-950'>
            {/* left side */}
            <div className='lg:w-2/3 text-center p-8 lg:text-left z-50 absolute top-1/2 -translate-y-1/2'>
                <h2 className='text-md tracking-wider mb-2'>
                    COMFORT AND STYLE
                </h2>
                <h2 className='text-4xl text-gray-900 lg:text-6xl font-bold mb-6'>
                    Apparel made for <br /> <span className='text-5xl'>your <span className='italic text-amber-600'>every day life</span></span>
                </h2>
                <p className='text-lg mb-6 w-1/2'>
                    Discover high-quality clothing that effortlessly blends fashion and function. Designed to always make you look and feel great.
                </p>
               <button className='w-50 bg-amber-600 hover:bg-amber-700 transition py-2.5 rounded-md'>
                    <Link to="/collections/all" className='text-gray-900 w-full flex justify-center items-center gap-3'>
                        DISCOVER NOW <FaLongArrowAltRight />
                    </Link>
                 </button>
            </div>
            {/* right side */}
            <div className='w-full'>
                <img 
                    src={featuredImg} 
                    alt="Featured image" 
                    className='w-full h-160 object-cover'
                />
            </div>
        </div>

        {/* Mobile screen */}
        <div className='container lg:hidden mx-auto flex flex-col-reverse item overflow-hidden rounded-2xl bg-gray-900 lg:flex-row items-center shadow-md'>
            {/* left side */}
            <div className='lg:w-1/2 text-center p-8 lg:text-left'>
                <h2 className='text-md uppercase text-amber-500 mb-2'>
                    Comfort and style
                </h2>
                <h2 className='text-3xl lg:text-5xl font-bold text-gray-300 mb-6'>
                    Apparel made for your every day life
                </h2>
                <p className='text-gray-400 text-sm mb-6'>
                    Discover high-quality clothing that effortlessly blends fashion and function. Designed to always make you look and feel great.
                </p>
                <Link 
                    to="/collections/all"
                    className='bg-amber-600 text-gray-950 px-6 py-3 rounded-lg text-lg hover:bg-amber-700 transition'
                >
                    Discover now
                </Link>
            </div>
            {/* right side */}
            <div className='w-full lg:w-1/2'>
                <img 
                    src={featuredImg} 
                    alt="Featured image" 
                    className='w-full h-100 object-cover'
                />
            </div>
        </div>
    </section>
  )
}

export default FeaturedProducts