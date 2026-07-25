import React from 'react'
import jewelryImg from '../../assets/JewelryImg.jpg';
import WomenCollection from '../../assets/womens-collection.jpg'
import { Link } from 'react-router-dom';

const GenderSelectionSection = () => {
  return (
    <section className='py-6 sm:py-12 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8 sm:gap-10'>
            {/* Accessories collection */}
            <div className='relative mx-auto flex-1 w-80 sm:w-full sm:h-full'>
                <img src={jewelryImg} 
                className='w-full h-full object-cover' 
                alt="jewelry Img"/>
                <div className='absolute bottom-8 left-8 bg-white/80 p-3 sm:p-5 rounded-md'>
                    <h1 className='text-xl sm:text-2xl font-bold text-gray-700 mb-3'>
                        Accessories collection
                    </h1>
                    <Link to="/collections/all?section=Accessories" className='text-gray-900 underline'>
                    Shop Now
                    </Link>
                </div>
            </div>
            {/* womens collection */}
            <div className='relative mx-auto flex-1 w-80 sm:w-full sm:h-full'>
                <img src={WomenCollection} 
                className='w-full h-full object-cover' 
                alt="jewelry Img"/>
                <div className='absolute bottom-8 left-8 bg-white/80 p-3 sm:p-5 rounded-md'>
                    <h1 className='text-xl sm:text-2xl font-bold text-gray-700 mb-3'>
                        Clothing collection
                    </h1>
                    <Link to="/collections/all?section=Clothing" className='text-gray-900 underline'>
                    Shop Now
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderSelectionSection