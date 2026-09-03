import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import CourierSidebar from './CourierSidebar';
import { Outlet } from 'react-router-dom';

const CourierLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className='min-h-screen flex flex-col md:flex-row relative'>
      <div className='flex md:hidden p-4 bg-blue-900 text-white z-20'>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars size={24}/>
        </button>
        <h1 className='ml-4 text-xl font-medium'>Courier Dashboard</h1>
      </div>

      {isSidebarOpen && (
        <div className='fixed inset-0 z-10 bg-black/50 md:hidden'
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <div className={`bg-gray-900 w-70 min-h-screen text-white absolute md:relative transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>
        <CourierSidebar />
      </div>

      <div className='grow p-6 overflow-auto'>
        <Outlet />
      </div>
    </section>
  );
};

export default CourierLayout;
