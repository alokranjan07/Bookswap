import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'




function Navbar() {
  return (
    <div className="nav">
        <Link to="/"> Home</Link>
        <Link to="/SwapBooks">SwapBooks</Link>
        <Link to="/profile">profile</Link>
    </div>
  )
}

export default Navbar