import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from "react-router-dom";

import './FarmerProductsEdit.css';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  
import { FarmerHeader, FarmerNavbar, Loader } from '../../components';


function FarmerProductsEdit() {
    const { product_id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [productData, setProductData] = useState({
        product_name: '',
        price: '',
        quantity: '',
        product_description: '',
        product_type: '',
        product_image: '',
        product_image_preview: '' // Holds the URL for the image preview
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINTS.product}/product-details/${product_id}`);
                setProductData({
                    ...response.data,
                    product_image_preview: `${API_ENDPOINTS.media}${response.data.product_image}`
                });
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError('Error fetching product data');
            }
            setLoading(false);
        };
        fetchData();
    }, [product_id]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image_file', file);
            formData.append('size', 'auto');
    
            try {
                const response = await axios({
                    method: 'post',
                    url: 'https://api.remove.bg/v1.0/removebg',
                    data: formData,
                    responseType: 'blob',
                    headers: {
                        'X-Api-Key': 'DcNc7BVMLrEy9kF6CNt5Rdtb',
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const blob = new Blob([response.data], { type: 'image/png' });
                const imageFile = new File([blob], "product_image.png", { type: 'image/png' }); // Creating File object
                const imageUrl = URL.createObjectURL(imageFile);
                setProductData({
                    ...productData,
                    product_image: imageFile, // Saving File object
                    product_image_preview: imageUrl
                });
            } catch (error) {
                console.error('Failed to remove background:', error);
            }
        }
    };    
    
    const handleInputChange = (event) => {
        const { name, type, value, files } = event.target;
        if (type === 'file') {
            handleImageChange(event);
        } else {
            setProductData({
                ...productData,
                [name]: value
            });
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        // Iterate over productData to append form fields
        Object.entries(productData).forEach(([key, value]) => {
            if (key === 'product_image') {
                // Append image only if it's a File object
                if (value instanceof File) {
                    formData.append(key, value, value.name);
                }
            } else if (key !== 'product_image_preview') {
                // Append other data fields normally
                formData.append(key, value);
            }
        });
    
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            };
            await axios.patch(`${API_ENDPOINTS.product}/seller-crud/${product_id}/`, formData, config);
            navigate(`/farmerexpand/${product_id}`);
        } catch (error) {
            console.error('Error updating product:', error.response ? error.response.data : error);
        }
    };

    if (loading) return <Loader/>;
    if (error) return <div>Error: {error}</div>;

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
                    <select className='editvalue select' name="product_type" value={productData.product_type} onChange={handleInputChange} id="product_type">
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Exotic">Exotic</option>
                    </select>
                </div>
                <button className='editproductbtn34' type="submit">
                    Update Product
                </button>
        </form>
        <FarmerNavbar/>
        </div>
    )
}

export default FarmerProductsEdit
