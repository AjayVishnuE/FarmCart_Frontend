import React, { useState, useEffect } from 'react';
import './FarmerProductList.css';
import axios from 'axios';
import bar from '../../Images/Bar.png';
import { Link } from 'react-router-dom';
import cart from '../../Images/shopping-cart.svg';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  
import { FarmerHeader, FarmerProductComponent, Loader, Navbar,ProductComponent} from '../../components'
import Farmer_navbar from '../../components/Farmer-Navbar/FarmerNavbar';


function FarmerProductList(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
                'Content-Type': 'application/json',
            },
        };
        axios.get(`${API_ENDPOINTS.product}/seller-crud/`, config)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
        setLoading(true);
    }, []);

    if (!loading) {
        return <Loader/>;
    }
    return (
        <div className='seemore-overall-container'>
            <FarmerHeader/>
            <div className='Productlist'>
                    <div className='Productcompset2'>
                        {products.map((item,index)=>
                            <div className='Productbox'>
                                <FarmerProductComponent
                                    id = {item.product_id}
                                    name={item.product_name}
                                    price={item.price}
                                    image={item.product_image}
                                    altText={`${item.product_name} image`}/>
                            </div>
                        )}
                    </div>
            </div>
            <Farmer_navbar/>
        </div>
    );
}

export default FarmerProductList;