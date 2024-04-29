import React, { useState, useEffect } from "react";
import "./farmer-dashboard.css";
import "./farmer-dashboard.css";
import axios from 'axios';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';

import bar from "../../Images/Bar.png";
import { Link } from "react-router-dom";
import Saleschart from "../../components/SalesChart/Saleschart";
import lemon from '../../Images/lemon.png';
import Farmer_navbar from "../../components/Farmer-Navbar/FarmerNavbar";
import { FarmerHeader } from "../../components";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function FarmerDash() {
  const handleSvgClick = (event) => {
    const svg = event.target.closest(".mySvg");
    if (!svg) return;
    const paths = svg.querySelectorAll("path");
    paths.forEach((path) => {
      path.setAttribute("fill", "#7519EB");
      path.setAttribute("stroke", "#7519EB");
    });
  };

  const [userData, setUserData] = useState({ username: '', otherData: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.farmdash}data/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
          },
        });
        const data = response.data;
        data.username = capitalizeFirstLetter(data.username || '');
        setUserData(data); 
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Fetching data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); 
  console.log(userData)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
    return (
      <div className="overall-farmer-dashboard">
        <div className="farmer-dashboard">
        <FarmerHeader/>
        <h1 className="farmgoodmorni">Good Morning,</h1>
        <h2 className="username">{userData.username} !</h2>
        <div className="dash-box">
          <div className="buttonbox1">
            <div className="orderno">{userData.num_recent_orders}</div>
            <div className="ordertitle">Orders today</div>
          </div>
          <div className="buttonbox2">
            <div className="totalorder">{userData.total_orders}</div>
            <div className="ordertitle">Total orders</div>
          </div>
        </div>
        <Link to="/farmerproductlist">
          <div className="exploreproduct">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
            >
              <path
                d="M0.727273 0.227326C0.534388 0.227326 0.349403 0.303949 0.213013 0.440339C0.0766231 0.576729 0 0.761714 0 0.954598C0 1.14748 0.0766231 1.33247 0.213013 1.46886C0.349403 1.60525 0.534388 1.68187 0.727273 1.68187H2.34182L4.25018 9.31823C4.41236 9.96551 4.992 10.4091 5.65891 10.4091H14.728C15.3847 10.4091 15.9425 9.97278 16.1149 9.34005L18 2.40914H16.4771L14.7273 8.9546H5.65818L3.75055 1.31823C3.67174 1.00495 3.49009 0.727164 3.23468 0.529372C2.97926 0.33158 2.66486 0.22522 2.34182 0.227326H0.727273ZM13.8182 10.4091C12.6218 10.4091 11.6364 11.3946 11.6364 12.591C11.6364 13.7873 12.6218 14.7728 13.8182 14.7728C15.0145 14.7728 16 13.7873 16 12.591C16 11.3946 15.0145 10.4091 13.8182 10.4091ZM7.27273 10.4091C6.07636 10.4091 5.09091 11.3946 5.09091 12.591C5.09091 13.7873 6.07636 14.7728 7.27273 14.7728C8.46909 14.7728 9.45455 13.7873 9.45455 12.591C9.45455 11.3946 8.46909 10.4091 7.27273 10.4091ZM9.45455 0.227326V3.86369H7.27273L10.1818 6.77278L13.0909 3.86369H10.9091V0.227326H9.45455ZM7.27273 11.8637C7.68291 11.8637 8 12.1808 8 12.591C8 13.0011 7.68291 13.3182 7.27273 13.3182C6.86255 13.3182 6.54545 13.0011 6.54545 12.591C6.54545 12.1808 6.86255 11.8637 7.27273 11.8637ZM13.8182 11.8637C14.2284 11.8637 14.5455 12.1808 14.5455 12.591C14.5455 13.0011 14.2284 13.3182 13.8182 13.3182C13.408 13.3182 13.0909 13.0011 13.0909 12.591C13.0909 12.1808 13.408 11.8637 13.8182 11.8637Z"
                fill="white"
              />
            </svg>
            <div className="explorepro">View my products</div>
          </div>
        </Link>
        <div className="topproduct">Top selling product</div>
        <div className="topselling">
          <div className="topsellname">{userData.top_sold_product.product_name}</div>
          <div className="topsellpercent">+{userData.top_sold_product.sold_quantity}</div>
          
        </div>
        <Saleschart 
          sold_products = {userData.sold_products}
        />
  
        <div className="Statistics">Statistics</div>
        {userData.product_details.map((item,index)=>
          <div className="statibox">
              <img src={API_ENDPOINTS.media + item.product_image} alt={item.product_name}></img>
              <div className="Statitextout">
                <div className="Frame19995">
                  <div className="fruitname">{item.product_name}</div>
                  <div className="RJFarms">{item.farms}</div>
                </div>
                <div className="Frame19994">
                  <div className="Kg">
                    <span className="Weight">{item.quantity}</span>
                    <span className="Unit">kg</span>
                  </div>
                  <div className="Left">left</div>
                </div>
              </div>
          </div>
        )}

  
  
  
  
  
  
      </div>
      <div className='fnavbar-container' onClick={handleSvgClick}>
          <Link to='/farmerdashboard'>
        <svg c  id="farmdash-svg" className="mySvg" width="27" height="27" viewBox="0 0 27 27" fill="#7519EB" stroke='#7519EB' xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5958 1.55415C14.3052 1.26357 13.911 1.10033 13.5 1.10033C13.089 1.10033 12.6948 1.26357 12.4041 1.55415L1.55414 12.4042C1.27179 12.6965 1.11556 13.088 1.11909 13.4944C1.12263 13.9008 1.28564 14.2896 1.57302 14.577C1.8604 14.8644 2.24916 15.0274 2.65557 15.0309C3.06197 15.0344 3.45351 14.8782 3.74584 14.5959L4.19999 14.1417V24.35C4.19999 24.7611 4.36329 25.1553 4.65397 25.446C4.94466 25.7367 5.3389 25.9 5.74999 25.9H8.84999C9.26108 25.9 9.65532 25.7367 9.946 25.446C10.2367 25.1553 10.4 24.7611 10.4 24.35V21.25C10.4 20.8389 10.5633 20.4447 10.854 20.154C11.1447 19.8633 11.5389 19.7 11.95 19.7H15.05C15.4611 19.7 15.8553 19.8633 16.146 20.154C16.4367 20.4447 16.6 20.8389 16.6 21.25V24.35C16.6 24.7611 16.7633 25.1553 17.054 25.446C17.3447 25.7367 17.7389 25.9 18.15 25.9H21.25C21.6611 25.9 22.0553 25.7367 22.346 25.446C22.6367 25.1553 22.8 24.7611 22.8 24.35V14.1417L23.2541 14.5959C23.5465 14.8782 23.938 15.0344 24.3444 15.0309C24.7508 15.0274 25.1396 14.8644 25.427 14.577C25.7143 14.2896 25.8774 13.9008 25.8809 13.4944C25.8844 13.088 25.7282 12.6965 25.4458 12.4042L14.5958 1.55415V1.55415Z" stroke="#7519EB" stroke-width="2"/>
      </svg>
      </Link>
      <Link to='/addproduct'>
      <svg id="products-svg" className="mySvg" xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
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
        <svg id="profile-svg" className="mySvg" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="user">
          <path id="Vector" d="M20.1429 21.5V19.5C20.1429 18.4391 19.7214 17.4217 18.9713 16.6716C18.2211 15.9214 17.2037 15.5 16.1429 15.5H8.14285C7.08199 15.5 6.06457 15.9214 5.31443 16.6716C4.56428 17.4217 4.14285 18.4391 4.14285 19.5V21.5" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path id="Vector_2" d="M12.1429 11.5C14.352 11.5 16.1429 9.70914 16.1429 7.5C16.1429 5.29086 14.352 3.5 12.1429 3.5C9.93371 3.5 8.14285 5.29086 8.14285 7.5C8.14285 9.70914 9.93371 11.5 12.1429 11.5Z" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg></Link>
            
        </div>
      </div>
    )
}

export default FarmerDash
