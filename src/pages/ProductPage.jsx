import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="page-padding">Loading...</div>;

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.title} className="product-detail-image" />
      <div>
        <h1 className="product-detail-title">{product.title}</h1>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}