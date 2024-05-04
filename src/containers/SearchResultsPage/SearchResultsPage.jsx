import React from 'react';
import './SearchResultsPage.css'
import { useLocation } from 'react-router-dom';
import { Header, Navbar, ProductComponent, SearchBar } from '../../components';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';
import { Link } from 'react-router-dom';

function SearchResultsPage() {
  const location = useLocation();
  const { results, query } = location.state || { results: [], query: '' };
    console.log(results)
    console.log(query)
  return (
    <div className='seemore-overall-container'>
        <div className='header2'>
        <img className='logoimage' src={bar} alt="bars" />
            <SearchBar/>
            <Link to = "/cart">
                    <img className='cartimage' src={cart} alt="cart" />
                </Link>
        </div>
        <h3 className='search-result'>Search Results for "{query}"</h3>
        <div className="searchresults-container">
        {results.map((item, index) => (
            <div key={index} className='Productbox'>
            <ProductComponent
                id={item.product_id}
                name={item.product_name}
                price={item.price}
                image={item.product_image}
                altText={`${item.product_name} image`}
            />
            </div>
        ))}
        </div>
        <Navbar/>
    </div>
  );
}

export default SearchResultsPage;
