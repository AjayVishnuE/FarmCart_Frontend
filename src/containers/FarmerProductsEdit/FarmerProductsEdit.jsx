import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from "react-router-dom";

import './FarmerProductsEdit.css';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  
import { FarmerHeader, FarmerNavbar } from '../../components';


function FarmerProductsEdit() {
    const { product_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [productData, setProductData] = useState({
        product_name: '',
        price: '',
        quantity: '',
        product_description: '',
        product_type: '',
        product_image: '' 
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINTS.product}/product-details/${product_id}`);
                setProductData(response.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchData();
        setLoading(false);
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
    
        Object.entries(productData).forEach(([key, value]) => {
            if (key !== 'product_image') {
                formData.append(key, value);
            }
        });
    
        if (productData.product_image instanceof File) {
            formData.append('product_image', productData.product_image);
        }
    
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',  
                },
            };
            const response = await axios.patch(`${API_ENDPOINTS.product}/seller-crud/${product_id}/`, formData, config);
            console.log('Product updated:', response.data);
        } catch (error) {
            console.error('Error updating product:', error.response ? error.response.data : error);
        }
        navigate(`/farmerexpand/${product_id}`)
    };
    
    
    const handleInputChange = (event) => {
        const { name, type } = event.target;
        if (type === "file") {
            const file = event.target.files[0];
            setProductData({
                ...productData,
                [name]: file
            });
            if (file) {
                setProductData(prevData => ({
                    ...prevData,
                    product_image_preview: URL.createObjectURL(file)
                }));
            }
        } else {
            setProductData({
                ...productData,
                [name]: event.target.value
            });
        }
    };
    

    if (loading) {
        return <div className=''>Loading.....</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!productData) {
        return <div>Product not found.</div>;
    }
    return (
        <div className='edit-overall'>
            <FarmerHeader/>
            <form className='editProductFormContainer' onSubmit={handleFormSubmit}>
                <span className='editlabel'>Product Image</span>
                <div className="FileUploadBase">
                    <input type="file" onChange={handleInputChange} name="product_image" accept="image/*" style={{ display: 'none' }} id="productImageUpload" />
                    <label htmlFor="productImageUpload" className="product-image-edit-label">
                        <img 
                            className='product-image-edit'
                            src={productData.product_image_preview || (typeof productData.product_image === 'string' ? API_ENDPOINTS.media + productData.product_image : '')} 
                            alt="Product Preview" 
                        />                    
                    </label>
                </div>
                <div className='editProductFormItem'>
                    <label className='editlabel'>Product name</label>
                    <input className='editvalue' name="product_name" value={productData.product_name} onChange={handleInputChange} type='text' placeholder='Kashmir Apple' />
                </div>
                <div className='editProductFormItem'>
                    <label className='editlabel'>Price (per kg in Rs.)</label>
                    <input className='editvalue' name="price" value={productData.price} onChange={handleInputChange} type='text'placeholder='₹ 250/-' />
                </div>
                <div className='editProductFormItem'>
                    <label className='editlabel'>Quantity Available</label>
                    <input className='editvalue' name="quantity" value={productData.quantity} onChange={handleInputChange} type='text' placeholder='80 kgs'/>
                </div>
                <div className='editProductFormItem'>
                    <label className='editlabel'>Product Description</label>
                    <input className='editvalue' name="product_description" value={productData.product_description} onChange={handleInputChange} type='text' placeholder='The pomegranate is a fruit-bearing deci....' />
                </div>
                <div className='editProductFormItem'>
                    <label className='editlabel'>Product Type</label>
                    <select className='editvalue' name="product_type" value={productData.product_type} onChange={handleInputChange} id="product_type">
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Exotic">Exotic</option>
                    </select>
                </div>
                <button className='editproductbtn' type="submit">
                    Update Product
                </button>
        </form>
        <FarmerNavbar/>
        </div>
    )
}

export default FarmerProductsEdit
