import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'
import { RiArrowUpSLine } from 'react-icons/ri'

const FeaturedSection = () => {
  return (
    <section className='py-12 px-4 lg:px-0'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* first section */}
            <div className='flex flex-col items-center'>
                <HiShoppingBag className='w-6 h-6 mb-3'/>
                <h3 className='tracking-tighter text-lg text-gray-800 mb-1'>SHIPPING NATIONWIDE</h3>
                <p className='tracking-tighter text-sm text-gray-600'>On all orders</p>
            </div>
            {/* first section */}
            <div className='flex flex-col items-center'>
                <HiArrowPathRoundedSquare className='w-6 h-6 mb-3'/>
                <h3 className='tracking-tighter text-lg text-gray-800 mb-1'>45 DAYS RETURN</h3>
                <p className='tracking-tighter text-sm text-gray-600'>Money back Guarantee</p>
            </div>
            {/* first section */}
            <div className='flex flex-col items-center'>
                <HiOutlineCreditCard className='w-6 h-6 mb-3'/>
                <h3 className='tracking-tighter text-lg text-gray-800 mb-1'>SECURE CHECKOUT</h3>
                <p className='tracking-tighter text-sm text-gray-600'>100% secure checkout process</p>
            </div>
        </div>
    </section>
  )
}

export default FeaturedSection