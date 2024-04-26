import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardComponent.css';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  
import ProductComponent from '../ProductComponent/ProductComponent';

const DashboardComponent = () => {
    const [selectedHeading, setSelectedHeading] = useState('Heading1');
    const [fruits, setFruits] = useState([]);
    const [vegetables, setVegetables] = useState([]);
    const [exotic, setExotic] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_ENDPOINTS.product}/productlist/`)
            .then(response => {
                const productList = response.data;
                const tempFruits = [], tempVegetables = [], tempExotic = [];
            
                productList.forEach(item => {
                    switch (item.category) {
                        case 'Fruits':
                            tempFruits.push(item);
                            break;
                        case 'Vegetables':
                            tempVegetables.push(item);
                            break;
                        case 'Exotic':
                            tempExotic.push(item);
                            break;
                    }
                });

                setFruits(tempFruits);
                setVegetables(tempVegetables);
                setExotic(tempExotic);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    }, []); 
    return (
        <div className='Section1'>
            <div className='Tileset'>
                <div id="he1"
                    className={selectedHeading === 'Heading1' ? 'selected' : ''}
                    onClick={() => setSelectedHeading('Heading1')}>
                    Fruits
                </div>
                <div id="he2"
                    className={selectedHeading === 'Heading2' ? 'selected' : ''}
                    onClick={() => setSelectedHeading('Heading2')}>
                    Vegetables
                </div>
                <div id="he3"
                    className={selectedHeading === 'Heading3' ? 'selected' : ''}
                    onClick={() => setSelectedHeading('Heading3')}>
                    Exotic
                </div>
            </div>
            <Link to="/seemore">
                <div className='seemore'> see more</div>
            </Link>

            <div className="content">
                <div className='Productcompset'>
                    {selectedHeading === 'Heading1' && fruits.map((item, index) => (
                        <div key={index} className='Productbox'>
                            <ProductComponent
                                id = {item.product_id}
                                name={item.product_name}
                                price={item.price}
                                image={item.product_image}
                                altText={`${item.product_name} image`}
                            />
                        </div>
                    ))}
                </div>
                <div className='Productcompset'>
                    {selectedHeading === 'Heading2' && vegetables.map((item, index) => (
                        <div key={index} className='Productbox'>
                            <ProductComponent
                                id = {item.product_id}
                                name={item.product_name}
                                price={item.price}
                                image={item.product_image}
                                altText={`${item.product_name} image`}
                            />
                        </div>
                    ))}
                </div>
                <div className='Productcompset'>
                    {selectedHeading === 'Heading3' && exotic.map((item, index) => (
                        <div key={index} className='Productbox'>
                            <ProductComponent
                                id = {item.product_id}
                                name={item.product_name}
                                price={item.price}
                                image={item.product_image}
                                altText={`${item.product_name} image`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
