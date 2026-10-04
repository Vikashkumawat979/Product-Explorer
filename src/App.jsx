import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState(null);

  const getProduct = async () => {
    if (!query.trim()) return; 

    try {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
    
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getDetail = async (productId) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      setDetail(response.data);
    } catch (error) {
      console.error('Error fetching product detail:', error);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setProducts([]);
    setDetail(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getProduct();
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="main-div">
          <div className="navbar">
            <div className="all-heding">
              <div className="heding">
                <h1 className="Product-Explorer">Product Explorer</h1>
                <p className="heding-p">Search and find your favourite products</p>
              </div>

              <div className="search-btn">
                <div className="search">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <div className="button">
                  <button className="btn" type="submit">
                    Search
                  </button>
                </div>

                <div className="button">
                  <button onClick={clearSearch} className="btn-Clear" type="button">
                    Clear
                  </button>
                </div>
              </div>

              <div className="image">
                <img src="/online-shopping.png" alt="shopping" />
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="products-grid">
        {products.map((item) => (
          <div className="product-item" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <h2>{item.title}</h2>
            <h4>Rs {item.price}</h4>
            <h4>Rating: {item.rating}</h4>
            <h4>Category: {item.category}</h4>

            <button type="button" onClick={() => getDetail(item.id)}>
              View Details
            </button>

            {detail && detail.id === item.id && (
              <div className="Product-detail">
                <h3>Detail:</h3>
                <p>{detail.description}</p>
                <p>Brand: {detail.brand}</p>
                <p>Stock: {detail.stock}</p>
              </div>
            )}
          </div>
        ))}
      </div >
    </>
  );
}

export default App; 