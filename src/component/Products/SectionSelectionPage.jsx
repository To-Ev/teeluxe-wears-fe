import React from 'react'
import jewelryImg from '../../assets/JewelryImg.jpg';
import WomenCollection from '../../assets/womens-collection.jpg'
import { FaLongArrowAltRight } from "react-icons/fa"
import { Link } from 'react-router-dom';

const SectionSelectionPage = () => {
  return (
    <section className='py-6 sm:py-12 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8 sm:gap-10'>
            {/* Accessories collection */}
            <div className='relative mx-auto flex-1 w-80 sm:w-full sm:h-full'>
                <div className='w-full h-full absolute bg-black/20'></div>
                <img src={jewelryImg} 
                className='w-full h-full object-cover' 
                alt="jewelry Img"/>
                <div className='absolute bottom-8 left-4 sm:left-8 p-3 sm:p-5 rounded-md'>
                    <h1 className='text-4xl sm:text-5xl font-bold text-amber-200 mb-3'>
                        Accessories <br />Collection
                    </h1>
                    <p className='w-60 text-amber-100 mb-3'>Timeless pieces that add the perfect touch of elegance.</p>
                    <Link to="/collections/all?section=Accessories" className='text-gray-900 w-37 py-2 px-3 rounded flex items-center justify-around gap-3 bg-amber-200 uppercase text-sm'>
                    Shop Now <FaLongArrowAltRight />
                    </Link>
                </div>
            </div>
            {/* womens collection */}
            <div className='relative mx-auto flex-1 w-80 sm:w-full sm:min-h-full'>
                <div className='w-full h-full absolute bg-black/20'></div>
                <img src={WomenCollection} 
                className='w-full h-full object-cover' 
                alt="jewelry Img"/>
                <div className='absolute bottom-8 left-4 sm:left-8 p-3 sm:p-5 rounded-md'>
                    <h1 className='text-4xl sm:text-5xl font-bold text-amber-200 mb-3'>
                        Clothing <br /> Collection
                    </h1>
                    <p className='w-80 text-amber-100 mb-3'>Timeless designs inspired by African heritage, made for the modern woman.</p>
                    <Link to="/collections/all?section=Clothing" className='text-gray-900 w-37 py-2 px-3 rounded flex items-center justify-around gap-3 bg-amber-200 uppercase text-sm'>
                    Shop Now <FaLongArrowAltRight />
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SectionSelectionPage