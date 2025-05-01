import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function MiniCart({ visible }) {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!visible) return null;

  return (
    <div className="mini-cart">
      <p>{totalItems} item(s) in cart</p>
      <Link to="/cart" className="view-cart-button">View Full Cart</Link>
    </div>
  );
}
