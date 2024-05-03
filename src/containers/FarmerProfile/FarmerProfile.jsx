import React, { useState, useEffect } from 'react';
import { FarmerHeader, FarmerNavbar, Header, Navbar} from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import './FarmerProfile.css';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';
import edit from '../../Images/edit_icon.png';
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
            <FarmerHeader/>
            <div className='profile-container-farmer'>
                <div className='profile-box-farmer'>
                    <div className="pic">
                        <img className="ellipse-farmer" alt={profileData.username} src={API_ENDPOINTS.media + profileData.user_image} />
                    </div>
                    <div className='profile-about'>
                        <p className='profile-name'>{profileData.username}</p>
                        <p className='profile-email'>{profileData.email}</p>
                    </div>
                </div>
                <div className='explorebtncontainer'>
                    <div className='explorebtn'>
                        <img className='editpremlogo' src={edit} alt="edit"/>
                        <div className='explore'>
                            <Link style={{color:"white"}} to="/profileedit">
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                    <div className="explorebtn">
                        <img className='editpremlogo' src={crown} alt="crown"></img>
                        <div className='explore'>
                            Farm Cart Premium
                        </div>
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
                    <div  className='viewname'><Link to="/farmerorders">view all</Link></div>
                </div>
                {profileData.user_orders.slice(0, 1).map((item,index)=>
                    <div className="order-box-1">
                        {item.custom_order_details.map((orderitem,index)=>
                            <div className='order-box-1-item-profile'>
                                <div className='order-left'>
                                        <img className='order1-pic' src={API_ENDPOINTS.media + orderitem.product_details.product_image} alt="lemonpic"></img>
                                </div>
                                <div className='order-right'>
                                    <div className="leftdiv-profile">
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
                    <div className='orderstatus-profile'>
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
            <div className='fnavbar-container' >
          <Link to='/farmerdashboard'>
        <svg c  id="farmdash-svg" className="mySvg" width="27" height="27" viewBox="0 0 27 27" fill="none" stroke='none' xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5958 1.55415C14.3052 1.26357 13.911 1.10033 13.5 1.10033C13.089 1.10033 12.6948 1.26357 12.4041 1.55415L1.55414 12.4042C1.27179 12.6965 1.11556 13.088 1.11909 13.4944C1.12263 13.9008 1.28564 14.2896 1.57302 14.577C1.8604 14.8644 2.24916 15.0274 2.65557 15.0309C3.06197 15.0344 3.45351 14.8782 3.74584 14.5959L4.19999 14.1417V24.35C4.19999 24.7611 4.36329 25.1553 4.65397 25.446C4.94466 25.7367 5.3389 25.9 5.74999 25.9H8.84999C9.26108 25.9 9.65532 25.7367 9.946 25.446C10.2367 25.1553 10.4 24.7611 10.4 24.35V21.25C10.4 20.8389 10.5633 20.4447 10.854 20.154C11.1447 19.8633 11.5389 19.7 11.95 19.7H15.05C15.4611 19.7 15.8553 19.8633 16.146 20.154C16.4367 20.4447 16.6 20.8389 16.6 21.25V24.35C16.6 24.7611 16.7633 25.1553 17.054 25.446C17.3447 25.7367 17.7389 25.9 18.15 25.9H21.25C21.6611 25.9 22.0553 25.7367 22.346 25.446C22.6367 25.1553 22.8 24.7611 22.8 24.35V14.1417L23.2541 14.5959C23.5465 14.8782 23.938 15.0344 24.3444 15.0309C24.7508 15.0274 25.1396 14.8644 25.427 14.577C25.7143 14.2896 25.8774 13.9008 25.8809 13.4944C25.8844 13.088 25.7282 12.6965 25.4458 12.4042L14.5958 1.55415V1.55415Z" stroke="#888888" stroke-width="2"/>
      </svg>
      </Link>
      <Link to='/addproduct'>
      <svg id="products-svg" className="mySvg" xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="#888888">
        <path d="M2.57141 5.50001H11.0214H10.5714H10.9214H2.57141ZM2.97141 3.50001H16.1714L15.3214 2.50001H3.82141L2.97141 3.50001ZM7.57141 10.25L9.57141 9.25001L11.5714 10.25V5.50001H7.57141V10.25ZM12.1214 18.5H2.57141C2.02141 18.5 1.55074 18.3043 1.15941 17.913C0.768078 17.5217 0.572078 17.0507 0.571411 16.5V4.02501C0.571411 3.79167 0.609078 3.56667 0.684411 3.35001C0.759744 3.13334 0.872078 2.93334 1.02141 2.75001L2.27141 1.22501C2.45474 0.991672 2.68374 0.812339 2.95841 0.687005C3.23308 0.561672 3.52074 0.499339 3.82141 0.500005H15.3214C15.6214 0.500005 15.9091 0.562672 16.1844 0.688005C16.4597 0.813339 16.6887 0.992339 16.8714 1.22501L18.1214 2.75001C18.2714 2.93334 18.3841 3.13334 18.4594 3.35001C18.5347 3.56667 18.5721 3.79167 18.5714 4.02501V8.92501C18.2547 8.80834 17.9297 8.71667 17.5964 8.65001C17.2631 8.58334 16.9214 8.55001 16.5714 8.55001V5.50001H13.5714V9.32501C12.9881 9.65834 12.4797 10.071 12.0464 10.563C11.6131 11.055 11.2714 11.609 11.0214 12.225L9.57141 11.5L5.57141 13.5V5.50001H2.57141V16.5H10.9214C11.0547 16.8833 11.2214 17.2417 11.4214 17.575C11.6214 17.9083 11.8547 18.2167 12.1214 18.5ZM15.5714 18.5V15.5H12.5714V13.5H15.5714V10.5H17.5714V13.5H20.5714V15.5H17.5714V18.5H15.5714Z" fill="#888888"/>
        </svg>
        </Link>
        <Link to='/farmerchat'>
        <svg id="chat-svg" className="mySvg" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="material-symbols:chat-outline">
          <path id="Vector" d="M6.14285 14.5H14.1429V12.5H6.14285V14.5ZM6.14285 11.5H18.1429V9.5H6.14285V11.5ZM6.14285 8.5H18.1429V6.5H6.14285V8.5ZM2.14285 22.5V4.5C2.14285 3.95 2.33885 3.47933 2.73085 3.088C3.12285 2.69667 3.59352 2.50067 4.14285 2.5H20.1429C20.6929 2.5 21.1639 2.696 21.5559 3.088C21.9479 3.48 22.1435 3.95067 22.1429 4.5V16.5C22.1429 17.05 21.9472 17.521 21.5559 17.913C21.1645 18.305 20.6935 18.5007 20.1429 18.5H6.14285L2.14285 22.5ZM5.29285 16.5H20.1429V4.5H4.14285V17.625L5.29285 16.5Z" fill="#888888"/>
          </g>
        </svg>
        </Link>
         <Link to='/farmerprofile'>
         
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

export default FarmerProfile;