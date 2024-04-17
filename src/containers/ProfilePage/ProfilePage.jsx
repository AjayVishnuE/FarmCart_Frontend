import React, { useState, useEffect } from 'react';
import { Header, Navbar} from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';
import ordercart from '../../Images/ordercart.svg';
import wishlist from '../../Images/wishlist.png';
import crown from '../../Images/crown.svg';
import intransit from '../../Images/wpf_in-transit.svg';
import delievered from '../../Images/package-delivered.svg';


function ProfilePage(props) {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('accessToken'); 
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.profile}consumerprofile/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProfileData(data);

            } catch (error) {
                console.error('Error fetching consumer profile:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); 

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!profileData) return <div>No profile data found</div>;

    const handleLogout = async () => {
        localStorage.removeItem('accessToken');  
        try {
            await fetch(`${API_ENDPOINTS.users}/logout/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Logout failed', error);
        }
        navigate('/login');  
    };

    const confirmLogout = () => {
        setShowModal(true); 
    };

    const cancelLogout = () => {
        setShowModal(false); 
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'Placed':
                return { icon: intransit, text: 'Order Placed' };
            case 'Shipped':
                return { icon: intransit, text: 'In Transit' };
            case 'Delivered':
                return { icon: delievered, text: 'Delivered' };
            default:
                return { icon: delievered, text: 'Status Unknown' }; 
        }
    };
    return (
        <div className='Profile-overall-component'>
            <div className='header1'>
                <img className='images1' src={bar} alt="bars"/>
                <Link to="/cart">
                <img className='images1' src={cart} alt="cart"/>
                </Link>
            </div>
            <div className='profile-container'>
                <div className='profile-box'>
                    <div className="pic">
                        <img className="ellipse" alt={profileData.username} src={API_ENDPOINTS.media + profileData.user_image} />
                    </div>
                    <div className='profile-about'>
                        <p className='profile-name'>{profileData.username}</p>
                        <p className='profile-email'>{profileData.email}</p>
                    </div>
                </div>

                <div className="profile-btns">
                    <div className="Group97">
                        <div className="button-box" />
                            <div className="Frame48096276">
                            
                                <img className='vector' src={ordercart} alt="cart"/>
                                <div className="Orders">Orders</div>
                            </div>
                        </div>
                    <div className="Group98">
                        <div className="button-box" />
                        <div className="Frame48096277">
                        <img className='vector' src={wishlist} alt="heart"/>
                        <div className="Wishlist">Wishlist</div>
                        </div>
                    </div>
                </div>

                <div className="explorebtn">
                    <img src={crown} alt="crown"></img>
                    <div className='explore'>
                    Explore Farm Cart Premium
                    </div>
                </div>

                <div className='recent-order'>
                Recent orders
                </div>
                {profileData.orders.slice(0, 1).map((item,index)=>
                    <div className="order-box-1">
                        {item.order_details.map((orderitem,index)=>
                            <div className='order-box-1-item'>
                                <div className='order-left'>
                                        <img className='order1-pic' src={API_ENDPOINTS.media + orderitem.product_details.product_image} alt="lemonpic"></img>
                                </div>
                                <div className='order-right'>
                                    <div className="leftdiv">
                                        <div className="text-wrapper">{orderitem.product_details.product_name}</div>
                                        <div className="text-wrapper-2">INR {orderitem.product_details.price}</div>
                                    </div>
                                    <div className="element-wrapper">
                                        <p className="element">
                                        <span className="span">{orderitem.quantity}</span>
                                        <span className="text-wrapper-3">kg</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    <div className='orderstatus'>
                        <div className="statusframe">
                            <div className="status-wrapper">STATUS</div>
                            <img className="in-transit" alt="Wpf in transit" src={getStatusInfo(item.order_status).icon} />
                            <div className="transitdiv">{getStatusInfo(item.order_status).text}</div>
                        </div>
                        <div className='totalbox'>
                            <div className="rowContainerpro">
                                <div className="rowpro">
                                    <div className="labelpro">Order Price</div>
                                    <div className="pricevaluepro">₹ {item.total_price-20}</div>
                                </div>
                                <div className="rowpro">
                                    <div className="labelpro">Packing Charges</div>
                                    <div className="packvaluepro">₹ 20.00</div>
                                </div>
                            </div>
                            <div className="separator"></div>
                            <div className="row">
                                <div className="totalLabel">Total Amount</div>
                                <div className="totalValue">₹ {item.total_price}</div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                <div>
                    <button onClick={confirmLogout} className='logoutbtn'>Logout</button>
                    {showModal && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>Are you sure you want to log out?</h2>
                                <button onClick={handleLogout}>Yes</button>
                                <button onClick={cancelLogout}>No</button>
                            </div>
                        </div>
                    )}
                </div>
            <Navbar/>
            </div>
        </div>
    );
}

export default ProfilePage;