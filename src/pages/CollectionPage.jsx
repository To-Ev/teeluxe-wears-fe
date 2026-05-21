import React, { useEffect, useRef, useState } from 'react'
import FilterSideBar from '../component/Products/FilterSideBar'
import { RiFilter2Fill } from 'react-icons/ri'
import SortOptions from '../component/Products/SortOptions';
import ProductsGrid from '../component/Products/ProductsGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByFilters } from '../redux/slices/productsSlice';

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.products);
    const queryParams = Object.fromEntries([...searchParams])

    const sideBarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () =>{
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) =>{
        // close sidebar outside 
        if(sideBarRef.current && !sideBarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() =>{
        // add clickOutside event 
        document.addEventListener("mousedown", handleClickOutside);
        // remove eventListener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

  return (
    <section className='flex flex-col lg:flex-row mx-auto'>
        <button 
            onClick={toggleSidebar}
            className='flex p-2 lg:hidden border-b border-l border-r border-gray-300 text-gray-700 justify-center items-center cursor-pointer'>
            <RiFilter2Fill className='w-5 h-5 mr-1'/> <span className=' tracking-wider'>Filters</span>
        </button>

        {/* Filter section */}
        <div 
            ref={sideBarRef}
            className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50 bg-white w-2/5 sm:w-100 fixed left-0 inset-y-0 overflow-y-auto transition duration-300 lg:static lg:translate-x-0`}>
            <FilterSideBar />
        </div>  
        <div className='grow p-4'>
            <h2 className='text-xl text-gray-700 p-2'>ALL COLLECTIONS</h2>
           
           {/* Sort Options  */}
           <SortOptions />

           {/* Products Grid  */}
           <ProductsGrid products={products} loading={loading} error={error}/>
        </div>
    </section>
  )
}

export default CollectionPage