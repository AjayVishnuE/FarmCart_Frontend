import React, { useState, useEffect } from 'react';
import './Wishlist.css';
import axios from 'axios';
import { EmptyWishlist, Header, Loader, Navbar} from '../../components';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import { Link, useNavigate} from 'react-router-dom';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';
import product from '../../Images/listone.png';

function Wishlist(props) {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshCart, setRefreshCart] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchWishlistItems();
    }, [refreshCart]);

    const handleDeleteClick = async (itemId) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.wishlist}/wishlist-crud/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete the item');
            }
            setRefreshCart(!refreshCart);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const fetchWishlistItems = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.wishlist}/wishlist-crud/`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setWishlistItems(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch wishlist items');
            setLoading(false);
        }
    };

    const handleSubmit = async (productId, quantity) => {
        console.log(productId)
        if (submitting) return;
        setSubmitting(true);
        const payload = {
            product: productId,  
            quantity: quantity
        };
    
        try {
            const response = await axios.post(`${API_ENDPOINTS.cart}/cart-crud/`, payload, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (response.status === 200 || response.status === 201) {
                navigate('/cart');
            } else {
                throw new Error('Failed to add to cart');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to add to cart');
        } finally {
            setSubmitting(false);
        }
    };
    
    console.log(wishlistItems)
    if (loading) return <Loader/>;
    if (wishlistItems.length === 0) return <div><EmptyWishlist/></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='wishcart-overall-container' >
        <Header/>
        <div className='orderstitle'>My wishlist</div>
            <div  className='cartlist'>
            {wishlistItems.map(item => (
                <div  className='listitem'>
                    <img  className="proimage" alt={item.product_details.product_name} src={API_ENDPOINTS.media + item.product_details.product_image} />
                    <div className='itemdetailswish'>
                        <div className='flexbtn'>
                            <div className='itemname'>{item.product_details.product_name}</div>
                            <button  className='wishdeletebtn' onClick={() => handleDeleteClick(item.wishlist_id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#7519EB"/>
                                <path d="M12.6666 6.33334L6.33331 12.6667" stroke="white" stroke-width="1.40741" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.33331 6.33334L12.6666 12.6667" stroke="white" stroke-width="1.40741" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className='flexbtn'>
                            <div className='itempricewish'>INR {item.product_details.price}</div>
                            <button onClick={() => handleSubmit(item.product_details.product_id, 1)} className="wishbtn__container">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                        <g clip-path="url(#clip0_914_604)">
                                        <path d="M4.67101 11.6899C4.95765 11.6899 5.19002 11.4575 5.19002 11.1709C5.19002 10.8842 4.95765 10.6519 4.67101 10.6519C4.38437 10.6519 4.15201 10.8842 4.15201 11.1709C4.15201 11.4575 4.38437 11.6899 4.67101 11.6899Z" stroke="white" stroke-width="1.26027" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.3802 11.6899C10.6668 11.6899 10.8992 11.4575 10.8992 11.1709C10.8992 10.8842 10.6668 10.6519 10.3802 10.6519C10.0935 10.6519 9.86115 10.8842 9.86115 11.1709C9.86115 11.4575 10.0935 11.6899 10.3802 11.6899Z" stroke="white" stroke-width="1.26027" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M0.519043 0.791504H2.59507L3.986 7.74099C4.03346 7.97994 4.16345 8.19458 4.35322 8.34735C4.54299 8.50011 4.78044 8.58126 5.02401 8.57659H10.0688C10.3123 8.58126 10.5498 8.50011 10.7395 8.34735C10.9293 8.19458 11.0593 7.97994 11.1068 7.74099L11.9372 3.38653H3.11407" stroke="white" stroke-width="1.26027" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_914_604">
                                        <rect width="12.4561" height="12.4561" fill="white" transform="translate(0 0.271973)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                <div className='wishcart' >Add to cart</div>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <Navbar/>
        </div>
    );
}

export default Wishlist;