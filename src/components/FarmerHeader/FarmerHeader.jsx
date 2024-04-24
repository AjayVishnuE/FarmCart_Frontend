import React from 'react'
import bar from "../../Images/Bar.png";
import { Link } from 'react-router-dom';
import './Farmerheader.css'

function FarmerHeader() {
    const handleSvgClick = (event) => {
        const svg = event.target.closest(".mySvg");
        if (!svg) return;
        const paths = svg.querySelectorAll("path");
        paths.forEach((path) => {
          path.setAttribute("fill", "#7519EB");
          path.setAttribute("stroke", "#7519EB");
        });
      };
  return (
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
  )
}

export default FarmerHeader
