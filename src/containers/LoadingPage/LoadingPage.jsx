import React from 'react'
import logo from '../../Images/logo.png';
import heroimg from '../../Images/Hero Image.png';
import background from '../../Images/Backgroundlogo.png'; 
import { Link } from 'react-router-dom';
import "./loadingpage.css"

function LoadingPage() {
  return (
    <div className='Loadingpage'>
      <img className='bg-img' src={background} alt="bg-img" />
      <img className='logo-img' src={logo} alt="logo-img" />

      <h1 className="herotext">Farm fresh <br></br>for all</h1>
      <img className='heroimage' src={heroimg} alt="" />
      <div className="getbutton">
        <Link style={{color:"white", fontSize:"20px"}} to="/introduction">
          Get Started!
        </Link>
      </div>
    </div>
  )
}

export default LoadingPage
