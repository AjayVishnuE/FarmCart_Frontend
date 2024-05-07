import axios from 'axios';
import React , { useState, useEffect } from 'react';
import './FarmerNotification.css';
import { FarmerHeader, FarmerNavbar, Loader} from '../../components';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import { Link } from 'react-router-dom';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';

function FarmerNotification(props) {

    const [notifications, setNotifications] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
    const [loading, setLoading] = useState(true);

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
            }finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);
    if (loading) return <Loader/>;
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
            <FarmerHeader/>
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
    <FarmerNavbar/>
    </div>
    );
}

export default FarmerNotification;