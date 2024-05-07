    import React, { useState, useEffect } from 'react';
import { Header, Loader, Navbar} from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import ordercart from '../../Images/ordercart.svg';
import wishlist from '../../Images/wishlist.png';
import crown from '../../Images/crown.svg';
import edit from '../../Images/edit_icon.png';
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
    }, [accessToken]); 

    if (isLoading) return <Loader/>;
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
        <div className='Profile-overall-component12'>
            <Header/>
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

                <div className="profile-btns12">
                    <div className="Group97">
                        <div className="button-box" />
                        <Link to= "/orders">
                            <div className="Frame48096276">
                                <img className='vector' src={ordercart} alt="cart"/>
                                <div className="Orders">Orders</div>
                            </div>
                        </Link>
                    </div>
                    <div className="Group98">
                        <div className="button-box" />
                        <Link to="/wishlist">
                            <div className="Frame48096277">
                                <img className='vector' src={wishlist} alt="heart"/>
                                <div className="Wishlist">Wishlist</div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='explorebtncontainer-user'>
                    <div className='explorebtn-user'>
                        <img className='editpremlogo' src={edit} alt="edit"/>
                        <div className='explore'>
                            <Link style={{color:"white"}} to="/profileedit">
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                    <div className="explorebtn-user">
                        <img className='editpremlogo' src={crown} alt="crown"></img>
                        <div className='explore'>
                            Farm Cart Premium
                        </div>
                    </div>
                </div>

                <div className='recent-order12'>
                Recent Order
                </div>
                {profileData.orders.slice(0, 1).map((item,index)=>
                    <div className="order-box-1-profile12">
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
                <div className='logoutbtncont'>
                    <button onClick={confirmLogout} className='logoutbtn12'>Logout</button>
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
            </div>
            <div className='navbar-container'>
      <Link to="/dashboard">
        
      <svg className="mySvg"  id="dashboard-svg" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="mypath" d="M14.5958 1.55415C14.3052 1.26357 13.911 1.10033 13.5 1.10033C13.089 1.10033 12.6948 1.26357 12.4041 1.55415L1.55414 12.4042C1.27179 12.6965 1.11556 13.088 1.11909 13.4944C1.12263 13.9008 1.28564 14.2896 1.57302 14.577C1.8604 14.8644 2.24916 15.0274 2.65557 15.0309C3.06197 15.0344 3.45351 14.8782 3.74584 14.5959L4.19999 14.1417V24.35C4.19999 24.7611 4.36329 25.1553 4.65397 25.446C4.94466 25.7367 5.3389 25.9 5.74999 25.9H8.84999C9.26108 25.9 9.65532 25.7367 9.946 25.446C10.2367 25.1553 10.4 24.7611 10.4 24.35V21.25C10.4 20.8389 10.5633 20.4447 10.854 20.154C11.1447 19.8633 11.5389 19.7 11.95 19.7H15.05C15.4611 19.7 15.8553 19.8633 16.146 20.154C16.4367 20.4447 16.6 20.8389 16.6 21.25V24.35C16.6 24.7611 16.7633 25.1553 17.054 25.446C17.3447 25.7367 17.7389 25.9 18.15 25.9H21.25C21.6611 25.9 22.0553 25.7367 22.346 25.446C22.6367 25.1553 22.8 24.7611 22.8 24.35V14.1417L23.2541 14.5959C23.5465 14.8782 23.938 15.0344 24.3444 15.0309C24.7508 15.0274 25.1396 14.8644 25.427 14.577C25.7143 14.2896 25.8774 13.9008 25.8809 13.4944C25.8844 13.088 25.7282 12.6965 25.4458 12.4042L14.5958 1.55415V1.55415Z" stroke="#888888" stroke-width="2"/>
      </svg>
        
      </Link>

      <Link to="/notification">
      <svg id="notification-svg" className="mySvg" width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="Vector" d="M2.64214 19.3564L2.67143 19.3271V19.2857V11.5714C2.67143 7.62994 5.21382 4.1974 9.02874 3.05293L9.1 3.03155V2.95714V2.57143C9.1 1.21237 10.2124 0.1 11.5714 0.1C12.9305 0.1 14.0429 1.21237 14.0429 2.57143V2.95714V3.03155L14.1141 3.05293C17.929 4.1974 20.4714 7.62994 20.4714 11.5714V19.2857V19.3271L20.5007 19.3564L23.0429 21.8986V23.0429H0.1V21.8986L2.64214 19.3564ZM5.04286 20.5714V20.6714H5.14286H18H18.1V20.5714V11.5714C18.1 7.9162 15.2267 5.04286 11.5714 5.04286C7.9162 5.04286 5.04286 7.9162 5.04286 11.5714V20.5714ZM14.0408 24.5286C13.9879 25.8418 12.897 26.9 11.5714 26.9C10.2459 26.9 9.15497 25.8418 9.10201 24.5286H14.0408Z" fill="#888888" stroke="white" stroke-width="0.2"/>
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
        <svg id="profile-svg" className="mySvg" width="25" height="25" viewBox="0 0 25 25" fill="#7519EB" xmlns="http://www.w3.org/2000/svg">
        <g id="user">
          <path id="Vector" d="M20.1429 21.5V19.5C20.1429 18.4391 19.7214 17.4217 18.9713 16.6716C18.2211 15.9214 17.2037 15.5 16.1429 15.5H8.14285C7.08199 15.5 6.06457 15.9214 5.31443 16.6716C4.56428 17.4217 4.14285 18.4391 4.14285 19.5V21.5" stroke="#7519EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path id="Vector_2" d="M12.1429 11.5C14.352 11.5 16.1429 9.70914 16.1429 7.5C16.1429 5.29086 14.352 3.5 12.1429 3.5C9.93371 3.5 8.14285 5.29086 8.14285 7.5C8.14285 9.70914 9.93371 11.5 12.1429 11.5Z" stroke="#7519EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
       
        </Link>
     
      
        
      
    </div>
        </div>
    );
}

export default ProfilePage;