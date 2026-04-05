import React from 'react'
import jewelryImg from '../../assets/JewelryImg.png';
import WomenCollection from '../../assets/womens-collection.webp'
import { Link } from 'react-router-dom';
const GenderSelectionSection = () => {
  return (
    <section className='py-12 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-20'>
            {/* Jewelry collection */}
            <div className='relative flex-1 h-150 md:h-150'>
                <img src={jewelryImg} 
                className='w-full h-150 md:h-full object-cover' 
                alt="jewelry Img"/>
                <div className='absolute bottom-8 left-8 bg-white/80 p-5 rounded-md'>
                    <h1 className=' text-2xl font-bold text-gray-700 mb-3'>
                        Jewelries collection
                    </h1>
                    <Link to="/collection/all?jewelries" className='text-gray-900 underline'>
                    Shop Now
                    </Link>
                </div>
            </div>
            {/* womens collection */}
            <div className='relative flex-1 h-150'>
                <img src={WomenCollection} 
                className='w-full h-full object-cover' 
                alt="jewelry Img"/>
                <div className='absolute bottom-8 left-8 bg-white/80 p-5 rounded-md'>
                    <h1 className=' text-2xl font-bold text-gray-700 mb-3'>
                        Outfit's collection
                    </h1>
                    <Link to="/collection/all?outfit" className='text-gray-900 underline'>
                    Shop Now
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderSelectionSection