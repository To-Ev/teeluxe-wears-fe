import React, { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HiBars3BottomRight, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi2'
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import ROLES_LIST from '../../ROLES_LIST';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);

    const location = useLocation();
    const isHome = location.pathname === "/";
    const searchParams = new URLSearchParams(location.search);
    const activeCategory = searchParams.get("category");
    const activeNewIn = location.search.includes("New In");

    const cartItemCount = 
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    const toggleCartDrawer = () =>{
        setDrawerOpen(!drawerOpen)
    }
    const toggleNavDrawer = () =>{
        setNavDrawerOpen(!navDrawerOpen)
    }

  return (
    <div className="w-full m-0 p-0">
        <nav className={`w-full flex items-center justify-between py-2 sm:px-4 px-2 z-30
        ${isHome ? "absolute bg-blend-multiply" : "relative bg-gray-900"}`}>
            {/* Left bar */}
            <div className='hidden md:flex gap-3 text-gray-200 flex-1'>
                <div className="hidden md:flex gap-3 text-gray-200 flex-1">
                    <Link
                        to="/collections/all?New In"
                        className={`text-xs font-semibold uppercase transition pb-1 ${
                        activeNewIn
                            ? "text-amber-300 border-b-2 border-amber-300"
                            : "hover:text-amber-300"
                        }`}
                    >
                        NEW IN
                    </Link>

                    <Link
                        to="/collections/all?category=Two Piece Sets"
                        className={`text-xs font-semibold uppercase transition pb-1 ${
                        activeCategory === "Two Piece Sets"
                            ? "text-amber-300 border-b-2 border-amber-300"
                            : "hover:text-amber-300"
                        }`}
                    >
                        2-Pcs-SETS
                    </Link>

                    <Link
                        to="/collections/all?category=Bubus"
                        className={`text-xs font-semibold uppercase transition pb-1 ${
                        activeCategory === "Bubus"
                            ? "text-amber-300 border-b-2 border-amber-300"
                            : "hover:text-amber-300"
                        }`}
                    >
                        BÚBÚS
                    </Link>

                    <Link
                        to="/collections/all?category=Kaftans"
                        className={`text-xs font-semibold uppercase transition pb-1 ${
                        activeCategory === "Kaftans"
                            ? "text-amber-300 border-b-2 border-amber-300"
                            : "hover:text-amber-300"
                        }`}
                    >
                        KAFTANS
                    </Link>

                    <Link
                        to="/collections/all?category=Aso Oke"
                        className={`text-xs font-semibold uppercase transition pb-1 ${
                        activeCategory === "Aso Oke"
                            ? "text-amber-300 border-b-2 border-amber-300"
                            : "hover:text-amber-300"
                        }`}
                    >
                        AṢỌ ÒKÈ
                    </Link>
                </div>
            </div>
            {/* Mid Bar */}
            <div className='flex-1 flex justify-start md:justify-center'>
                <Link to='/' className='text-4xl sm:text-5xl font-semibold text-amber-300'>
                    <i className="icon-Derayo"></i>
                </Link>
            </div>
            {/* Right Icons */}
            <div className="flex items-center justify-end space-x-2 sm:space-x-4 text-gray-200 flex-1">
                {user && user.roles?.Admin === ROLES_LIST.Admin  && (
                    <Link
                    to="/admin"
                    className="block bg-black rounded px-2 py-0.5 text-sm sm:px-2 sm:py-0.5 text-amber-500"
                    >
                    Admin
                    </Link>
                )}

                {/* Profile */}
                {/* Desktop: icon + text */}
                <Link
                    to="/profile"
                    className="hover:text-amber-300 hidden md:flex items-center gap-1.5 text-xs font-semibold transition"
                >
                    <HiOutlineUser className="h-5 w-5 text-white" />
                    PROFILE
                </Link>
                {/* Mobile: icon only */}
                <Link
                    to="/profile"
                    className="hover:text-amber-300 md:hidden transition"
                >
                    <HiOutlineUser className="h-5 w-5 text-white" />
                </Link>

                {/* Cart */}
                <button
                    onClick={toggleCartDrawer}
                    className="relative hover:text-amber-300 cursor-pointer hidden md:flex items-center text-xs gap-1.5 font-semibold transition"
                >
                    <HiOutlineShoppingBag className="h-5 w-5 text-white" />
                    CART
                    {cartItemCount > 0 && (
                    <span className="absolute -top-1 text-xs bg-[#ea9d0e] rounded-full px-2 py-0.5 text-white">
                        {cartItemCount}
                    </span>
                    )}
                </button>
                {/* Mobile: icon only */}
                <button
                    onClick={toggleCartDrawer}
                    className="relative hover:text-amber-300 cursor-pointer md:hidden transition"
                >
                    <HiOutlineShoppingBag className="h-5 w-5 text-white" />
                    {cartItemCount > 0 && (
                    <span className="absolute -top-1 text-xs bg-[#eaaf0e] rounded-full px-2 py-0.5 text-white">
                        {cartItemCount}
                    </span>
                    )}
                </button>

                {/* Desktop: full search bar */}
                <div className="hidden md:flex items-center space-x-4">
                    <SearchBar className="w-40 md:w-60 shrink-0" />
                </div>

                {/* Mobile: icon only */}
                <div className="md:hidden">
                    <SearchBar />
                </div>

                {/* NavBar (hamburger) */}
                <button className="md:hidden cursor-pointer" onClick={toggleNavDrawer}>
                    <HiBars3BottomRight className="h-6 w-6 text-gray-200" />
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
                <h2 className="text-gray-700 text-3xl font-semibold">Menu</h2>
                <Link 
                    to="/collections/all?New In" 
                    className='block font-semibold text-gray-700 hover:text-black'
                    onClick={toggleNavDrawer}
                >NEW IN</Link>
                <Link 
                    to="/collections/all?category=Two Piece Sets" 
                    className='block font-semibold text-gray-700 hover:text-black'
                    onClick={toggleNavDrawer}
                >TWO-PIECE SETS</Link>
                <Link 
                    to="/collections/all?category=Bubus" 
                    className='block font-semibold text-gray-700 hover:text-black'
                    onClick={toggleNavDrawer}
                >BÚBÚS</Link>
                <Link 
                    to="/collections/all?category=Kaftans" 
                    className='block font-semibold text-gray-700 hover:text-black'
                    onClick={toggleNavDrawer}
                >KAFTANS</Link>
                <Link 
                    to="/collections/all?category=Aso Oke" 
                    className='block font-semibold text-gray-700 hover:text-black'
                    onClick={toggleNavDrawer}
                >AṢỌ ÒKÈ</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar