import React, { useState, useEffect } from 'react';
import { FarmerHeader, FarmerNavbar, Header} from '../../components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import { Link } from 'react-router-dom';

import "./Addproduct.css";

function Addproduct(props) {
    const [productImage, setProductImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productType, setProductType] = useState('Fruits');
    const navigate = useNavigate(); 

    const handleImageChange = event => {
        setProductImage(event.target.files[0]);
    };
    
    const handleProductNameChange = event => {
        setProductName(event.target.value);
    };
    
    const handlePriceChange = event => {
        setPrice(event.target.value);
    };
    
    const handleQuantityChange = event => {
        setQuantity(event.target.value);
    };
    
    const handleProductDescriptionChange = event => {
        setProductDescription(event.target.value);
    };
    
    const handleProductTypeChange = event => {
        setProductType(event.target.value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        if (productImage) {
        formData.append('product_image', productImage);
        }
        formData.append('product_name', productName);
        formData.append('price', price.replace(/[^0-9.]/g, "")); 
        formData.append('quantity', quantity);
        formData.append('product_description', productDescription);
        formData.append('category', productType);
        formData.append('available', 'True')
    
        try {
        const response = await axios.post(`${API_ENDPOINTS.product}/seller-crud/`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    
        console.log(response.data);
        } catch (error) {
        console.error('Error posting product:', error);
        }
        navigate('/dashboard');  
    };
      
    return (
        <div className='addproduct-overall-container'>
            <FarmerHeader/>
           
            <form className='addproductInfoContainer' onSubmit={handleSubmit}>
                <span className='addlabel'>Product Image</span>
                <div className="FileUploadBase-Addpro">
                    <input type="file" onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} id="productImageUpload" />
                    <label htmlFor="productImageUpload" className="Content"> 
                        <div className="IconFrame">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                <path d="M5.66335 11.637C5.41235 11.637 5.2042 11.4289 5.2042 11.1779V8.61272L4.76341 9.05351C4.58587 9.23105 4.29202 9.23105 4.11448 9.05351C3.93694 8.87597 3.93694 8.58211 4.11448 8.40457L5.33888 7.18017C5.46745 7.0516 5.66947 7.00875 5.84089 7.08222C6.01231 7.14956 6.1225 7.32097 6.1225 7.50464V11.1779C6.1225 11.4289 5.91436 11.637 5.66335 11.637Z" fill="#0BCE83"/>
                                <path d="M6.88772 9.1883C6.7714 9.1883 6.65508 9.14545 6.56325 9.05362L5.33884 7.82921C5.1613 7.65167 5.1613 7.35781 5.33884 7.18027C5.51638 7.00273 5.81024 7.00273 5.98778 7.18027L7.21218 8.40468C7.38972 8.58222 7.38972 8.87608 7.21218 9.05362C7.12035 9.14545 7.00404 9.1883 6.88772 9.1883Z" fill="#0BCE83"/>
                                <path d="M9.33656 14.698H5.66334C2.33907 14.698 0.918762 13.2777 0.918762 9.95344V6.28022C0.918762 2.95596 2.33907 1.53564 5.66334 1.53564H8.72436C8.97536 1.53564 9.18351 1.74379 9.18351 1.9948C9.18351 2.2458 8.97536 2.45395 8.72436 2.45395H5.66334C2.84108 2.45395 1.83707 3.45796 1.83707 6.28022V9.95344C1.83707 12.7757 2.84108 13.7797 5.66334 13.7797H9.33656C12.1588 13.7797 13.1628 12.7757 13.1628 9.95344V6.89242C13.1628 6.64142 13.371 6.43327 13.622 6.43327C13.873 6.43327 14.0811 6.64142 14.0811 6.89242V9.95344C14.0811 13.2777 12.6608 14.698 9.33656 14.698Z" fill="#0BCE83"/>
                                <path d="M13.622 7.35165H11.1732C9.07943 7.35165 8.2652 6.53742 8.2652 4.44368V1.99487C8.2652 1.81121 8.37539 1.63979 8.54681 1.57245C8.71823 1.49899 8.91413 1.54184 9.04882 1.6704L13.9464 6.56803C14.075 6.69659 14.1179 6.89862 14.0444 7.07004C13.9709 7.24145 13.8056 7.35165 13.622 7.35165ZM9.1835 3.10296V4.44368C9.1835 6.02317 9.59368 6.43334 11.1732 6.43334H12.5139L9.1835 3.10296Z" fill="#0BCE83"/>
                            </svg>                          
                        </div>
                        <div className="TextAndSupportingText">
                            <div className="Action">
                                <div className="ClickText">Click to Upload </div>
                                <div className="DragText"> or drag and drop</div>
                            </div>
                            <div className="SupportingText">(Max. File size: 2 MB)</div>
                        </div>
                    </label>
                </div>
                <div className='addproductInfoItem'>
                    <label className='addlabel'>Product name</label>
                    <input className='addvalue' value={productName} onChange={handleProductNameChange} type='text' placeholder='Kashmir Apple' />
                </div>
                <div className='addproductInfoItem'>
                    <label className='addlabel'>Price (per kg in Rs.)</label>
                    <input className='addvalue' value={price} onChange={handlePriceChange} type='text'placeholder='₹ 250/-' />
                </div>
                <div className='addproductInfoItem'>
                    <label className='addlabel'>Quantity Available</label>
                    <input className='addvalue' value={quantity} onChange={handleQuantityChange} type='text' placeholder='80 kgs'/>
                </div>
                <div className='addproductInfoItem'>
                    <label className='addlabel'>Product Description</label>
                    <input className='addvalue' value={productDescription} onChange={handleProductDescriptionChange} type='text' placeholder='The pomegranate is a fruit-bearing deci....' />
                </div>
                {/* <div className='addproductInfoItem'>
                    <label className='addlabel'>Farm Details</label>
                    <input className='addvalue' type='text' placeholder='ARN Fruits and Vegetables' />
                </div> */}
                <div className='addproductInfoItem'>
                    <label className='addlabel'>Product Type</label>
                    <select className='addvalue select' onChange={handleProductTypeChange} id="product_type" name="type">
                        <option className='optionaddproduct' value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Exotic">Exotic</option>
                    </select>
                    </div>
               
                <button className='addproductbtn' type="submit">
                    Add Product
                </button>
            </form>
            <div className='fnavbar-container' >
          <Link to='/farmerdashboard'>
        <svg c  id="farmdash-svg" className="mySvg" width="27" height="27" viewBox="0 0 27 27" fill="none" stroke='none' xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5958 1.55415C14.3052 1.26357 13.911 1.10033 13.5 1.10033C13.089 1.10033 12.6948 1.26357 12.4041 1.55415L1.55414 12.4042C1.27179 12.6965 1.11556 13.088 1.11909 13.4944C1.12263 13.9008 1.28564 14.2896 1.57302 14.577C1.8604 14.8644 2.24916 15.0274 2.65557 15.0309C3.06197 15.0344 3.45351 14.8782 3.74584 14.5959L4.19999 14.1417V24.35C4.19999 24.7611 4.36329 25.1553 4.65397 25.446C4.94466 25.7367 5.3389 25.9 5.74999 25.9H8.84999C9.26108 25.9 9.65532 25.7367 9.946 25.446C10.2367 25.1553 10.4 24.7611 10.4 24.35V21.25C10.4 20.8389 10.5633 20.4447 10.854 20.154C11.1447 19.8633 11.5389 19.7 11.95 19.7H15.05C15.4611 19.7 15.8553 19.8633 16.146 20.154C16.4367 20.4447 16.6 20.8389 16.6 21.25V24.35C16.6 24.7611 16.7633 25.1553 17.054 25.446C17.3447 25.7367 17.7389 25.9 18.15 25.9H21.25C21.6611 25.9 22.0553 25.7367 22.346 25.446C22.6367 25.1553 22.8 24.7611 22.8 24.35V14.1417L23.2541 14.5959C23.5465 14.8782 23.938 15.0344 24.3444 15.0309C24.7508 15.0274 25.1396 14.8644 25.427 14.577C25.7143 14.2896 25.8774 13.9008 25.8809 13.4944C25.8844 13.088 25.7282 12.6965 25.4458 12.4042L14.5958 1.55415V1.55415Z" stroke="#888888" stroke-width="2"/>
      </svg>
      </Link>
      <Link to='/addproduct'>
      <svg id="products-svg" className="mySvg" xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="#7519EB">
        <path d="M2.57141 5.50001H11.0214H10.5714H10.9214H2.57141ZM2.97141 3.50001H16.1714L15.3214 2.50001H3.82141L2.97141 3.50001ZM7.57141 10.25L9.57141 9.25001L11.5714 10.25V5.50001H7.57141V10.25ZM12.1214 18.5H2.57141C2.02141 18.5 1.55074 18.3043 1.15941 17.913C0.768078 17.5217 0.572078 17.0507 0.571411 16.5V4.02501C0.571411 3.79167 0.609078 3.56667 0.684411 3.35001C0.759744 3.13334 0.872078 2.93334 1.02141 2.75001L2.27141 1.22501C2.45474 0.991672 2.68374 0.812339 2.95841 0.687005C3.23308 0.561672 3.52074 0.499339 3.82141 0.500005H15.3214C15.6214 0.500005 15.9091 0.562672 16.1844 0.688005C16.4597 0.813339 16.6887 0.992339 16.8714 1.22501L18.1214 2.75001C18.2714 2.93334 18.3841 3.13334 18.4594 3.35001C18.5347 3.56667 18.5721 3.79167 18.5714 4.02501V8.92501C18.2547 8.80834 17.9297 8.71667 17.5964 8.65001C17.2631 8.58334 16.9214 8.55001 16.5714 8.55001V5.50001H13.5714V9.32501C12.9881 9.65834 12.4797 10.071 12.0464 10.563C11.6131 11.055 11.2714 11.609 11.0214 12.225L9.57141 11.5L5.57141 13.5V5.50001H2.57141V16.5H10.9214C11.0547 16.8833 11.2214 17.2417 11.4214 17.575C11.6214 17.9083 11.8547 18.2167 12.1214 18.5ZM15.5714 18.5V15.5H12.5714V13.5H15.5714V10.5H17.5714V13.5H20.5714V15.5H17.5714V18.5H15.5714Z" fill="#7519EB"/>
        </svg>
        </Link>
        <Link to='/farmerchat'>
        <svg id="chat-svg" className="mySvg" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="material-symbols:chat-outline">
          <path id="Vector" d="M6.14285 14.5H14.1429V12.5H6.14285V14.5ZM6.14285 11.5H18.1429V9.5H6.14285V11.5ZM6.14285 8.5H18.1429V6.5H6.14285V8.5ZM2.14285 22.5V4.5C2.14285 3.95 2.33885 3.47933 2.73085 3.088C3.12285 2.69667 3.59352 2.50067 4.14285 2.5H20.1429C20.6929 2.5 21.1639 2.696 21.5559 3.088C21.9479 3.48 22.1435 3.95067 22.1429 4.5V16.5C22.1429 17.05 21.9472 17.521 21.5559 17.913C21.1645 18.305 20.6935 18.5007 20.1429 18.5H6.14285L2.14285 22.5ZM5.29285 16.5H20.1429V4.5H4.14285V17.625L5.29285 16.5Z" fill="#888888"/>
          </g>
        </svg></Link>
         <Link to='/farmerprofile'>
        <svg id="profile-svg" className="mySvg" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="user">
          <path id="Vector" d="M20.1429 21.5V19.5C20.1429 18.4391 19.7214 17.4217 18.9713 16.6716C18.2211 15.9214 17.2037 15.5 16.1429 15.5H8.14285C7.08199 15.5 6.06457 15.9214 5.31443 16.6716C4.56428 17.4217 4.14285 18.4391 4.14285 19.5V21.5" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path id="Vector_2" d="M12.1429 11.5C14.352 11.5 16.1429 9.70914 16.1429 7.5C16.1429 5.29086 14.352 3.5 12.1429 3.5C9.93371 3.5 8.14285 5.29086 8.14285 7.5C8.14285 9.70914 9.93371 11.5 12.1429 11.5Z" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg></Link>
            
        </div>
        </div>
    );
}

export default Addproduct;
