import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(`searchTerm:`, searchTerm);
        setIsOpen(false);
    }
  return (
    <div className={`flex justify-center items-center w-full transition-all duration-300 ${
            isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
        }`}>
        {isOpen ? 
            (<form  onSubmit={handleSubmit} className=' relative flex justify-center items-center w-full'>
                <div className='relative w-1/2'>
                    <input type="text" 
                    value={searchTerm} 
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    placeholder='Search' 
                    className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg 
                    focus:outline-none w-full placeholder:text-gray-700'/>
                    {/* Search */}
                    <button type='submit' className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700'>
                        <HiMagnifyingGlass className='w-6 h-6'/>
                    </button>
                </div>
                {/* Clear SearchBar */}
                <button 
                    onClick={()=>setIsOpen(!isOpen)} 
                    className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-800'>
                    <HiMiniXMark className='w-6 h-6'/>
                </button>
            </form>) :
            (<button onClick={() => setIsOpen(!isOpen)}>
                <HiMagnifyingGlass className='w-6 h-6 cursor-pointer'/>
            </button>)
        }
    </div>
  )
}

export default SearchBar