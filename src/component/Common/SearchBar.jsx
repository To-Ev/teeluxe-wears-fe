import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { fetchByFilters, setFilters } from '../../redux/slices/productsSlice';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(setFilters({ search: searchTerm }));
        dispatch(fetchByFilters({ search: searchTerm }));
        navigate(`/collections/all?search=${searchTerm}`);
        setIsOpen(false);
    }
  return (
    <div className={`flex justify-center items-center w-full transition-all duration-300 ${
            isOpen ? "absolute top-0 left-0 w-full bg-white h-26 z-50" : ""
        }`}>
        {isOpen ? (
        <form onSubmit={handleSubmit} className="relative flex justify-center items-center w-full">
            <div className="relative w-1/2">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="bg-gray-100 text-gray-500 italic px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            {/* Search submit */}
            <button
                type="submit"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700"
            >
                <HiMagnifyingGlass className="w-6 h-6" />
            </button>
            </div>
            {/* Clear SearchBar */}
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-800"
            >
            <HiMiniXMark className="w-6 h-6" />
            </button>
        </form>
        ) : (
        <>
            {/* Desktop: icon + text */}
            <button
            className="hidden md:flex gap-1.5 items-center cursor-pointer font-semibold text-xs text-gray-200 hover:text-amber-300 transition"
            onClick={() => setIsOpen(!isOpen)}
            >
            <HiMagnifyingGlass className="w-5 h-5 cursor-pointer text-white" />
            SEARCH
            </button>

            {/* Mobile: icon only */}
            <button
            className="md:hidden cursor-pointer text-gray-200 hover:text-amber-300 transition"
            onClick={() => setIsOpen(!isOpen)}
            >
            <HiMagnifyingGlass className="w-5 h-5 cursor-pointer text-white hover:text-amber-300" />
            </button>
        </>
        )}

    </div>
  )
}

export default SearchBar