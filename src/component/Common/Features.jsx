import React from 'react'
import featureHero from '../../assets/footer/hero_footer.png'
import {  FaGlobeAfrica, FaLandmark } from 'react-icons/fa'
import { IoMdHand, IoMdPeople } from 'react-icons/io'
import {  RiLeafLine, RiOrganizationChart, RiWomenLine } from 'react-icons/ri'
import { TbBrandStorybook, TbNeedleThread, TbTimeDuration0 } from 'react-icons/tb'
import { HiGlobeAlt } from 'react-icons/hi2'

const Features = () => {
  return (
    <section className='max-w-9xl mx-auto '>
      {/* hero section */}
      <div className='relative text-amber-100'>
        <div className='h-screen sm:h-full'>
          <img 
            src={featureHero} alt="hero image" 
            className='w-full h-full object-cover'
          />
        </div>
        <div className='absolute top-1/2 sm:top-1/3 md:top-1/3 left-10 md:left-20'>
          <div className="flex items-center gap-4 md:gap-8">
            <h2 className="md:text-md text-xs font-semibold tracking-widest">FEATURES</h2>
            <div className="md:w-13 w-10 h-0.5 bg-amber-100/70"></div>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif mb-3">Why <i className="icon-Derayo"><span className='text-6xl md:text-9xl'>?</span></i></h1>
          <p className="md:text-4xl text-2xl font-serif italic">More than fashion. <br />Its a movement.</p>
        </div>
      </div>
      {/* Main */}
      <div className='p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-gray-700'>
        <div className='text-center sm:text-left'>
          <div className='w-full flex justify-center sm:justify-start'>
            <div className='border-2 p-4 mb-4 rounded-full h-18 w-18 flex justify-center items-center text-amber-200'>
              <FaLandmark className='w-15 h-15 text-yellow-600/70' />
            </div>
          </div>
          <h1 className='text-3xl font-serif mb-3'>Rooted in Heritage</h1>
          <p className='text-sm font-sans font-medium w-full sm:w-58'>Inspired by African culture and tradition, every piece reflects a rich story of identity, craftsmanship, and timeless pride.</p>
        </div>
        <div className='text-center sm:text-left'>
          <div className='w-full flex justify-center sm:justify-start'>
            <div className='border-2 p-4 mb-4 rounded-full h-18 w-18 flex justify-center items-center text-amber-200'>
              <TbNeedleThread className='w-15 h-15 text-yellow-600/70' />
            </div>
          </div>
          <h1 className='text-3xl font-serif mb-3'>Expert Craftsmanship</h1>
          <p className='text-sm font-sans font-medium w-full sm:w-58'>Thoughtfully handcrafted by skilled artisans, each design embodies precision, care, and exceptional attention to detail.</p>
        </div>
        <div className='text-center sm:text-left'>
          <div className='w-full flex justify-center sm:justify-start'>
            <div className='border-2 p-4 mb-4 rounded-full h-18 w-18 flex justify-center items-center text-amber-200'>
              <RiLeafLine className='w-15 h-15 text-yellow-600/70' />
            </div>
          </div>
          <h1 className='text-3xl font-serif mb-3'>Conscious Creation</h1>
          <p className='text-sm font-sans font-medium w-full sm:w-58'>We embrace responsible practices by using carefully sourced materials and supporting ethical production methods.</p>
        </div>
        <div className='text-center sm:text-left'>
          <div className='w-full flex justify-center sm:justify-start'>
            <div className='border-2 p-4 mb-4 rounded-full h-18 w-18 flex justify-center items-center text-amber-200'>
              <TbTimeDuration0 className='w-15 h-15 text-yellow-600/70' />
            </div>
          </div>
          <h1 className='text-3xl font-serif mb-3'>Timeless Elegance</h1>
          <p className='text-sm font-sans font-medium w-full sm:w-58'>Designed beyond trends, our pieces blend classic silhouettes with modern sophistication to remain relevant for years to come.</p>
        </div>
        <div className='text-center sm:text-left'>
          <div className='w-full flex justify-center sm:justify-start'>
            <div className='border-2 p-4 mb-4 rounded-full h-18 w-18 flex justify-center items-center text-amber-200'>
              <IoMdPeople className='w-15 h-15 text-yellow-600/70' />
            </div>
          </div>
          <h1 className='text-3xl font-serif mb-3'>Empowering Women</h1>
          <p className='text-sm font-sans font-medium w-full sm:w-58'>We celebrate and support the talented women whose creativity, skill, and dedication bring our vision to life.
          </p>
        </div>
        <div className='text-center sm:text-left'>
          <div className='w-full flex justify-center sm:justify-start'>
            <div className='border-2 p-4 mb-4 rounded-full h-18 w-18 flex justify-center items-center text-amber-200'>
              <FaGlobeAfrica className='w-15 h-15 text-yellow-600/70' />
            </div>
          </div>
          <h1 className='text-3xl font-serif mb-3'>African Heritage, Global Reach</h1>
          <p className='text-sm font-sans font-medium w-full sm:w-58'>Connecting local craftsmanship with a worldwide audience, we proudly share African excellence across borders and generations.</p>
        </div>
      </div>
    </section>
  )
}

export default Features