import React from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FaWhatsapp } from "react-icons/fa";


const TopBar = () => {
  return (
    <div className="bg-gray-950 text-white ">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className='hidden md:flex item-center space-x-4'>
          <a 
            href="https://www.facebook.com/share/1EJJMMaqtr/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className='hover:text-gray-300'>
            <TbBrandMeta className='h-5 w-5'/>
          </a>
          <a 
            href="https://www.instagram.com/derayo.ng?igsh=NXh2b2lid2ZvbWZ4" 
            target="_blank" 
            rel="noopener noreferrer" 
            className='hover:text-gray-300'>
            <IoLogoInstagram className='h-5 w-5'/>
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className='hover:text-gray-300'>
            <RiTwitterXLine className='h-5 w-4'/>
          </a>
          <a href="https://wa.me/971529004793" 
            target="_blank" 
            rel="noopener noreferrer" 
            className='hover:text-gray-300'>
            <FaWhatsapp className='h-5 w-4'/>
          </a>
        </div>
        <div className='text-sm text-center grow'>
          <span>Update your wardrobe and elevate your style</span>
        </div>
        <div className='text-sm hidden md:block'>
          <a href="tel:+2347062821063" className='hover:text-gray-300'>
            (+234) 706 2821 063
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar