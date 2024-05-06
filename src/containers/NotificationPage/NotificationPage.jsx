import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Header } from '../../components';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import './NotificationPage.css';
import { Link } from 'react-router-dom';

function NotificationPage(props) {
    const [notifications, setNotifications] = useState([]);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            const accessToken = localStorage.getItem('accessToken'); 
            try {
                const response = await axios.get(`${API_ENDPOINTS.notification}getpost/`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const handleClearClick = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            await axios.delete(`${API_ENDPOINTS.notification}clear/`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setNotifications([]); 
        } catch (error) {
            console.error('Error clearing notifications:', error);
        }
    };

    return (
        <div className='notification-overall-container'>
            <Header />
            <div className="overallframe">
                <div className='notihead'>
                    <div className='notitext'>Notifications</div>
                    <div className='clear' onClick={handleClearClick}>Clear all</div>
                </div>
                {!isHidden && notifications.length > 0 && (
                    <div className='notification-overall'>
                        {notifications.map((notification, index) => (
                            <Link to = {notification.redirect}>
                                <div key={index} className="Notificationcell">
                                    <div className="Avatarandsubjectcontainer">
                                        <div className="Subjectlinecontainer">
                                            {notification.title}
                                        </div>
                                        <p className="Subjectmessagecontainer">
                                            {notification.message}
                                        </p>
                                        <div className="Timestampcontainer">
                                            {notification.timestamp}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <div className='navbar-container'>
                <Link to="/dashboard">
                    <svg className="mySvg"  id="dashboard-svg" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="mypath" d="M14.5958 1.55415C14.3052 1.26357 13.911 1.10033 13.5 1.10033C13.089 1.10033 12.6948 1.26357 12.4041 1.55415L1.55414 12.4042C1.27179 12.6965 1.11556 13.088 1.11909 13.4944C1.12263 13.9008 1.28564 14.2896 1.57302 14.577C1.8604 14.8644 2.24916 15.0274 2.65557 15.0309C3.06197 15.0344 3.45351 14.8782 3.74584 14.5959L4.19999 14.1417V24.35C4.19999 24.7611 4.36329 25.1553 4.65397 25.446C4.94466 25.7367 5.3389 25.9 5.74999 25.9H8.84999C9.26108 25.9 9.65532 25.7367 9.946 25.446C10.2367 25.1553 10.4 24.7611 10.4 24.35V21.25C10.4 20.8389 10.5633 20.4447 10.854 20.154C11.1447 19.8633 11.5389 19.7 11.95 19.7H15.05C15.4611 19.7 15.8553 19.8633 16.146 20.154C16.4367 20.4447 16.6 20.8389 16.6 21.25V24.35C16.6 24.7611 16.7633 25.1553 17.054 25.446C17.3447 25.7367 17.7389 25.9 18.15 25.9H21.25C21.6611 25.9 22.0553 25.7367 22.346 25.446C22.6367 25.1553 22.8 24.7611 22.8 24.35V14.1417L23.2541 14.5959C23.5465 14.8782 23.938 15.0344 24.3444 15.0309C24.7508 15.0274 25.1396 14.8644 25.427 14.577C25.7143 14.2896 25.8774 13.9008 25.8809 13.4944C25.8844 13.088 25.7282 12.6965 25.4458 12.4042L14.5958 1.55415V1.55415Z" stroke="#888888" stroke-width="2"/>
                    </svg>
                </Link>
                <Link to="/notification">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none">
                        <path d="M19.8572 18.619V19.7143H0.142883V18.619L2.33336 16.4286V9.85714C2.33336 6.46191 4.55669 3.4719 7.80955 2.5081V2.19048C7.80955 1.60953 8.04033 1.05237 8.45113 0.641576C8.86192 0.230782 9.41908 0 10 0C10.581 0 11.1381 0.230782 11.5489 0.641576C11.9597 1.05237 12.1905 1.60953 12.1905 2.19048V2.5081C15.4434 3.4719 17.6667 6.46191 17.6667 9.85714V16.4286L19.8572 18.619ZM12.1905 20.8095C12.1905 21.3905 11.9597 21.9476 11.5489 22.3584C11.1381 22.7692 10.581 23 10 23C9.41908 23 8.86192 22.7692 8.45113 22.3584C8.04033 21.9476 7.80955 21.3905 7.80955 20.8095" fill="#7519EB"/>
                    </svg>
                </Link>
                <Link to="/chat">
                    <svg id="chat-svg" className="mySvg" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="material-symbols:chat-outline">
                            <path id="Vector" d="M6.14285 14.5H14.1429V12.5H6.14285V14.5ZM6.14285 11.5H18.1429V9.5H6.14285V11.5ZM6.14285 8.5H18.1429V6.5H6.14285V8.5ZM2.14285 22.5V4.5C2.14285 3.95 2.33885 3.47933 2.73085 3.088C3.12285 2.69667 3.59352 2.50067 4.14285 2.5H20.1429C20.6929 2.5 21.1639 2.696 21.5559 3.088C21.9479 3.48 22.1435 3.95067 22.1429 4.5V16.5C22.1429 17.05 21.9472 17.521 21.5559 17.913C21.1645 18.305 20.6935 18.5007 20.1429 18.5H6.14285L2.14285 22.5ZM5.29285 16.5H20.1429V4.5H4.14285V17.625L5.29285 16.5Z" fill="#888888"/>
                        </g>
                    </svg>
                </Link>
                <Link to="/profile">
                    <svg id="profile-svg" className="mySvg" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="user">
                            <path id="Vector" d="M20.1429 21.5V19.5C20.1429 18.4391 19.7214 17.4217 18.9713 16.6716C18.2211 15.9214 17.2037 15.5 16.1429 15.5H8.14285C7.08199 15.5 6.06457 15.9214 5.31443 16.6716C4.56428 17.4217 4.14285 18.4391 4.14285 19.5V21.5" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path id="Vector_2" d="M12.1429 11.5C14.352 11.5 16.1429 9.70914 16.1429 7.5C16.1429 5.29086 14.352 3.5 12.1429 3.5C9.93371 3.5 8.14285 5.29086 8.14285 7.5C8.14285 9.70914 9.93371 11.5 12.1429 11.5Z" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default NotificationPage;
