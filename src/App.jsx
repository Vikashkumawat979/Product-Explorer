import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const getProduct = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);

      setProducts(response.data.products || []);
    } 
    catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getDetail = async (productId) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      setDetail(response.data);
      setSelectedImage(response.data.thumbnail);
    } catch (error) {
      console.error('Error fetching product detail:', error);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setProducts([]);
    setDetail(null);
    setSelectedImage(null);
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

      <div className="products-container">
        <div className="products-grid">
          {products.map((item) => (
            <div className="product-item" key={item.id}>
              <div className="img-box">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <h2>{item.title}</h2>
              <div className="price-rating">
                <span className="price">RS {item.price}</span>
                <span className="rating">★ {item.rating}</span>
              </div>
              <p className="category">{item.category}</p>

              <button type="button" onClick={() => getDetail(item.id)}>
                View Details →
              </button>
            </div>
          ))}
        </div>

        {detail && (
          <div className="Product-detail">
            <div className="detail-header">
              <h3>Product Details</h3>
              <button className="close-btn" onClick={() => setDetail(null)}>×</button>
            </div>

            {/* <div className="detail-img-box">
              <img src={detail.thumbnail} alt={detail.title} />
            </div> */}
            <div className="gallery-section">
              <div className="detail-img-box">
                <img src={selectedImage || detail.thumbnail} alt={detail.title} />
              </div>

              <div className="thumbnails-list">
                {detail.images && detail.images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`${detail.title} view ${index + 1}`}
                    className={`thumb-img ${selectedImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setSelectedImage(imgUrl)}
                  />
                ))}
              </div>
            </div>

            <div className="detail-info">
              <h2>{detail.title}</h2>

              <div className="rating-review">
                <span className="star">★ {detail.rating}</span>
                <span className="reviews">({detail.reviews ? detail.reviews.length : 120} reviews)</span>
                <span className="stock-badge">In Stock</span>
              </div>

              <div className="detail-price-rating">
                <span className="price">RS {detail.price}</span>
                <span className="category-tag">{detail.category}</span>
              </div>

              <p className="description">{detail.description}</p>
              <div className="meta-info">
                <div className="meta-item">
                  <span>🏷️ Brand</span>
                  <strong>{detail.brand || 'N/A'}</strong>
                </div>
                <div className="meta-item">
                  <span>🔲 Category</span>
                  <strong>{detail.category}</strong>
                </div>
                <div className="meta-item">
                  <span>📦 Stock</span>
                  <strong>{detail.stock}</strong>
                </div>
                <div className="meta-item">
                  <span>📊 SKU</span>
                  <strong>{detail.sku || `SKU-${detail.id}`}</strong>
                </div>
                <div className="meta-item">
                  <span>⚖️ Weight</span>
                  <strong>{detail.weight ? `${detail.weight} kg` : '0.1 kg'}</strong>
                </div>
              </div>

              <button className="add-to-cart-btn">🛒 Add to Cart</button>
            </div>
          </div>
        )}
      </div>

      {/* <div className="detail-info">
              <h2>{detail.title}</h2>
              <span className="stock-badge">In Stock</span>

              <div className="detail-price-rating">
                <span className="price">RS {detail.price}</span>
                <span className="category-tag">{detail.category}</span>
              </div>

              <p className="description">{detail.description}</p>

              <div className="meta-info">
                <p><strong>Brand:</strong> {detail.brand}</p>
                <p><strong>Category:</strong> {detail.category}</p>
                <p><strong>Stock:</strong> {detail.stock}</p>
              </div>

              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        )}
      </div> */}

      {/* <div className="products-grid">
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
      </div > */}
    </>
  );
}

export default App; 