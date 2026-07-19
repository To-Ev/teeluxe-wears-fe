import React from 'react'
import TopBar from '../Layout/TopBar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='border-b'>
      {/* topBar */}
      <TopBar />
      {/* navBar */}
      <Navbar />
      {/* cartDrawer */}
    </header>
  )
}

export default Header