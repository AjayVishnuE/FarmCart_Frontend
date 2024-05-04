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
            <Navbar />
        </div>
    );
}

export default NotificationPage;
