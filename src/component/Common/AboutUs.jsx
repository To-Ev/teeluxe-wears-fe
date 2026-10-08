import React from 'react'
import story from '../../assets/footer/02_our-story.jpg';
import herText from '../../assets/footer/03_heritage-textile.jpg';
import herLook from '../../assets/footer/04_heritage-look.jpg';
import derWoman from '../../assets/footer/derayo_woman_black_look (3).png';
import fabric from '../../assets/footer/06_fabric-detail.jpg';
import craft from '../../assets/footer/07_craft.jpg';
import silhouette from '../../assets/footer/08_silhouette (2).jpg';
import landscape from '../../assets/footer/09_closing-landscape.jpg';
import { FaLongArrowAltDown, FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
// import aboutHero from '../../assets/footer/About_hero.png'
import hero from '../../assets/footer/hero_footer.png'

const AboutUs = () => {
  return (
    <section className='mx-0'>
        {/* Hero */}
        <div className='h-screen sm:h-full relative'>
            <img 
                src={hero} alt="Hero image" 
                className='w-full h-full object-cover'
            />
            <div className='absolute top-1/3 left-1/9'>
                <i className="icon-Derayo md:text-8xl text-7xl text-amber-100"></i>
                <p className='text-amber-100 md:text-4xl text-3xl font-serif mt-3 md:leading-11 font-light italic'>Modern wear, <br />Rooted in heritage.</p>
            </div>
        </div>
        {/* First section */}
        <div className='grid grid-cols-2 mt-6 md:gap-45 gap-10 mb-6 px-12 mx-auto'>
            <div className='flex h-full justify-center items-center col-span-2 md:col-span-1'>
                <div>
                    <h2 className='font-semibold text-sm mb-4 text-gray-700'>OUR STORY</h2>
                    <h1 className='text-4xl font-semibold font-serif text-gray-700 mb-6'>Where heritage meets the way we dress today.</h1>
                    <p className='text-gray-600 text-sm mb-0 font-sans font-medium'>Derayo was born from a simple belief -- that our culture is not just a part of our past, but a source of endless inspiration for the future. <br /><br />We create modern, versatile pieces for women who want to look good, feel confident and carry their heritage with pride -- in every step, in every season.
                    </p>
                </div>
            </div>
            <div className='h-lg col-span-2 md:col-span-1'>
                <img 
                    src={story} alt="story image" 
                    className='w-full h-full object-cover'
                />
            </div>
        </div>
        {/* Second Section */}
        <div className='grid grid-cols-3 gap-6 md:gap-12 mb-2'>
            {/* Mobile */}
            <div className='mx-auto px-12 md:hidden col-span-3 md:col-span-1 flex h-full justify-center items-center'>
                <div className=''>
                    <h2 className='font-semibold text-sm mb-4 text-gray-700'>OUR HERITAGE</h2>
                    <h1 className='text-4xl font-semibold font-serif text-gray-700 mb-6'>Rooted in culture. <br />Reimagined for today</h1>
                    <p className='text-gray-600 text-sm font-sans font-medium'>We draw inspiration from our rich cultural traditions -- from traditional textiles and craftsmanship to architectural forms and symbolic patterns. But we don't reproduce the past. we reinterpret it, infusing timeless cultural details into contemporary silhouette for the modern woman.</p>
                </div>
            </div>
            {/* Desktop */}
            <div className='grid grid-cols-3 gap-2 h-lg md:col-span-2 col-span-3'>
                <img 
                    src={herText} alt="heritage text" 
                    className='h-full w-full object-cover col-span-2'
                />
                <img 
                    src={herLook} alt="heritage look" 
                    className='h-full w-full object-cover'
                />
            </div>
            <div className='hidden col-span-3 md:col-span-1 md:flex h-full justify-center items-center'>
                <div className=''>
                    <h2 className='font-semibold text-sm mb-4 text-gray-700'>OUR HERITAGE</h2>
                    <h1 className='text-4xl font-semibold font-serif text-gray-700 mb-6'>Rooted in culture. <br />Reimagined for today</h1>
                    <p className='text-gray-600 text-sm font-sans font-medium'>We draw inspiration from our rich cultural traditions -- from traditional textiles and craftsmanship to architectural forms and symbolic patterns. But we don't reproduce the past. we reinterpret it, infusing timeless cultural details into contemporary silhouette for the modern woman.</p>
                </div>
            </div>
        </div>
        {/* Third Section */}
        <div className='grid grid-cols-5 gap-5 md:gap-15 bg-amber-50/50'>
            {/* Mobile */}
            <div className='md:hidden px-12 pt-5 flex h-full justify-center items-center col-span-5'>
                <div className='max-w-full'>
                    <h2 className='font-semibold text-sm mb-4 text-gray-700'>THE DERAYO WOMAN</h2>
                    <h1 className='text-4xl font-semibold font-serif text-gray-700 mb-6'>For women who carry where they come from with them.</h1>
                    <p className='text-gray-600 text-sm font-sans font-medium'>She's confident, grounded and always evolving. <br />She values her root, celebrate her individuality, and moves through the world with purpose. <br />The Derayo woman is both tradition and transformation -- elegant, intentional and free.</p>
                </div>
            </div>
            {/* Desktop */}
            <div className='h-110 col-span-5 md:col-span-3'>
                <img 
                    src={derWoman} alt="Derayo woman" 
                    className='h-full w-full object-cover'
                />
            </div>
            <div className='hidden md:flex h-full justify-center items-center col-span-2'>
                <div className='max-w-full'>
                    <h2 className='font-semibold text-sm mb-4 text-gray-700'>THE DERAYO WOMAN</h2>
                    <h1 className='text-4xl font-semibold font-serif text-gray-700 mb-6'>For women who carry where they come from with them.</h1>
                    <p className='text-gray-600 text-sm font-sans font-medium'>She's confident, grounded and always evolving. <br />She values her root, celebrate her individuality, and moves through the world with purpose. <br />The Derayo woman is both tradition and transformation -- elegant, intentional and free.</p>
                </div>
            </div>
        </div>
        {/* Fourth Section */}
        <div className='flex my-6'>
            <div className='flex md:justify-around flex-col md:flex-row max-w-full gap-10 md:gap-0 mb-20 md:mb-0'>
                <div className='flex h-full justify-center items-center text-center'>
                    <div className='w-full'>
                        <h2 className='font-semibold text-sm mb-4 text-gray-700'>OUR PHILOSOPHY</h2>
                        <h1 className='text-4xl font-semibold font-serif text-gray-700 mb-6'>From heritage <br />to modern, <br />with intention.</h1>
                    </div>
                </div>
                <div className='md:h-3/5 h-2/3 w-3/5 md:w-1/5 mx-auto'>
                    <img 
                    src={fabric} alt="fabric image" 
                    className='w-full h-full object-cover'
                    />
                    <h3 className='font-semibold text-sm my-3 text-gray-700'>HERITAGE</h3>
                    <p className='text-gray-600 text-sm font-sans font-medium'>The cultural roots that inspire us.</p>
                </div>
                <div className='relative mt-10'>
                    <FaLongArrowAltRight className='absolute top-20 text-gray-700 hidden md:inline-block'/>
                    <FaLongArrowAltDown className='text-center w-full text-gray-700 md:hidden inline-block'/>
                </div>
                <div className='md:h-3/5 h-2/3 w-3/5 md:w-1/5 mx-auto'>
                    <img 
                        src={craft} alt="silhouette image" 
                        className='w-full h-full object-cover' 
                    />
                    <h3 className='font-semibold text-sm my-3 text-gray-700'>INTERPRETATION</h3>
                    <p className='text-gray-600 text-sm font-sans font-medium'>Thoughtful design and modern craftsmanship.</p>
                </div>
                <div className='relative text-gray-700 mt-10'>
                    <FaLongArrowAltRight className='md:absolute top-20 hidden md:inline-block'/>
                    <FaLongArrowAltDown className='text-center w-full text-gray-700 md:hidden inline-block'/>
                </div>
                <div className='md:h-3/5 h-2/3 w-3/5 md:w-1/5 mx-auto'>
                    <img 
                        src={silhouette} alt="craft image" 
                        className='w-full h-full object-cover'
                    />
                    <h3 className='font-semibold text-sm my-3 text-gray-700'>DERAYO</h3>
                    <p className='text-gray-600 text-sm font-sans font-medium'>Contemporary pieces for today's woman.</p>
                </div>
            </div>
        </div>
        {/* Landscape */}
        <div className='h-80 w-full relative'>
            <img 
                src={landscape} alt="landscape image" 
                className='w-full h-full object-cover'
            />
            <div className='absolute text-amber-100/80 right-6 md:right-1/4 bottom-20'>
                <h1 className='text-3xl mb-4 font-semibold font-serif'>Made for now <br />Inspired by where <br />we come from.</h1>
                <div className='flex gap-3 items-center'>
                    <button
                    className='border-b'>
                        <Link to="/collections/all"> 
                            EXPLORE THE COLLECTION
                        </Link>
                    </button>
                    <FaLongArrowAltRight />
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutUs