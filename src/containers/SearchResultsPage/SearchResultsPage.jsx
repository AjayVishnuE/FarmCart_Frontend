import React from 'react';
import './SearchResultsPage.css'
import { useLocation } from 'react-router-dom';
import { Header, Navbar, ProductComponent, SearchBar } from '../../components';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';

function SearchResultsPage() {
  const location = useLocation();
  const { results, query } = location.state || { results: [], query: '' };
    console.log(results)
    console.log(query)
  return (
    <div>
        <div className='header2'>
            <img className='images1' src={bar} alt="bars"/>
            <SearchBar/>
            <img className='images2' src={cart} alt="cart"/>
        </div>
        <h3>Search Results for "{query}"</h3>
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
