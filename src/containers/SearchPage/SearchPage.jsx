import axios from 'axios';
import React,{useState, useEffect} from 'react';
import './searchpage.css'
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import { Loader, Navbar, ProductComponent, SearchBar} from '../../components';
import { Link } from 'react-router-dom';

function SearchPage(props) {
    const [isHovered, setIsHovered] = useState(false);
    const [recentSearchesquery, setRecentSearchesQuery] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [frequentSearches, setFrequentSearches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_ENDPOINTS.search}frequentrecent/`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setRecentSearches(response.data.recent_searches);
            setFrequentSearches(response.data.frequent_searches);
            setRecentSearchesQuery(response.data.recent_search_queries);
        } catch (error) {
            setError('Failed to load data');
            console.error('Error fetching data:', error);
        }
        setLoading(false);
        };

        fetchData();
    }, []);
    console.log(recentSearchesquery)
    console.log(recentSearches)
    console.log(frequentSearches)

    if (loading) return <Loader/>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className='searchpage-container'>
            <div className='header256'>
                <img className='logoimage75' src={bar} alt="bars" />
                <div className='searchbar-container-searchpage'>
                    <SearchBar/>
                </div>
                <Link className='cartimagecontainer32' to = "/cart">
                    <img className='cartimage' src={cart} alt="cart" />
                </Link>
            </div>
            <p className='recentup'>Recent Searches</p>
            <div className='searchlist'>
                {recentSearchesquery.slice(0,9).map((item, index) => (
                    <div className='searchitem'>{item}</div>
                ))}
            </div>
            <div className="searchtext">Recently Searched Products</div>
            <div className="recent-searches">
                <div className="mini-card-row">
                    {recentSearches.length > 0 ? (
                        recentSearches.slice(0, 4).map((item, index) => (
                        <div key={index} className='Productbox'>
                            <ProductComponent
                            id = {item.product_id}
                            name={item.product_name}
                            price={item.price}
                            image={item.product_image}
                            altText={`${item.product_name} image`} />
                        </div>
                        ))
                    ) : (
                        <p style={{marginLeft:"2%"}}>No recent searches</p>  
                    )}
                </div>
            </div>
            <div className='searchtext'>Frequently Searched Products</div>
            <div className="frequent-searches">
                <div className="mini-card-row">
                    {frequentSearches.length > 0 ? (
                        frequentSearches.slice(0,4).map((item, index) => (
                            <div key={index} className='Productbox'>
                                <ProductComponent
                                    id = {item.product_id}
                                    name={item.product_name}
                                    price={item.price}
                                    image={item.product_image}
                                    altText={`${item.product_name} image`} />
                            </div>
                        ))                    
                    ) : (
                        <p style={{marginLeft:"2%"}}>No frequent searches</p>  
                    )}
                </div>
            </div>
            <Navbar/>
        </div>
    );
}

export default SearchPage;