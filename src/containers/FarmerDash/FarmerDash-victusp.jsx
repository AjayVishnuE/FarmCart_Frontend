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
import FarmerNavbar from "../../components/Farmer-Navbar/FarmerNavbar";

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
        <div className="header1" onClick={handleSvgClick}>
          <img className="images1" src={bar} alt="bars" />
          <Link to="/farmnotification">
            <svg
              id="notification-svg"
              className="mySvg"
              width="24"
              height="27"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M2.64214 19.3564L2.67143 19.3271V19.2857V11.5714C2.67143 7.62994 5.21382 4.1974 9.02874 3.05293L9.1 3.03155V2.95714V2.57143C9.1 1.21237 10.2124 0.1 11.5714 0.1C12.9305 0.1 14.0429 1.21237 14.0429 2.57143V2.95714V3.03155L14.1141 3.05293C17.929 4.1974 20.4714 7.62994 20.4714 11.5714V19.2857V19.3271L20.5007 19.3564L23.0429 21.8986V23.0429H0.1V21.8986L2.64214 19.3564ZM5.04286 20.5714V20.6714H5.14286H18H18.1V20.5714V11.5714C18.1 7.9162 15.2267 5.04286 11.5714 5.04286C7.9162 5.04286 5.04286 7.9162 5.04286 11.5714V20.5714ZM14.0408 24.5286C13.9879 25.8418 12.897 26.9 11.5714 26.9C10.2459 26.9 9.15497 25.8418 9.10201 24.5286H14.0408Z"
                fill="#7519EB"
                stroke="white"
                stroke-width="0.2"
              />
            </svg>
          </Link>
        </div>
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
      <FarmerNavbar/>
      </div>
    )
}

export default FarmerDash
