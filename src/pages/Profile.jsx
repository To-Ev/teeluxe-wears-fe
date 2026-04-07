import React from 'react'
import MyOrderPage from './MyOrderPage'

const Profile = () => {
  return (
    <section className='min-w-screen p-4 md:p-6'>
      <div className='grow container mx-auto '>
        <div className='flex flex-col md:flex-row text-gray-700 md:space-x-6 space-y-6 md:space-y-0'>
          {/* left section */}
          <div className='w-full md:w-1/3 shadow p-6'> 
            <h1 className='text-2xl md:text-3xl font-semibold mb-3'>Zaynab Tinuola</h1>
            <p className='text-lg mb-4 tracking-tight'>zaynab@example.com</p>
            <button className='w-full bg-red-500 text-white hover:bg-red-600 transition cursor-pointer rounded-lg py-2 font-semibold tracking-wide'>Logout</button>
          </div>
          {/* Left section  */}
          <div className='w-full md:w-2/3'>
            <MyOrderPage />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile