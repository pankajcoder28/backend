import React from 'react'
import '../navbar.scss'
import { useNavigate } from 'react-router'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <nav className='navbar'>
      <h3 className='gradient-text'>Instagram</h3>
      <button onClick={()=>{navigate('/createpost')}}>create post</button>
    </nav>
  )
}

export default Navbar
