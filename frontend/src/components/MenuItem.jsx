// MenuItem.jsx
import React, { useEffect, useState } from 'react';
import '../index.css';
import { useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import '../Toast.css'

const MenuItem = (props) => {
  const location = useLocation();
  const {addToCart} = useCart();
  const [showToast, setShowToast] = useState(false)

  const handleAddToCart = (title, price) =>{
    addToCart(props.title, props.price);
    setShowToast(true);
    setTimeout (()=> setShowToast(false), 2000) //Hides after 3 sec
  }

  return (
    <div className="menu-item">
      <div className="menu-item-img">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="menu-item-content">
        <div className="menu-item-title">
          <h3>{props.title}</h3>
          <span className="menu-item-price">{props.price}</span>
        </div>
        <p className="menu-item-desc">{props.desc}</p>
        <button className="add-to-cart" onClick={() => handleAddToCart(props.title, props.price)} >Add to Cart</button>
        {showToast && <div className="toast"> {props.title} Added to Cart </div>}
      </div>
    </div>
  );
};

export default MenuItem;
