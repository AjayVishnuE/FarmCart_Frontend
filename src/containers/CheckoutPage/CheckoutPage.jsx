//checkout without address
import React, { useState, useEffect }  from 'react';
import './CheckoutPage.css'; 
import { Navbar, Header, NavigationButton} from '../../components';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';

function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [overallTotalPrice, setOverallTotalPrice] = useState(0);
    const accessToken = localStorage.getItem('accessToken');

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
          
              const data = await response.json();
              setCartItems(data);
          
              const total = data.reduce((acc, item) => {
                const price = parseFloat(item.product_details.price);
                const quantity = parseInt(item.quantity, 10);  
                console.log(`Price: ${price}, Quantity: ${quantity}`);  
                return acc + quantity * price;
              }, 0);
          
              console.log(`Total before additional costs: ${total}`);
              setTotalPrice(total);  
          
              const overallTotal = total + 20;  
              console.log(`Overall Total (with additional costs): ${overallTotal}`);
              setOverallTotalPrice(overallTotal);  
          
            } catch (error) {
              console.error('Error fetching cart items:', error);
            } finally {
                setIsLoading(false);
            }
          };
          fetchCartItems();
        
      }, []);
      if (isLoading) {
        return <div>Loading checkout </div>;
      }

    return (
        <div className='checkoutpage-overall-container'>
            <Header/>
            <div className='checkout-container'>
                <Link to='/address'>
                <div className='addaddressbox'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M15.8368 4.725C16.7729 4.725 17.6706 5.09686 18.3325 5.75876C18.9944 6.42067 19.3663 7.31841 19.3663 8.25449V16.5955C19.3663 17.5316 18.9944 18.4293 18.3325 19.0912C17.6706 19.7531 16.7729 20.125 15.8368 20.125H7.49576C6.55968 20.125 5.66194 19.7531 5.00003 19.0912C4.33813 18.4293 3.96627 17.5316 3.96627 16.5955V8.25449C3.96627 7.31841 4.33813 6.42067 5.00003 5.75876C5.66194 5.09686 6.55968 4.725 7.49576 4.725H15.8368ZM11.6663 8.575C11.411 8.575 11.1662 8.67641 10.9857 8.85691C10.8052 9.03741 10.7038 9.28223 10.7038 9.5375V11.4625H8.77877C8.54302 11.4625 8.31548 11.5491 8.13931 11.7057C7.96314 11.8624 7.85059 12.0783 7.82301 12.3124L7.81627 12.425C7.81627 12.6803 7.91768 12.9251 8.09818 13.1056C8.27869 13.2861 8.5235 13.3875 8.77877 13.3875H10.7038V15.3125C10.7038 15.5482 10.7904 15.7758 10.947 15.952C11.1037 16.1281 11.3195 16.2407 11.5537 16.2683L11.6663 16.275C11.9215 16.275 12.1664 16.1736 12.3469 15.9931C12.5274 15.8126 12.6288 15.5678 12.6288 15.3125V13.3875H14.5538C14.7895 13.3875 15.0171 13.3009 15.1932 13.1443C15.3694 12.9876 15.482 12.7717 15.5095 12.5376L15.5163 12.425C15.5163 12.1697 15.4149 11.9249 15.2344 11.7444C15.0539 11.5639 14.809 11.4625 14.5538 11.4625H12.6288V9.5375C12.6287 9.30175 12.5422 9.07421 12.3855 8.89804C12.2289 8.72187 12.013 8.60932 11.7789 8.58174L11.6663 8.575ZM12.6288 0.875C13.6817 0.875 14.3882 1.38801 14.9137 2.33222C14.9752 2.4427 15.0142 2.56419 15.0287 2.68976C15.0432 2.81533 15.0328 2.94252 14.9981 3.06407C14.9634 3.18562 14.9052 3.29915 14.8266 3.39818C14.7481 3.49721 14.6508 3.5798 14.5403 3.64123C14.4298 3.70265 14.3083 3.74172 14.1828 3.7562C14.0572 3.77068 13.93 3.76028 13.8085 3.7256C13.6869 3.69092 13.5734 3.63264 13.4743 3.55409C13.3753 3.47554 13.2927 3.37825 13.2313 3.26778C13.0186 2.8847 12.9021 2.8 12.6288 2.8H3.00377C2.47632 2.8 2.04127 3.23505 2.04127 3.7625V13.3856C2.04127 13.6936 2.1895 13.9804 2.43301 14.1604L2.52926 14.2229C2.6391 14.2855 2.73554 14.3691 2.81307 14.4689C2.89061 14.5688 2.94772 14.6829 2.98115 14.8048C3.01457 14.9267 3.02366 15.054 3.00789 15.1795C2.99212 15.3049 2.9518 15.426 2.88923 15.5358C2.82667 15.6456 2.74308 15.7421 2.64324 15.8196C2.5434 15.8971 2.42927 15.9543 2.30736 15.9877C2.18545 16.0211 2.05815 16.0302 1.93273 16.0144C1.80731 15.9987 1.68622 15.9583 1.57638 15.8958C1.13326 15.6438 0.764747 15.279 0.508291 14.8384C0.251836 14.3979 0.116581 13.8973 0.116272 13.3875V3.7625C0.116272 2.17245 1.41372 0.875 3.00377 0.875H12.6288Z" fill="white"/>
                    </svg>
                    <div className='adddesc'>
                        <div className='addadd'>Add address</div>
                        <div className='addelivery'>Add the address for delivery
                        </div>
                    </div>
                    
                </div></Link>
                <div className='dottedline'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="338" height="2" viewBox="0 0 338 2" fill="none">
                    <path d="M0.25 1H337.75" stroke="#7519EB" stroke-dasharray="5 5"/>
                    </svg>
                </div>
                
            
                <div className="container">
                    <div className="titleContainer">
                        <div className="title">Payment Details</div>
                    </div>
                    <div className="detailsContainer">
                        <div className="rowContainer">
                        <div className="row">
                            <div className="label">Item Price</div>
                            <div className="value">₹ {totalPrice}</div>
                        </div>
                        <div className="row">
                            <div className="label">Packing Charges</div>
                            <div className="value">₹ 20.00</div>
                        </div>
                        </div>
                        <div className="separator-checkout"></div>
                        <div className="row">
                        <div className="totalLabel">Total Amount</div>
                        <div className="totalValue-checkout">₹ {overallTotalPrice}</div>
                        </div>
                    </div>
                    </div>
                    <div className="secondContainer">
                        <div className="secondIconContainer">
                            <div className="secondIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <g clip-path="url(#clip0_600_2464)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.116272 8.39331C0.116272 6.40419 0.906448 4.49653 2.31297 3.09001C3.71949 1.68349 5.62715 0.893311 7.61627 0.893311C9.6054 0.893311 11.5131 1.68349 12.9196 3.09001C14.3261 4.49653 15.1163 6.40419 15.1163 8.39331C15.1163 10.3824 14.3261 12.2901 12.9196 13.6966C11.5131 15.1031 9.6054 15.8933 7.61627 15.8933C5.62715 15.8933 3.71949 15.1031 2.31297 13.6966C0.906448 12.2901 0.116272 10.3824 0.116272 8.39331ZM7.18827 11.6033L11.5063 6.20531L10.7263 5.58131L7.04427 10.1823L4.43627 8.00931L3.79627 8.77731L7.18827 11.6033Z" fill="#0BCE83"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_600_2464">
                                    <rect width="15" height="15" fill="white" transform="translate(0.116272 0.893311)"/>
                                    </clipPath>
                                </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="secondContentContainer">
                            <div className="secondTitle">Pay on Delivery (POD)</div>
                            <div className="secondDescription">Pay by cash/ any UPI apps</div>
                        </div>
                    </div>
                    </div>
                    <NavigationButton class_name="placebtn" destination="/checkout" buttonText="Place order" />           
            <Navbar/>
        </div>
    );
}

export default CheckoutPage;