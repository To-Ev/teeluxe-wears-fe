import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const NewArrivals = () => {
    const NewArrivals = [
        {
            _id: 1,
            name: "Spaghetti top",
            price: 120,
            image: [
                {
                    url: "https://picsum.photos/500/500?random=1",
                    altText: "Spaghetti top",
                },
            ]
        },
        {
            _id: 2,
            name: "Spaghetti top",
            price: 120,
            image: [
                {
                    url: "https://picsum.photos/500/500?random=2",
                    altText: "Spaghetti top",
                },
            ]
        },
        {
            _id: 3,
            name: "Spaghetti top",
            price: 120,
            image: [
                {
                    url: "https://picsum.photos/500/500?random=3",
                    altText: "Spaghetti top",
                },
            ]
        },
        {
            _id: 4,
            name: "Spaghetti top",
            price: 120,
            image: [
                {
                    url: "https://picsum.photos/500/500?random=4",
                    altText: "Spaghetti top",
                },
            ]
        },
        {
            _id: 5,
            name: "Spaghetti top",
            price: 120,
            image: [
                {
                    url: "https://picsum.photos/500/500?random=5",
                    altText: "Spaghetti top",
                },
            ]
        },
        {
            _id: 6,
            name: "Spaghetti top",
            price: 120,
            image: [
                {
                    url: "https://picsum.photos/500/500?random=6",
                    altText: "Spaghetti top",
                },
            ]
        },
        {
            _id: 7,
            name: "Spaghetti top",
            price: 120,
            image: [
                {
                    url: "https://picsum.photos/500/500?random=7",
                    altText: "Spaghetti top",
                },
            ]
        },
        {
            _id: 8,
            name: "Spaghetti top",
            price: 120,
            image: [
                {
                    url: "https://picsum.photos/500/500?random=8",
                    altText: "Spaghetti top",
                },
            ]
        },
        {
            _id: 9,
            name: "Spaghetti top",
            price: 120,
            image: [
                {
                    url: "https://picsum.photos/500/500?random=9",
                    altText: "Spaghetti top",
                },
            ]
        },
    ]
  return (
    <section className='px-4 py-12 lg:px-0'>
        <div className='container mx-auto text-center relative'>
            <h1 className='font-semibold text-2xl mb-4 text-gray-700'>Explore New Arrivals</h1>
            <p className='mb-10 text-gray-700 text-sm tracking-tight'>Discover the latest style straight off the Runaway, freshly added to keep your wardrobe at the cutting edge of fashion.</p>

            {/* Scrollable button */}
            {/* <div className='absolute -bottom-8 right-0 flex'>
                <button className='text-gray-600 p-2 shadow-md cursor-pointer'>
                    <FiChevronLeft className='text-2xl '/>
                </button>
                <button className='text-gray-600 p-2 shadow-md cursor-pointer'>
                    <FiChevronRight className='text-2xl'/>
                </button>
            </div> */}
        </div>
        {/* Scrollable area */}
        <div className='container mx-auto flex overflow-x-scroll space-x-6 relative'>
            {
                NewArrivals.map((product) =>
                    <div key={product._id} className='min-w-full sm:min-w-[50%] lg:min-w-[30%] mt-2 relative'>
                        <img 
                            src={product?.image[0].url || ''} 
                            alt={product?.image[0].altText || product.name} 
                            className='w-full h-80 object-cover rounded-lg'
                            draggable="false"
                        />

                        <div 
                        className='absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-md'>
                            <Link to={`/product/${product._id}`}>
                                <h2 className='font-medium'>{product.name}</h2>
                                <p className='mt-1'>${product.price}</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    </section>
  )
}

export default NewArrivals