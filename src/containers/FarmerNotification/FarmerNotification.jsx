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
            <div className="header156">
                <img className="logoimagelogo3" src={bar} alt="bars" />
                <Link className='notiimagecontainer' to="/farmernotification">
                    <svg className="notiimage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 24" fill="none">
                    <path d="M21.1428 19.4286V20.5714H0.571411V19.4286L2.85713 17.1429V10.2857C2.85713 6.74286 5.17712 3.62286 8.57141 2.61714V2.28571C8.57141 1.67951 8.81223 1.09812 9.24088 0.66947C9.66954 0.240816 10.2509 0 10.8571 0C11.4633 0 12.0447 0.240816 12.4734 0.66947C12.902 1.09812 13.1428 1.67951 13.1428 2.28571V2.61714C16.5371 3.62286 18.8571 6.74286 18.8571 10.2857V17.1429L21.1428 19.4286ZM13.1428 21.7143C13.1428 22.3205 12.902 22.9019 12.4734 23.3305C12.0447 23.7592 11.4633 24 10.8571 24C10.2509 24 9.66954 23.7592 9.24088 23.3305C8.81223 22.9019 8.57141 22.3205 8.57141 21.7143" fill="#7519EB"/>
                    </svg>
                </Link>
            </div>
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