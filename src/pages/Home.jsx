import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MiniCart from "../components/MiniCart";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("inc");
  const [category, setCategory] = useState("all");
  const [showMiniCart, setShowMiniCart] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    let filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (category !== "all") {
      filtered = filtered.filter(product => product.category === category);
    }

    if (sortOrder === "inc") {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, sortOrder, category, products]);


  return (
    <div>
      <div style={{ padding: "10px" }}>
        <button onClick={() => setShowMiniCart(!showMiniCart)}>MiniCart</button>
      </div>
      <MiniCart visible={showMiniCart} />

      {/* top Section */}
      <section className="hero">
        <h1>Welcome to Shopkart</h1>
        <p>Make your shopping experience into next level!!!</p>
      </section>

      {/* Filters Section */}
      <section className="filter-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="inc">Price: Low to High</option>
          <option value="dec">Price: High to Low</option>
        </select>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <Link to={`/product/${product.id}`} className="view-details">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Shopkart. All rights reserved.</p>
      </footer>
    </div>
  );
}
