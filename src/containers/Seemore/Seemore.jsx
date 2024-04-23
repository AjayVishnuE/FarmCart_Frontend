import React, { useState, useEffect } from 'react';
import './Seemore.css';
import axios from 'axios';
import bar from '../../Images/Bar.png';
import cart from '../../Images/shopping-cart.svg';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  
import { Header, Navbar,ProductComponent, SearchBar} from '../../components'


function Seemore(props) {
    const [products, setProducts] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        axios.get(`${API_ENDPOINTS.product}/productlist/`)
            .then(response => {
                const productList = response.data;
                setProducts(productList);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    }, []); 

    return (
        <div className='seemore-overall-container'>
        <div className='header2'>
            <img className='images1' src={bar} alt="bars"/>
            <SearchBar/>
            <img className='images2' src={cart} alt="cart"/>
        </div>
            <div className='Productlist'>
                    <div className='Productcompset2'>
                        {products.map((item,index)=>
                            <div className='Productbox'>
                                <ProductComponent
                                    id = {item.product_id}
                                    name={item.product_name}
                                    price={item.price}
                                    image={item.product_image}
                                    altText={`${item.product_name} image`}/>
                            </div>
                        )}
                    </div>
            </div>
            <Navbar/>
        </div>
    );
}

export default Seemore;