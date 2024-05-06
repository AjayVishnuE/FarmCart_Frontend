import React, { useState, useEffect }  from 'react';
import './Orders.css';
import axios from 'axios';
import { Header, Loader, Navbar} from '../../components';
import intransit from '../../Images/wpf_in-transit.svg';
import delievered from '../../Images/package-delivered.svg';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import { Rating } from 'react-simple-star-rating';


function Orders(props) {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('accessToken'); 
    // const [rating, setRating] = useState(0);
    const [rating, setRating] = useState(0)
    const [comments, setComments] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.profile}consumerprofile/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProfileData(data);
                const initialRating = {};
                const initialComments = {};
                const deliveredOrders = data.orders.filter((order) => order.order_status === 'Delivered');
                data.orders.forEach((order) => {
                    order.order_details.forEach((orderdetail) => {
                        const product_id = orderdetail.product_details.product_id;
                        initialRating[product_id] = 0;
                        initialComments[product_id] = '';
                    });
                });
                setRating(initialRating);
                setComments(initialComments);
    
                deliveredOrders.forEach(async (order) => {
                    order.order_details.forEach(async (orderdetail) => {
                        const product_id = orderdetail.product_details.product_id;
                        try {
                            const existingReview = await axios.get(`${API_ENDPOINTS.reviews}read/${product_id}`, {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`,
                                },
                            });
                            if (existingReview && existingReview.data) {
                                const existingRating = existingReview.data.rating;
                                const existingComment = existingReview.data.comment;
                                setRating((prevRating) => ({
                                    ...prevRating,
                                    [product_id]: existingRating,
                                }));
                                setComments((prevComments) => ({
                                    ...prevComments,
                                    [product_id]: existingComment,
                                }));
                            }
                        } catch (error) {
                            console.error('Error fetching existing review:', error);
                        }
                    });
                });
            } catch (error) {
                console.error('Error fetching consumer profile:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [accessToken]); 

    const handleRatingChange = (product_id, newRating) => {
        setRating((prevRating) => ({
          ...prevRating,
          [product_id]: newRating,
        }));
      };
    
      const handleCommentChange = (product_id, event) => {
        const newComment = event.target.value;
        setComments((prevComments) => ({
          ...prevComments,
          [product_id]: newComment,
        }));
      };

      const handleSubmitReview = async (product_id) => {
        try {
            if (rating[product_id] && comments[product_id]) {
                let reviewResponse;
                try {
                    reviewResponse = await axios.get(`${API_ENDPOINTS.reviews}read/${product_id}/`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        reviewResponse = null;
                    } else {
                        console.error('Error fetching existing review:', error);
                        return; 
                    }
                }
    
                if (reviewResponse && reviewResponse.data) {
                    await axios.put(`${API_ENDPOINTS.reviews}update/${reviewResponse.data.review_id}/`, {
                        product: product_id,
                        rating: rating[product_id],
                        comment: comments[product_id],
                    }, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });
                    console.log('Review updated');
                } else {
                    await axios.post(`${API_ENDPOINTS.reviews}create/`, {
                        product: product_id,
                        rating: rating[product_id],
                        comment: comments[product_id],
                    }, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });
                    console.log('New review submitted');
                }
            } else {
                console.error('Rating and comment are required');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };
    

    //   const handleSubmitReview = async (product_id) => {
    //     const accessToken = localStorage.getItem('accessToken'); 
    //     try {
    //       const response = await axios.post(`${API_ENDPOINTS.reviews}reviews/`, {
    //         product: product_id,
    //         rating: rating[product_id],
    //         comment: comments[product_id],
    //       }, {
    //         headers: {
    //           'Authorization': `Bearer ${accessToken}`,
    //         },
    //       });
    //       console.log('Review submitted:', response.data);
    
    //     } catch (error) {
    //       console.error('Error submitting review:', error);
    //     }
    //   };

    if (isLoading) return <Loader/>;
    if (error) return <div>Error: {error}</div>;
    if (!profileData) return <div>No profile data found</div>;

    const getStatusInfo = (status) => {
        switch (status) {
            case 'Placed':
                return { icon: intransit, text: 'Order Placed' };
            case 'Shipped':
                return { icon: intransit, text: 'In Transit' };
            case 'Delivered':
                return { icon: delievered, text: 'Delivered' };
            default:
                return { icon: intransit, text: 'Status Unknown' }; 
        }
    };
    return (
        <div className='order-overall-container'>
            <Header/>
            <div className='orderstitle12'>My orders</div>
            {profileData.orders.map((order,orderIndex)=>
                <div className="order-21" key={order.order_id}>
                    {order.order_details.map((orderdetail,detailIndex)=>
                        <div key={detailIndex} className='order-box-container'>
                            <div className='order-box-1-item'>
                                <div className='order-left'>
                                        <img className='order1-pic' src={API_ENDPOINTS.media + orderdetail.product_details.product_image} alt="lemonpic"></img>
                                </div>
                                <div className='order-right'>
                                    <div className="leftdiv">
                                        <div className="text-wrapper">{orderdetail.product_details.product_name}</div>
                                        <div className="text-wrapper-2">INR {orderdetail.product_details.price}</div>
                                    </div>
                                    <div className="element-wrapper">
                                        <p className="element">
                                        <span className="span">{orderdetail.quantity}</span>
                                        <span className="text-wrapper-3">kg</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        {getStatusInfo(order.order_status).text === 'Delivered' && (
                            <div className='rating-container'>
                                <div className='ratingreview'>
                                    <div className='ratingcontainer56'>
                                        <Rating
                                            name={`rating-${orderdetail.product_details.product_id}`}
                                            className='ratingcomponent23'
                                            starCount={0}
                                            initialValue={rating[orderdetail.product_details.product_id] || 0}
                                            value={rating[orderdetail.product_details.product_id] || 0}
                                            onClick={(newRating) => handleRatingChange(orderdetail.product_details.product_id, newRating)}
                                        />
                                    </div>
                                    <textarea
                                        className='textareainrating'x
                                        type="text" 
                                        name = {`comment-${orderdetail.product_details.product_id}`}
                                        value={comments[orderdetail.product_details.product_id] || ''}
                                        onChange={(event) => handleCommentChange(orderdetail.product_details.product_id, event)}
                                        placeholder='Any Comments?...'
                                    />
                                </div>
                                <button 
                                    className='review-sbmt-btn' 
                                    onClick={() => handleSubmitReview(orderdetail.product_details.product_id)}
                                >
                                    Submit Review
                                </button>
                            </div>
                        )}
                    </div>
                    )}
                    <div className='orderstatus'>
                        <div className="statusframe">
                            <div className="status-wrapper">STATUS</div>
                            <img className="in-transit" alt="Wpf in transit" src={getStatusInfo(order.order_status).icon} />
                            <div className="transitdiv">{getStatusInfo(order.order_status).text}</div>
                        </div>
                        <div className='totalbox'>
                            <div className="rowContainerpro">
                                <div className="rowpro">
                                    <div className="labelpro">Order Price</div>
                                    <div className="pricevaluepro">₹ {order.total_price-20}</div>
                                </div>
                                <div className="rowpro">
                                    <div className="labelpro">Packing Charges</div>
                                    <div className="packvaluepro">₹ 20.00</div>
                                </div>
                            </div>
                            <div className="separator"></div>
                            <div className="row">
                                <div className="totalLabel">Total Amount</div>
                                <div className="totalValue">₹ {order.total_price}</div>
                            </div>
                        </div>
                    </div>
                </div>
                )}

        <Navbar/>
        </div>
    );
}

export default Orders;