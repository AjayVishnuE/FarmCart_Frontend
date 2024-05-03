import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Navbar } from '../../components';
import { Rating } from 'react-simple-star-rating';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  

import './Expandpage.css';


function Expandpage() {
    // Counter
    const [counter, setCounter] = useState(1); // Set initial count to 1
    const increase = () => setCounter(prevCount => prevCount + 1);
    const decrease = () => setCounter(prevCount => prevCount > 1 ? prevCount - 1 : 1);

    // Rating Component
    const [rating, setRating] = useState(0)


    //Backend integration
    const { product_id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate(); 
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
      if (!product_id) {
        setError('Product ID not provided.');
        setLoading(false);
        return;
      }
  
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`${API_ENDPOINTS.productdetails}${product_id}`);
          setProductDetails(response.data);
        } catch (error) {
          setError('Error fetching product details');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProductDetails();
    }, [product_id]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
          setError('You must be logged in to add items to the cart.');
          return;
      }
      const product=product_id;
      try {
          await axios.post(
              `${API_ENDPOINTS.cart}/cart-crud/`,
              { product, quantity: counter },
              { headers: { Authorization: `Bearer ${accessToken}` } }
          );  
          navigate('/cart');  
      } catch (error) {
          setError(error.response?.data?.message || 'Failed to add to cart');
      }
    };

    const handleAddToWishlist = async () => {
      if (!accessToken) {
          setError('You must be logged in to add items to the wishlist.');
          return;
      }
      try {
          await axios.post(
              `${API_ENDPOINTS.wishlist}/wishlist-crud/`,
              { product: product_id },
              { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          navigate('/wishlist')
      } catch (error) {
          setError(error.response?.data?.message || 'Failed to add to wishlist');
      }
    };

    if (loading) {
      return <div className=''>Loading.....</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!productDetails) {
      return <div>Product not found.</div>;
    }
    const product_image_url = API_ENDPOINTS.media + productDetails.product_image;
    const farmer_image_url = API_ENDPOINTS.media + productDetails.seller_details.user_image;
    console.log(productDetails)

    return (
      <div className='expand-overall-container'>
        <Header/>
        <form onSubmit={handleSubmit}>
        <div className='product-container'>
          <div className='product-details-box'>
            <div className='productbox'>
              <div className='product-name'>
                {productDetails.product_name}
              </div>
              <div className='titlebox'>Price (/kg)</div>
              <div className='price'>INR {productDetails.price}</div>
              <div className='titlebox'>Quantity (in kgs)</div>
              
                <div className='quantity-entry'>
                  <div className="btn__container">
                    <button type="button" onClick={decrease}>-</button>
                    <input style={{width:"20px", textAlign: "center"}} name="amount" type="text" readOnly value={counter}/>
                    <button type="button" onClick={increase}>+</button>  
                  </div>
                </div>
            </div>
          
          <img className="images3" src={product_image_url} alt="hoho" />
          </div>
       
          <div className='certificate'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path d="M15.85 6.28557V6.28578C15.8505 7.29217 15.4555 8.25843 14.7501 8.9763L14.7071 9.02007V9.08143V13.1429V13.143C14.7072 13.2148 14.6889 13.2855 14.6539 13.3483C14.6189 13.4111 14.5685 13.4639 14.5073 13.5017C14.4462 13.5395 14.3764 13.561 14.3046 13.5643C14.2328 13.5675 14.1614 13.5523 14.0971 13.5201L14.03 13.6543L14.0971 13.5201L12.0671 12.5044L12 12.4708L11.9329 12.5044L9.90288 13.5201L9.97 13.6543L9.90287 13.5201C9.8386 13.5523 9.76717 13.5675 9.69537 13.5643C9.62357 13.561 9.55379 13.5395 9.49265 13.5017C9.43152 13.4639 9.38108 13.4111 9.34611 13.3483C9.31114 13.2855 9.2928 13.2148 9.29286 13.143V13.1429V9.08143V9.02019L9.25 8.97645C8.80795 8.52529 8.4837 7.9723 8.30582 7.36624C8.12795 6.76018 8.10191 6.11966 8.23002 5.50116C8.35812 4.88267 8.63643 4.30519 9.0404 3.81964C9.44438 3.33409 9.96161 2.95539 10.5465 2.71693C11.1314 2.47847 11.7659 2.38757 12.3942 2.45225C13.0225 2.51693 13.6253 2.7352 14.1493 3.08781C14.6734 3.44043 15.1026 3.91656 15.3992 4.47422C15.6958 5.03188 15.8506 5.65395 15.85 6.28557ZM10.1357 12.2186V12.4614L10.3528 12.3527L11.8114 11.6227C11.8114 11.6227 11.8114 11.6227 11.8114 11.6227C11.87 11.5934 11.9345 11.5782 12 11.5782C12.0655 11.5782 12.13 11.5934 12.1886 11.6227C12.1886 11.6227 12.1886 11.6227 12.1886 11.6227L13.6471 12.3527L13.8643 12.4614V12.2186V9.89928V9.66198L13.6499 9.76379C13.1344 10.0087 12.5708 10.1357 12 10.1357C11.4292 10.1357 10.8656 10.0087 10.3501 9.76379L10.1357 9.66198V9.89928V12.2186ZM13.8643 1.14286V0.992857H13.7143H1.14286H0.992857V1.14286V10.2857V10.4357H1.14286H7.42857C7.54034 10.4357 7.64753 10.4801 7.72657 10.5591C7.8056 10.6382 7.85 10.7454 7.85 10.8571C7.85 10.9689 7.8056 11.0761 7.72656 11.1551C7.64753 11.2342 7.54034 11.2786 7.42857 11.2786H1.14286C0.879535 11.2786 0.626998 11.174 0.440801 10.9878C0.254604 10.8016 0.15 10.549 0.15 10.2857V1.14286C0.15 0.879535 0.254604 0.626998 0.440801 0.440801C0.626998 0.254604 0.879535 0.15 1.14286 0.15H13.7143C13.9776 0.15 14.2301 0.254604 14.4163 0.440801C14.6025 0.626998 14.7071 0.879535 14.7071 1.14286C14.7071 1.25463 14.6627 1.36182 14.5837 1.44085C14.5047 1.51988 14.3975 1.56429 14.2857 1.56429C14.1739 1.56429 14.0667 1.51988 13.9877 1.44085C13.9087 1.36182 13.8643 1.25463 13.8643 1.14286ZM13.6707 3.78537C13.1762 3.45494 12.5948 3.27857 12 3.27857C11.2025 3.27857 10.4376 3.59539 9.87363 4.15934C9.30968 4.72329 8.99286 5.48817 8.99286 6.28571C8.99286 6.88047 9.16922 7.46187 9.49965 7.95639C9.83008 8.45091 10.2997 8.83635 10.8492 9.06395C11.3987 9.29155 12.0033 9.35111 12.5867 9.23507C13.17 9.11904 13.7058 8.83264 14.1264 8.41208C14.5469 7.99153 14.8333 7.45571 14.9494 6.87238C15.0654 6.28905 15.0058 5.68441 14.7782 5.13493C14.5506 4.58545 14.1652 4.1158 13.6707 3.78537ZM6.70714 6.85714C6.70714 6.96891 6.66274 7.0761 6.58371 7.15514C6.50468 7.23417 6.39748 7.27857 6.28571 7.27857H3.42857C3.3168 7.27857 3.20961 7.23417 3.13058 7.15514C3.05154 7.0761 3.00714 6.96891 3.00714 6.85714C3.00714 6.74537 3.05154 6.63818 3.13058 6.55915C3.20961 6.48011 3.3168 6.43571 3.42857 6.43571H6.28571C6.39748 6.43571 6.50468 6.48011 6.58371 6.55915C6.66274 6.63818 6.70714 6.74537 6.70714 6.85714ZM6.70714 4.57143C6.70714 4.6832 6.66274 4.79039 6.58371 4.86942C6.50467 4.94846 6.39748 4.99286 6.28571 4.99286H3.42857C3.3168 4.99286 3.20961 4.94846 3.13058 4.86942C3.05154 4.79039 3.00714 4.6832 3.00714 4.57143C3.00714 4.45966 3.05154 4.35247 3.13058 4.27343C3.20961 4.1944 3.3168 4.15 3.42857 4.15H6.28571C6.39748 4.15 6.50467 4.1944 6.58371 4.27343C6.66274 4.35247 6.70714 4.45966 6.70714 4.57143Z" fill="#555555" stroke="#F6F5F5" strokeWidth="0.3" />
                  </svg>
              <div className='certification'>This fruit is certified by FarmCart (No pesticides used)
              </div>
          </div>
        </div>
        <div className='popdiv'>
        <p style={{textAlign:"justify", width:"100%", }}>{productDetails.product_description}</p>
          <h3 style={{textAlign:"left", width:"100%"}} className='farmdetailshead'>Farm details</h3>
          <div className='farmdetailsdesc'>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
            <path d="M10.4497 4.0332L10.1619 5.40039H12.4735L12.1857 4.0332H10.4497ZM10.7025 6.63086V7.58789H11.9329V6.63086H10.7025ZM8.60282 8.81836L8.07098 15.2441H9.24301L9.65316 9.77539H18.5771L18.4404 8.81836H8.60282ZM29.2962 10.3906V15.4904C29.7069 15.5221 30.1171 15.5601 30.5267 15.6043V10.3906H29.2962ZM10.7948 11.0059L10.4768 15.2441H10.9075C11.5913 15.2441 12.2435 15.5367 12.8899 15.9718V11.0059H10.7948ZM14.1204 11.0059V16.7658L19.4525 17.3592V15.9035L18.7528 11.0059H14.1204ZM5.84896 16.4746C5.30209 16.4746 4.25674 16.9367 3.29389 17.7069C2.54823 18.3034 1.84098 19.0666 1.32877 19.8374L2.47809 20.1247C3.84665 18.4041 5.95608 17.2949 8.30983 17.2949C11.7684 17.2949 14.7001 19.6891 15.5276 22.9004H16.9228C16.2985 21.6194 15.3452 20.1515 14.303 18.9431C13.6652 18.2036 12.9999 17.563 12.3927 17.1247C11.7856 16.6864 11.2388 16.4746 10.9076 16.4746H5.84896ZM20.6829 16.4786V23.9941H22.8807C23.5017 21.9328 24.6714 20.5235 26.2389 19.811C27.0804 19.4285 28.0153 19.2433 29.0235 19.2246C29.8028 19.2101 30.6262 19.2963 31.4837 19.4666V16.9722C30.6979 16.8504 29.769 16.755 28.7744 16.6849C26.0259 16.4914 22.8846 16.4798 20.6829 16.4786ZM32.7142 17.2179V18.5254H33.6712V17.6087C33.3993 17.4243 32.9941 17.2938 32.7142 17.2179ZM15.2236 18.1267C15.2273 18.131 15.2311 18.1351 15.2348 18.1394C16.6018 19.7242 17.8218 21.6661 18.4536 23.2928L18.7791 24.1309H15.7351C15.752 24.3339 15.7611 24.539 15.7611 24.7461C15.7611 25.2368 15.7123 25.7167 15.6205 26.1816H19.4525V18.5975L15.2236 18.1267ZM8.3099 18.5254C4.88639 18.5254 2.0892 21.3227 2.0892 24.7461C2.0892 28.1695 4.88639 30.9668 8.3099 30.9668C11.7333 30.9668 14.5306 28.1695 14.5306 24.7461C14.5306 21.3227 11.7333 18.5254 8.3099 18.5254ZM32.7142 19.7559V20.7129H33.6712V19.7559H32.7142ZM8.3099 20.0293C10.9185 20.0293 13.0267 22.1375 13.0267 24.7461C13.0267 27.3547 10.9185 29.4629 8.3099 29.4629C5.70124 29.4629 3.5931 27.3547 3.5931 24.7461C3.5931 22.1375 5.70124 20.0293 8.3099 20.0293ZM29.3375 20.4579C28.456 20.4691 27.4665 20.6127 26.7481 20.9312C25.597 21.4544 24.7196 22.404 24.1715 23.9941H24.8941C25.8467 22.4412 27.5609 21.3965 29.5013 21.3965C30.1805 21.3966 30.8533 21.5266 31.4837 21.7793V20.7233C30.7191 20.5581 30.0015 20.4688 29.3375 20.4579ZM8.3099 21.2598C6.35564 21.2598 4.82357 22.7919 4.82357 24.7461C4.82357 26.7003 6.35564 28.2324 8.3099 28.2324C10.2641 28.2324 11.7962 26.7003 11.7962 24.7461C11.7962 22.7919 10.2641 21.2598 8.3099 21.2598ZM32.7142 21.9434V22.4677C33.0688 22.7324 33.3902 23.0389 33.6712 23.3808V21.9434H32.7142ZM29.5013 22.627C27.2117 22.627 25.3314 24.5074 25.3314 26.7969C25.3314 29.0864 27.2117 30.9668 29.5013 30.9668C31.7908 30.9668 33.6712 29.0864 33.6712 26.7969C33.6712 24.5074 31.7908 22.627 29.5013 22.627ZM29.5013 24.1309C30.9721 24.1309 32.1673 25.3261 32.1673 26.7969C32.1673 28.2677 30.9721 29.4629 29.5013 29.4629C28.0304 29.4629 26.8353 28.2677 26.8353 26.7969C26.8353 25.3261 28.0304 24.1309 29.5013 24.1309ZM20.6829 25.2246V26.2758L24.1016 26.8455C24.1014 26.8293 24.1009 26.8131 24.1009 26.7969C24.1009 26.2508 24.1842 25.7229 24.3377 25.2246H20.6829ZM29.5013 25.3613C28.6745 25.3613 28.0658 25.9701 28.0658 26.7969C28.0658 27.6237 28.6745 28.2324 29.5013 28.2324C30.328 28.2324 30.9369 27.6237 30.9369 26.7969C30.9369 25.9701 30.328 25.3613 29.5013 25.3613Z" fill="#555555"/>
            </svg>
                <div className='Farmlocationdesc'>
                    <div className='farmname'>{productDetails.farmer_details.farms}</div>
                    <div className='farmlocation'>{productDetails.seller_details.location_latitude},{productDetails.seller_details.location_longitude}</div>
                </div>
                <div className='farmcodedesc'>
                    <div className='farmcodehead'>Farm Code</div>
                    <div className='farmcode'>FC-M#110</div>
                </div>
         </div>
         <h3 style={{textAlign:"left", width:"100%"}} className='farmerdetailshead'>
            About farmer
         </h3>
         <div className='farmdetailsdesc'>
         <img className='farmer' src={farmer_image_url} alt="farmer" />
                <div className='Farmlocationdesc'>
                    <div className='farmername'>{productDetails.seller_details.username}</div>
                    <div className='verification'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <g clip-path="url(#clip0_296_4080)">
                            <path d="M5.01668 13.125L3.90834 11.2583L1.80834 10.7917L2.01251 8.63333L0.583344 7L2.01251 5.36667L1.80834 3.20833L3.90834 2.74167L5.01668 0.875L7.00001 1.72083L8.98334 0.875L10.0917 2.74167L12.1917 3.20833L11.9875 5.36667L13.4167 7L11.9875 8.63333L12.1917 10.7917L10.0917 11.2583L8.98334 13.125L7.00001 12.2792L5.01668 13.125ZM6.38751 9.07083L9.68334 5.775L8.86668 4.92917L6.38751 7.40833L5.13334 6.18333L4.31668 7L6.38751 9.07083Z" fill="#0BCE83"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_296_4080">
                            <rect width="14" height="14" fill="white"/>
                            </clipPath>
                        </defs>
                        </svg>
                    </div>
                    <div className='farmerlocation'>{productDetails.seller_details.location_latitude},{productDetails.seller_details.location_longitude}</div>
                </div>
                <div className='farmerdesc'>
                    <Rating
                    initialValue={productDetails.farmer_details.overallrating}
                    onClick={function noRefCheck(){}}
                    readonly
                    size={28}
                    allowFraction
                    showTooltip
                    tooltipStyle={{
                        'background-color': 'white',
                        color: 'transparent'
                      }}
                    />
                </div>
                
         </div>
        <div className='button-group'>
          <button type="submit" disabled={submitting} className='addtobtn'>Add to Cart</button>
          <button type="button" onClick={handleAddToWishlist} className='wishlistbtn'>Add to Wishlist</button>
        </div>
        </div>
        <Navbar/>
        </form>
      </div>
    );
  }
  
export default Expandpage;