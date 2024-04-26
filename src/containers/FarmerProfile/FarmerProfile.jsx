import React, { useState, useEffect } from 'react';
import { FarmerNavbar, Header, Navbar} from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import './FarmerProfile.css';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';
import ordercart from '../../Images/ordercart.svg';
import wishlist from '../../Images/wishlist.png';
import crown from '../../Images/crown.svg';
import intransit from '../../Images/wpf_in-transit.svg';
import delievered from '../../Images/package-delivered.svg';


function FarmerProfile(props) {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('accessToken'); 
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.profile}farmerprofile/`, {
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

                <div className="explorebtn">
                    <img src={crown} alt="crown"></img>
                    <div className='explore'>
                    Explore Farm Cart Premium
                    </div>
                </div>
                <div className='farmerseccontainer'>
                    <Link to ='/farmeradddetails'>
                        <div className='farmdetailsbtn'>
                            Add/ Edit Your Farm Details.<br/><lable style={{"fontSize":"small"}}>Without Farmer Details your products wont be verified</lable>
                        </div>
                    </Link>
                    <div className='flexdivfarmprofile'>
                        <div className='btninprofile'>
                            <svg className='svgclass' xmlns="http://www.w3.org/2000/svg" width="44" height="41" viewBox="0 0 44 41" fill="none">
                                <path d="M15.3619 41L11.6524 34.7524L4.6238 33.1905L5.30714 25.9667L0.523804 20.5L5.30714 15.0333L4.6238 7.80952L11.6524 6.24762L15.3619 0L22 2.83095L28.6381 0L32.3476 6.24762L39.3762 7.80952L38.6929 15.0333L43.4762 20.5L38.6929 25.9667L39.3762 33.1905L32.3476 34.7524L28.6381 41L22 38.169L15.3619 41ZM19.95 27.431L30.9809 16.4L28.2476 13.569L19.95 21.8667L15.7524 17.7667L13.019 20.5L19.95 27.431Z" fill="#00A0FA"/>
                            </svg>
                            <p style={{textAlign:"center"}}>Apply for farmer verification</p>
                        </div>
                        <div className='btninprofile'>
                            <svg className='svgclass' xmlns="http://www.w3.org/2000/svg" width="35" height="29" viewBox="0 0 35 29" fill="none">
                                <path d="M34.4159 13.291C34.4171 11.9035 34.077 10.5369 33.4255 9.31174C32.7739 8.08663 31.8309 7.04064 30.6797 6.26599C29.5285 5.49134 28.2043 5.01183 26.824 4.86974C25.4437 4.72765 24.0497 4.92734 22.7648 5.45121C21.4798 5.97508 20.3436 6.80703 19.4561 7.87371C18.5686 8.94039 17.9572 10.209 17.6758 11.5678C17.3943 12.9266 17.4515 14.3337 17.8423 15.6651C18.2331 16.9966 18.9454 18.2114 19.9165 19.2025V27.7904C19.9164 27.9964 19.9689 28.1991 20.0692 28.3791C20.1695 28.5592 20.3141 28.7106 20.4894 28.8189C20.6646 28.9273 20.8647 28.989 21.0706 28.9983C21.2764 29.0075 21.4812 28.964 21.6655 28.8718L25.9579 26.7241L30.2503 28.8718C30.4346 28.964 30.6394 29.0075 30.8453 28.9983C31.0511 28.989 31.2512 28.9273 31.4265 28.8189C31.6017 28.7106 31.7464 28.5592 31.8466 28.3791C31.9469 28.1991 31.9995 27.9964 31.9993 27.7904V19.2025C33.549 17.6253 34.4169 15.5022 34.4159 13.291ZM25.9579 7.24966C27.1528 7.24966 28.3208 7.60398 29.3143 8.26782C30.3078 8.93165 31.0822 9.87519 31.5394 10.9791C31.9967 12.083 32.1163 13.2977 31.8832 14.4697C31.6501 15.6416 31.0747 16.718 30.2298 17.563C29.3849 18.4079 28.3085 18.9832 27.1365 19.2163C25.9646 19.4495 24.7499 19.3298 23.646 18.8726C22.5421 18.4153 21.5985 17.641 20.9347 16.6475C20.2709 15.654 19.9165 14.4859 19.9165 13.291C19.9165 11.6888 20.553 10.1521 21.686 9.01914C22.819 7.88616 24.3556 7.24966 25.9579 7.24966ZM26.4986 24.2924C26.3308 24.2084 26.1456 24.1647 25.9579 24.1647C25.7702 24.1647 25.5851 24.2084 25.4172 24.2924L22.3331 25.836V20.9319C23.4658 21.4699 24.704 21.749 25.9579 21.749C27.2119 21.749 28.4501 21.4699 29.5828 20.9319V25.836L26.4986 24.2924ZM17.5 22.9573C17.5 23.2777 17.3727 23.585 17.1461 23.8116C16.9195 24.0382 16.6122 24.1655 16.2917 24.1655H3.00066C2.35975 24.1655 1.74509 23.9109 1.2919 23.4577C0.838707 23.0046 0.584106 22.3899 0.584106 21.749V2.41655C0.584106 1.77564 0.838707 1.16098 1.2919 0.707792C1.74509 0.2546 2.35975 0 3.00066 0H29.5828C30.2237 0 30.8383 0.2546 31.2915 0.707792C31.7447 1.16098 31.9993 1.77564 31.9993 2.41655C31.9993 2.73701 31.872 3.04434 31.6454 3.27093C31.4188 3.49753 31.1115 3.62483 30.791 3.62483C30.4706 3.62483 30.1632 3.49753 29.9366 3.27093C29.7101 3.04434 29.5828 2.73701 29.5828 2.41655H3.00066V21.749H16.2917C16.6122 21.749 16.9195 21.8763 17.1461 22.1029C17.3727 22.3295 17.5 22.6368 17.5 22.9573ZM15.0834 14.4993C15.0834 14.8198 14.9561 15.1271 14.7295 15.3537C14.5029 15.5803 14.1956 15.7076 13.8752 15.7076H7.83377C7.51331 15.7076 7.20598 15.5803 6.97939 15.3537C6.75279 15.1271 6.62549 14.8198 6.62549 14.4993C6.62549 14.1789 6.75279 13.8715 6.97939 13.6449C7.20598 13.4183 7.51331 13.291 7.83377 13.291H13.8752C14.1956 13.291 14.5029 13.4183 14.7295 13.6449C14.9561 13.8715 15.0834 14.1789 15.0834 14.4993ZM15.0834 9.66621C15.0834 9.98667 14.9561 10.294 14.7295 10.5206C14.5029 10.7472 14.1956 10.8745 13.8752 10.8745H7.83377C7.51331 10.8745 7.20598 10.7472 6.97939 10.5206C6.75279 10.294 6.62549 9.98667 6.62549 9.66621C6.62549 9.34576 6.75279 9.03843 6.97939 8.81183C7.20598 8.58524 7.51331 8.45794 7.83377 8.45794H13.8752C14.1956 8.45794 14.5029 8.58524 14.7295 8.81183C14.9561 9.03843 15.0834 9.34576 15.0834 9.66621Z" fill="#555555"/>
                            </svg>
                            <p style={{textAlign:"center"}}>Apply for crop certification</p>
                        </div>
                    </div>
                </div>
                <div className='recentorderviewallcontainer'>
                    <div className='recent-order'>Recent Order</div>
                    <div><Link to="/farmerorders">view all</Link></div>
                </div>
                {profileData.user_orders.slice(0, 1).map((item,index)=>
                    <div className="order-box-1">
                        {item.custom_order_details.map((orderitem,index)=>
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
            </div>
            <FarmerNavbar/>
        </div>
    );
}

export default FarmerProfile;