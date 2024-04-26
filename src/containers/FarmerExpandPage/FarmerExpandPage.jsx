import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FarmerNavbar, Header, Navbar } from '../../components';
import './Farmerexpandpage.css';
import { Rating } from 'react-simple-star-rating';
import product from '../../Images/product.png';
import farmer from '../../Images/user (color).svg';
import bar from "../../Images/Bar.png";
import { Link, useParams, } from "react-router-dom";
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  


function FarmerExpandPage() {
    // Counter
    const [counter, setCounter] = useState(1); 
    const increase = () => setCounter(prevCount => prevCount + 1);
    const decrease = () => setCounter(prevCount => prevCount > 1 ? prevCount - 1 : 1);

    // Rating Component
    const [rating, setRating] = useState(0)

    //Backend Integration
    const { product_id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
      if (!product_id) {
        setError('Product ID not provided.');
        setLoading(false);
        return;
      }
  
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`${API_ENDPOINTS.product}/prod-details/${product_id}`);
          setProductDetails(response.data);
        } catch (error) {
          setError('Error fetching product details');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProductDetails();
    }, [product_id]);
    console.log(productDetails)
    if (loading) {
        return <div className=''>Loading.....</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!productDetails) {
        return <div>Product not found.</div>;
    }
    return (
        <div className='expand-overall-container'>
        <div className="header1" >
        <img className="logoimage" src={bar} alt="bars" />
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

            <div className='product-container'>
          <div className='product-details-box'>
            <div className='productbox'>
              <div className='product-name'>
                {productDetails.product_name}
              </div>
              <div className='titleboxfarm'>Price (/kg)</div>
              <div className='price'>INR {productDetails.price}</div>
              <div className="titleboxfarm">
                <span className="ColorText">Stock left <br></br>{productDetails.quantity}</span>
                <span className="ColorTextSmall">(in kgs)</span>
            </div>
                        
                <div className='quantity-entry'>
                  <div className="btn__container">
                    <button type="button" onClick={decrease} disabled={counter <= 1}>-</button>
                    <input 
                        type="number" 
                        value={counter} 
                        readOnly
                    />
                    <button type="button" onClick={increase}>+</button>
                  </div>
                </div>
            </div>
          
          <img className="images3" src={productDetails.product_image} alt="hoho" />
          </div>
       
          
        </div>
        <div className='reviewpopdiv'>
        <div className='reviewtitle'>Product Reviews</div>
        {productDetails.reviews.map((item,index)=>
        <div className='farmdetailsdesc'>
            <div className='reviewname'>
                <img className='farmer-user-image' src={API_ENDPOINTS.media + item.reviewer.user_image} alt={item.reviewer.username} />
                <div className='reviewname'>{item.reviewer.username}</div>
            </div>
            <div className='reviewdesc'>
                <Rating className='rating'
                initialValue={item.rating}
                onClick={function noRefCheck(){}}
                readonly
                size={22}
                allowFraction
                fillColor={'#FF7A00'}
                showTooltip
                tooltipStyle={{
                    'background-color': 'white',
                    color: 'transparent'
                    }}
                />
                <div className='review'>
                {item.comment}
                </div>
            </div>
        </div>
        )}

        </div>
        <FarmerNavbar/>
        </div>
    );
}

export default FarmerExpandPage;