import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FarmerHeader, FarmerNavbar, Loader} from '../../components';
import './Farmerexpandpage.css';
import { Rating } from 'react-simple-star-rating';
import bar from "../../Images/Bar.png";
import { Link, useParams, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const deleteProduct = async () => {
      try {
          const response = await axios.delete(`${API_ENDPOINTS.product}/seller-crud/${product_id}/`, {
              headers: {
                  'Authorization': `Bearer ${accessToken}`
              }
          });

          console.log('Product deleted:', response.data);
          // Handle the post-delete logic here (e.g., redirect or state update)
      } catch (error) {
          console.error('Error deleting product:', error.response ? error.response.data : error);
      }
    };

    const handleDeleteClick = () => {
      setShowConfirmationPopup(true);
    };

    const handleConfirmDelete = () => {
        deleteProduct();
        setShowConfirmationPopup(false);
        navigate('/farmerproductlist')
    };

    const handleCancelDelete = () => {
        setShowConfirmationPopup(false); 
    };

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
        return <Loader/>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!productDetails) {
        return <div>Product not found.</div>;
    }
    return (
        <div className='expand-overall-container'>
          <FarmerHeader/>
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
                        
                {/* <div className='quantity-entry'>
                  <div className="btn__container">
                    <button type="button" onClick={decrease} disabled={counter <= 1}>-</button>
                    <input 
                        type="number" 
                        value={counter} 
                        readOnly
                    />
                    <button type="button" onClick={increase}>+</button>
                  </div>
                </div> */}
            </div>
          
          <img className="images3" src={productDetails.product_image} alt="hoho" />
          </div>
          <div className='buttondiv'>
          <div className='editproductbutton'>
          <Link style={{color:"white"}} to={`/productsedit/${product_id}`}>
              Edit the Product Details
          </Link>
          </div>
          <div className="deleteproductbutton" onClick={handleDeleteClick}>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
          <circle cx="9.5" cy="9.5" r="9.5" fill="#FF4343"/>
          <path d="M12.6667 6.3335L6.33334 12.6668" stroke="white" stroke-width="1.40741" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.33334 6.3335L12.6667 12.6668" stroke="white" stroke-width="1.40741" stroke-linecap="round" stroke-linejoin="round"/>
          </svg> */}Delete
        </div>
        {showConfirmationPopup && (
                <div className='confirmation-popup'>
                  <div className="modal-content">
                    <p>Are you sure you want to delete this product?</p>
                    <button onClick={handleConfirmDelete}>Confirm</button>
                    <button onClick={handleCancelDelete}>Cancel</button>
                  </div>
                </div>

            )}
            </div>

        
          
        </div>
        
        <div className='reviewpopdiv'>
        <div className='reviewtitle'>Product Reviews</div>
        {productDetails.reviews.length > 0 ? (
          productDetails.reviews.map((item,index)=>
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
            )
        ) : (
          <div className='no-reviews'>No reviews yet.</div>
        )}
      

        </div>
        
        
       
        <FarmerNavbar/>
      </div>
    );
}

export default FarmerExpandPage;