import React, { useState, useEffect } from 'react';
import './Checkout.css'; 
import axios from 'axios';
import home from '../../Images/Home.svg';
import office from '../../Images/Briefcase.svg';
import { Navbar, Header } from '../../components';
import { useNavigate } from 'react-router-dom';
import order from '../../Images/order.png';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';

function Checkout(props) {
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [overallTotalPrice, setOverallTotalPrice] = useState(0);
    const accessToken = localStorage.getItem('accessToken'); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchAddresses();
        fetchCartItems();
    }, []);

    const fetchAddresses = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_ENDPOINTS.address}addresses/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch addresses');
            }
            const data = await response.json();
            setAddresses(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            setError(error.message);
            setIsLoading(false);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleSelectAddress = (id) => {
        if (selectedAddressId === id) {
            setSelectedAddressId(null);
        } else {
            setSelectedAddressId(id);
        }
    };

    const addressTypeIcons = {
        Home: home,
        Office: office,
        Other: office 
    };

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
            console.log(data);
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
        }
    };

    const handleOrderSubmit = async () => {
        console.log("Starting order submission process");
    
        if (!selectedAddressId) {
            alert("Please select an address before placing your order.");
            return;
        }
    
        try {
            const cartResponse = await fetch(`${API_ENDPOINTS.cart}/cart-crud/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!cartResponse.ok) {
                throw new Error('Failed to fetch cart items');
            }
    
            const cartItems = await cartResponse.json();
            console.log("Cart items fetched:", cartItems);
            console.log(selectedAddressId);
            const orderResponse = await fetch(`${API_ENDPOINTS.order}order-crud/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: selectedAddressId,
                    total_price: overallTotalPrice,
                    order_status: "Placed"
                }),
            });
    
            if (!orderResponse.ok) {
                throw new Error('Failed to create order');
            }
    
            const orderData = await orderResponse.json();
            console.log("Order created:", orderData);
    
            await Promise.all(cartItems.map(async item => {
                await fetch(`${API_ENDPOINTS.orderdetails}${orderData.order_id}/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        product: item.product,
                        quantity: item.quantity,
                        price_at_purchase: item.product_details.price,
                    }),
                });
                return fetch(`${API_ENDPOINTS.cart}/cart-crud/${item.cart_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
            }));
    
            console.log("Order details added");

            const notifyUrl = `${API_ENDPOINTS.notification}getpost/`;
            const notifyData = {
              title: "Order Placed",
              message:"Your Order has been placed",
              redirect: "/orders",
      
            };
      
            await axios.post(notifyUrl, notifyData, {
              headers: { Authorization: `Bearer ${accessToken}` }
            });

            navigate('/ordersuccess');
        } catch (error) {
            console.error('Error placing order:', error);
            alert("Failed to place order. Please try again.");
        }
    };
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className='checkoutpage-overall-container'>
            <Header/>
            <div className='checkout-container'>
                {addresses.map((item) => (
                    <div 
                        key={item.id}
                        className={selectedAddressId === item.id ? 'AddressSelected' : 'Address'} 
                        onClick={() => handleSelectAddress(item.id)}
                    >
                        <div className="Frame11">
                            <div className={selectedAddressId === item.id ? 'Home Selected' : 'Home'}>
                                <img src={addressTypeIcons[item.address_type]} alt={`${item.address_type} icon`} />
                            </div>
                            <div className={selectedAddressId === item.id ? 'HomeAddress Selected' : 'HomeAddress'}>{`${item.address_type} Address`}</div>
                        </div>
                        
                        <div className="Frame10">
                            <div className={selectedAddressId === item.id ? 'EnricSNeelamkavil Selected' : 'EnricSNeelamkavil'}>{item.name}</div>
                            <div className={selectedAddressId === item.id ? 'numberselect Selected' : 'numbernoselect'}>{`+91 ${item.phonenumber}`}</div>
                        </div>
                        <div className={selectedAddressId === item.id ? 'Neelamkavil Selected' : 'Neelamkavil'}>
                            {`${item.address}, ${item.pincode}`}
                        </div>
                    </div>
                ))}
    
                <div className='dottedline2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="338" height="2" viewBox="0 0 338 2" fill="none">
                    <path d="M0.25 1H337.75" stroke="#7519EB" stroke-dasharray="5 5"/>
                    </svg>
                </div>
                
            
                <div className="container2">
                    <div className="titleContainer2">
                        <div className="title2">Payment Details</div>
                    </div>
                    <div className="detailsContainer2">
                        <div className="rowContainer2">
                        <div className="row2">
                            <div className="label2">Item Price</div>
                            <div className="value2">{totalPrice}</div>
                        </div>
                        <div className="row2">
                            <div className="label2">Packing Charges</div>
                            <div className="value2">₹ 20.00</div>
                        </div>
                        </div>
                        <div className="separator2"></div>
                        <div className="row2">
                        <div className="totalLabel2">Total Amount</div>
                        <div className="totalValue2">₹ {overallTotalPrice}</div>
                        </div>
                    </div>
                </div>
                <div className="secondContainer2">
                    <div className="secondIconContainer2">
                        <div className="secondIcon2">
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
                    <div className="secondContentContainer2">
                        <div className="secondTitle2">Pay on Delivery (POD)</div>
                        <div className="secondDescription2">Pay by cash/ any UPI apps</div>
                    </div>
                </div>
            </div>
            <button className='orderbtn2' onClick={handleOrderSubmit}>
                <img className="bagicon"src={order} alt="bagicon"></img>
                <div className='placeorder'>Place order</div>
            </button>
                    
                
            <Navbar/>
            
        </div>
    );
}

export default Checkout;