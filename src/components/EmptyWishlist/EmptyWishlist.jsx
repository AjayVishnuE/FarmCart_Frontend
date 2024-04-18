import React from 'react';
import './EmptyWishlist.css';
import { Navbar,Header} from '../../components';
import { Link } from 'react-router-dom';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';
import emptycart from '../../Images/emptycart.svg';

function EmptyCart(props) {
    return (
        <div className='emptycart-overall-container'>
            <Header/>
            <div className='emptycart-container'>
                <img className='emptycart' src={emptycart} alt="an empty cart"/>
                <h2>Your Wishlist is empty</h2>
                <h5 className='waitmsg'>Add items to your Wishlist, we are waiting!</h5>
            
            <button className='shopbtn' type="submit" 
         ><Link to='/dashboard'>Continue Shopping</Link>
         </button>
         <Navbar/>
         </div>
        </div>
    );
}

export default EmptyCart;