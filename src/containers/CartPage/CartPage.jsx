import React, { useState, useEffect } from 'react';
import './CartPage.css';
import { Header, Navbar, EmptyCart, Loader } from '../../components';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const [refreshCart, setRefreshCart] = useState(false);
    const [itemQuantities, setItemQuantities] = useState({});

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.cart}/cart-crud/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
    
                let data = await response.json();
                const quantities = {};
                data = data.map(item => {
                    const maxQuantity = item.product_details.quantity;
                    const adjustedQuantity = Math.min(item.quantity, maxQuantity);
                    quantities[item.cart_id] = adjustedQuantity;
                    return {
                        ...item,
                        quantity: adjustedQuantity  
                    };
                });
                setCartItems(data);
                setItemQuantities(quantities);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchCartItems();
    }, [refreshCart]);

    const updateQuantity = async (cart_id, newQuantity) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.cart}/cart-crud/${cart_id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (!response.ok) {
                throw new Error('Failed to update the quantity');
            }
        } catch (error) {
            console.error('Error updating quantity:', error.message);
        }
    };

    const handleQuantityChange = (cart_id, delta) => {
        const currentQuantity = itemQuantities[cart_id];
        const maxQuantity = cartItems.find(item => item.cart_id === cart_id).product_details.quantity;
        let newQuantity = currentQuantity + delta;
    
        newQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
    
        setItemQuantities(prev => ({ ...prev, [cart_id]: newQuantity }));
        updateQuantity(cart_id, newQuantity);
    };

    const handleInputChange = (e, cart_id) => {
        const value = parseInt(e.target.value, 10);
        const maxQuantity = cartItems.find(item => item.cart_id === cart_id).product_details.quantity;
        let newQuantity = Number.isNaN(value) ? 1 : value;
    
        newQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
    
        setItemQuantities(prev => ({ ...prev, [cart_id]: newQuantity }));
        updateQuantity(cart_id, newQuantity);
    };
    

    const handleDeleteClick = async (itemId) => {
      try {
          const response = await fetch(`${API_ENDPOINTS.cart}/cart-crud/${itemId}`, {
              method: 'DELETE',
              headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
              },
          });
          if (!response.ok) {
              throw new Error('Failed to delete the item');
          }
          document.getElementById(`deleteBtn-${itemId}`).style.display = "none";
      } catch (error) {
          console.error('Error:', error.message);
      }
      setRefreshCart(!refreshCart);
    };



    if (isLoading) {
        return <Loader/>;
    }
    if (cartItems.length === 0) {
        return <EmptyCart />;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log(cartItems)
    return (
        <div className='cart-overall-container'>
            <Header/>
            <div className='cartlist'>
                {cartItems.map((item) => (
                    <div key={item.cart_id} className='listitem'>
                        <img className="proimage" src={API_ENDPOINTS.media + item.product_details.product_image} alt="product"/>
                        <div className='itemdetails'>
                            <div className='itemdetailsleft'>
                              <div className='itemname'>{item.product_details.product_name}</div>
                              <div className='itemprice'>{item.product_details.price}</div>
                              <div className='quantity'>Quantity (in kgs)</div>
                            </div>
                            <div className='rightbtns'>
                              <button  className='deletebtn' onClick={() => handleDeleteClick(item.cart_id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                  <circle cx="9.5" cy="9.5" r="9.5" fill="#7519EB"/>
                                  <path d="M12.6666 6.33334L6.33331 12.6667" stroke="white" stroke-width="1.40741" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M6.33331 6.33334L12.6666 12.6667" stroke="white" stroke-width="1.40741" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                              </button>
                              <div className="btn__container">
                                  <button className="addminus"type="button" onClick={() => handleQuantityChange(item.cart_id, -1)}>-</button>
                                  <input  className='addinput'               
                                      style={{width: "35px", textAlign: "center"}}
                                      name="amount"
                                      type="number" 
                                      value={itemQuantities[item.cart_id] || 1}
                                      onChange={(e) => handleInputChange(e, item.cart_id)}
                                  />
                                  <button className="addminus" type="button" onClick={() => handleQuantityChange(item.cart_id, 1)}>+</button> 
                              </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to='/checkoutpage'>
                <button className='checkbtn-cart' type="submit">
                    Checkout
                </button>
            </Link>
            <Navbar/>
        </div>
    );
}

export default CartPage;
