import React from 'react';
import './EmptyNotification.css';
import { Navbar,Header} from '..';
import { Link } from 'react-router-dom';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';

function EmptyNotification(props) {
    return (
        <div className='no-notification-overall'>
            <Header/>
            <div className='emptynoti-container'>
                <h4>No notifications yet</h4>
            </div>
            

            <Navbar/>
        </div>
    );
}

export default EmptyNotification;