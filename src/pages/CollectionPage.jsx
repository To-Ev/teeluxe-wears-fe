import React, { useEffect, useRef, useState } from 'react'
import FilterSideBar from '../component/Products/FilterSideBar'
import { RiFilter2Fill } from 'react-icons/ri'
import SortOptions from '../component/Products/SortOptions';
import ProductsGrid from '../component/Products/ProductsGrid';

const CollectionPage = () => {

    const [products, setProducts] = useState([]);
    const sideBarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    useEffect(() =>{
        setTimeout(() => {
            const fetchProducts = [
                {
                    _id: 1,
                    name: "product 1",
                    price: 300,
                    image: [{url: "https://picsum.photos/500/500?random=1"}]
                },
                {
                    _id: 2,
                    name: "product 2",
                    price: 300,
                    image: [{url: "https://picsum.photos/500/500?random=2"}]
                },
                {
                    _id: 3,
                    name: "product 3",
                    price: 300,
                    image: [{url: "https://picsum.photos/500/500?random=3"}]
                },
                {
                    _id: 4,
                    name: "product 4",
                    price: 300,
                    image:  [{url: "https://picsum.photos/500/500?random=4"}]
                },
                {
                    _id: 5,
                    name: "product 5",
                    price: 300,
                    image: [{url: "https://picsum.photos/500/500?random=5"}]
                },
                {
                    _id: 6,
                    name: "product 6",
                    price: 300,
                    image:  [{url: "https://picsum.photos/500/500?random=6"}]
                },
                {
                    _id: 7,
                    name: "product 7",
                    price: 300,
                    image:  [{url: "https://picsum.photos/500/500?random=7"}]
                },
                {
                    _id: 8,
                    name: "product 8",
                    price: 300,
                    image:  [{url: "https://picsum.photos/500/500?random=8"}]
                },
            ]
            setProducts(fetchProducts)
        }, 1000);
    }, [])
  return (
    <section className='flex flex-col lg:flex-row mx-auto'>
        <button 
            onClick={toggleSidebar}
            className='flex p-2 lg:hidden border border-gray-300 text-gray-700 justify-center items-center cursor-pointer'>
            <RiFilter2Fill className='w-5 h-5 mr-1'/> <span className=' tracking-wider'>Filters</span>
        </button>

        {/* Filter section */}
        <div 
            ref={sideBarRef}
            className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50 bg-white w-2/3 sm:w-86 fixed left-0 inset-y-0 overflow-y-auto transition duration-300 lg:static lg:translate-x-0 lg:w-64`}>
            <FilterSideBar />
        </div>  
        <div className='grow p-4'>
            <h2 className='text-xl text-gray-700 p-2'>ALL COLLECTIONS</h2>
           
           {/* Sort Options  */}
           <SortOptions />

           {/* Products Grid  */}
           <ProductsGrid products={products}/>
        </div>
    </section>
  )
}

export default CollectionPage