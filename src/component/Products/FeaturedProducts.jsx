import React from 'react'
import featuredImg from '../../assets/featured.webp'
import { Link } from 'react-router-dom'

const FeaturedProducts = () => {
  return (
    <section className='py-12 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col-reverse item overflow-hidden rounded-2xl bg-green-50 lg:flex-row items-center'>
            {/* left side */}
            <div className='lg:w-1/2 text-center p-8 lg:text-left'>
                <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                    Comfort and style
                </h2>
                <h2 className='text-4xl lg:text-5xl font-bold text-gray-700 mb-6'>
                    Apparel made for your every day life
                </h2>
                <p className='text-gray-500 text-lg mb-6'>
                    Discover high-quality clothing that effortlessly blends fashion and function. Designed to always make you look and feel great.
                </p>
                <Link 
                    to="/collections/all"
                    className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700'
                >
                    Discover now
                </Link>
            </div>
            {/* right side */}
            <div className='lg:w-1/2'>
                <img 
                    src={featuredImg} 
                    alt="Featured image" 
                    className='w-full h-full object-cover'
                />
            </div>
        </div>
    </section>
  )
}

export default FeaturedProducts