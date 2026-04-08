import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

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

    const scroll = (direction) =>{
        const scrollamount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollamount, behavior: "smooth"})
    }

    // Update Scroll Buttons 
    const updateScrollButtons = () =>{
        const container = scrollRef.current;

        if(container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = 
                container.scrollWidth > leftScroll + container.clientWidth;

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable)
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if(container) {
            container.addEventListener("scroll", updateScrollButtons)
            updateScrollButtons();
        }
    });

  return (
    <section className='px-4 py-12 lg:px-0 relative'>
        <div className='container mx-auto text-center relative'>
            <h1 className='font-semibold text-2xl mb-4 text-gray-700'>Explore New Arrivals</h1>
            <p className='mb-10 text-gray-700 text-sm tracking-tight'>Discover the latest style straight off the Runaway, freshly added to keep your wardrobe at the cutting edge of fashion.</p>
        </div>
        {/* Scrollable area */}
        <div 
            ref={scrollRef}
            className='container mx-auto flex overflow-x-scroll space-x-6 relative'>
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
        {/* Scrollable button */}
        <div className='absolute bottom-45 sm:top-1/2 right-0 flex justify-between w-full p-2'>
            <button 
                disabled={!canScrollLeft}
                onClick={() => scroll("left")}
                className={` rounded-sm py-4 p-2 shadow-md cursor-pointer ${canScrollLeft ? "text-gray-600  bg-white/80" : "text-gray-50/0"}`}>
                <FiChevronLeft className='text-2xl '/>
            </button>
            <button 
                onClick={() => scroll("right")}
                className={` rounded-sm py-4 p-2 shadow-md cursor-pointer transition ${canScrollRight ? "text-gray-600 bg-white/80" : "text-gray-50/0"}`}>
                <FiChevronRight className='text-2xl'/>
            </button>
        </div>
    </section>
  )
}

export default NewArrivals