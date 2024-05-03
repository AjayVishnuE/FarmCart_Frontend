import React, { useState, useEffect }  from 'react';
import './Header.css';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';
import { Link, useNavigate } from 'react-router-dom';


function Header(props) {
    return (
            <div className='header12'>
                <img className='logoimage' src={bar} alt="bars" />
                <Link to = "/cart">
                    <img className='cartimage' src={cart} alt="cart" />
                </Link>
                
            </div>
            
    );
}

export default Header;