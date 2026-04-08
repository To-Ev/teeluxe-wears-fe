import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiBars3BottomRight, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi2'
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);

    const toggleCartDrawer = () =>{
        setDrawerOpen(!drawerOpen)
    }
    const toggleNavDrawer = () =>{
        setNavDrawerOpen(!navDrawerOpen)
    }

  return (
    <div>
        <nav className='container flex mx-auto justify-between items-center py-4 px-6'>
            {/* Start Bar */}
            <div>
                <Link to='/' className='text-md md:text-2xl font-semibold text-gray-700'>
                    Teeluxe Wears
                </Link>
            </div>
            {/* Middle bar */}
            <div className='hidden md:flex space-x-6'>
                <Link to='/collections/all' className='text-gray-700 hover:text-black text-sm font-bold uppercase'>
                    Jewelries
                </Link>
                <Link to='/collections/all' className='text-gray-700 hover:text-black text-sm font-bold uppercase'>
                    Wears
                </Link>
                <Link to='/login' className='text-gray-700 hover:text-black text-sm font-bold uppercase'>
                    Top wear
                </Link>
                <Link to='/' className='text-gray-700 hover:text-black text-sm font-bold uppercase'>
                    Bottom wear
                </Link>
            </div>
            {/* Right Icons */}
            <div className='flex items-center space-x-2.5 sm:space-x-4'>
                <Link to="/admin" className='block bg-black rounded px-2 py-0.5 text-sm sm:px-3 sm:py-1 text-white'>Admin</Link>
                <Link to='/profile' className='hover:text-black'>
                    <HiOutlineUser className='h-6 w-6 text-gray-700'/>
                </Link>
                <button onClick={toggleCartDrawer} className='relative hover:text-black cursor-pointer'>
                    <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
                    <span className='absolute -top-1 text-xs bg-[#ea2e0e] rounded-full px-2 py-0.5 text-white'>4</span>
                </button>
                {/* SearchBar */}
                <SearchBar />
                {/* NavBar */}
                <button  className='md:hidden cursor-pointer' onClick={toggleNavDrawer}>
                    <HiBars3BottomRight className='h-6 w-6 text-gray-700'/>
                </button>
            </div>
        </nav>
        <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>
        
        {/* Mobile Navigation */}
        <div className={`fixed left-0 top-0 w-3/4 sm:w-1/2 md:w-1/3 bg-white shadow-lg z-50 h-full transform transition-transform ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className='flex justify-end'>
                <button onClick={toggleNavDrawer} className='p-4'>
                    <IoMdClose className='h-6 w-6 text-gray-500 cursor-pointer'/>
                </button>
            </div>
            <div className='space-y-4 ml-4'>
                <h2 className="text-gray-700 text-2xl font-semibold">Menu</h2>
                <Link to="/collections/all" className='block font-semibold text-gray-700 hover:text-black'>Jewelries</Link>
                <Link to="/collections/all" className='block font-semibold text-gray-700 hover:text-black'>Wears</Link>
                <Link to="#" className='block font-semibold text-gray-700 hover:text-black'>Top Wear</Link>
                <Link to="#" className='block font-semibold text-gray-700 hover:text-black'>Bottom Wear</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar