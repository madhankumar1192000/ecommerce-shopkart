import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="page-padding">
      <h1 className="cart-title">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          {cart.map((item, idx) => (
            <div key={idx} className="cart-item">
              <div>
                <img src={item.image} alt="image" className="cart-image"/>
                <h2 className="cart-item-title">{item.title}</h2>
                <p>${item.price} × </p>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="quantity-input"
                />
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">Total: ${total}</div>
          <button className="remove-button" onClick={()=>alert(`Checkout ${cart.length} items for $${total}`)}>Checkout</button>
          
        </div>
      )}
    </div>
  );
}