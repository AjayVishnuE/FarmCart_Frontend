import React, { useState, useEffect }  from 'react';
import './CartPage.css';
import { Header, Navbar, EmptyCart} from '../../components';
import { Link } from 'react-router-dom';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';
import product from '../../Images/listone.png';
import { API_ENDPOINTS} from '../../components/Auth/apiConfig';  


function CartPage(props) {
    const [counter, setCounter] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const [refreshCart, setRefreshCart] = useState(false);
    // counter
    const increase = () => {setCounter(count => count + 1);};
  
    const decrease = () => {setCounter(count => count - 1);};

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
    
    useEffect(() => {
        const fetchCartItems = async () => {
          try {
            const response = await fetch(`${API_ENDPOINTS.cart}/cart-crud/`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch cart items');
            }
    
            const data = await response.json();
            setCartItems(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchCartItems();
      }, [refreshCart]);
      console.log(cartItems)

      if (cartItems.length === 0) {
        return <div><EmptyCart /></div>;
      }

      if (isLoading) {
        return <div>Loading cart items...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      
    return (
        <div className='cart-overall-container'>
            <Header/>
            <div  className='cartlist'>
                {cartItems.map((item,index) => (
                    <div id={`deleteBtn-${item.cart_id}`} className='listitem'>
                        <img  className="proimage" src={API_ENDPOINTS.media + item.product_details.product_image} alt="image1"/>
                        <div className='itemdetails'>
                            <div className='itemname'>{item.product_details.product_name}</div>
                            <div className='itemprice'>{item.product_details.price}</div>
                            <div className='quantitydesc'>
                                <div className='quantity'>Quantity (in kgs)
                                </div>
                            </div>

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
                                    <button className="control__btn" onClick={decrease}>-</button>
                                    <span className="counter__output">{counter}</span>
                                    <button className="control__btn" onClick={increase}>+</button>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div><Link to='/checkoutpage'>
            <button className='checkbtn' type="submit" >
                Checkout
            </button></Link>
            <Navbar/>
        </div>
    );
}

export default CartPage;