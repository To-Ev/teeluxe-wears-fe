import React from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';

const TopBar = () => {
  return (
    <div className="bg-yellow-500 text-white ">
      <div className="container mx-auto flex justify-between items-center py-3 px-3">
        <div className='hidden md:flex item-center space-x-4'>
          <a href="#" className='hover:text-gray-300'>
            <TbBrandMeta className='h-5 w-5'/>
          </a>
          <a href="#" className='hover:text-gray-300'>
            <IoLogoInstagram className='h-5 w-5'/>
          </a>
          <a href="#" className='hover:text-gray-300'>
            <RiTwitterXLine className='h-5 w-4'/>
          </a>
        </div>
        <div className='text-sm text-center grow'>
          <span>We ship Nationwide - Fast and Reliable Shipping</span>
        </div>
        <div className='text-sm hidden md:block'>
          <a href="+123456789" className='hover:text-gray-300'>
            (+234) 901 2345 67
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar