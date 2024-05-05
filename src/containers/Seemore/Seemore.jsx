import React, { useState, useEffect } from 'react';
import './Seemore.css';
import axios from 'axios';
import bar from '../../Images/Bar.png';
import cart from '../../Images/shopping-cart.svg';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  
import { Header, Navbar,ProductComponent, SearchBar} from '../../components'
import { Link } from 'react-router-dom';

function Seemore(props) {
    const [products, setProducts] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        axios.get(`${API_ENDPOINTS.product}/productlist/`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
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
        <div className='header212'>
            <img className='logoimage' src={bar} alt="bars" />
            <SearchBar/>
            <Link className='seemorecart' to = "/cart">
                <img className='cartimage' src={cart} alt="cart" />
            </Link>
        </div>
            <div className='Productlist12'>
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