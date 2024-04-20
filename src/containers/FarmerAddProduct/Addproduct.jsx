import React, { useState, useEffect } from 'react';
import { FarmerNavbar, Header} from '../../components';
import { Link } from 'react-router-dom';

import "./Addproduct.css";

function Addproduct(props) {
    return (
        <div className='addproduct-overall-container'>
            <Header/>
            <form className='addproductInfoContainer' >
                    <span className='addlabel'>Product Image</span>
                    <div className="FileUploadBase">
                        <div className="Content">
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
                        </div>
                </div>
                <div className='addproductInfoItem'>
                    <label className='addlabel'>Product name</label>
                    <input className='addvalue' type='text' placeholder='Kashmir Apple' />
                </div>
                <div className='addproductInfoItem'>
                    <label className='addlabel'>Price (per kg in Rs.)</label>
                    <input className='addvalue' type='text'placeholder='₹ 250/-' />
                </div>
                <div className='addproductInfoItem'>
                    <label className='addlabel'>Quantity Available</label>
                    <input className='addvalue' type='text' placeholder='80 kgs'/>
                </div>
                <div className='addproductInfoItem'>
                    <label className='addlabel'>Product Description</label>
                    <input className='addvalue' type='text' placeholder='The pomegranate is a fruit-bearing deci....' />
                </div>
                <div className='addproductInfoItem'>
                    <label className='addlabel'>Farm Details</label>
                    <input className='addvalue' type='text' placeholder='ARN Fruits and Vegetables' />
                </div>
               
                <button className='addproductbtn' type="submit">
                    Add Product
                </button>
            </form>
        <FarmerNavbar/>
        </div>
    );
}

export default Addproduct;
