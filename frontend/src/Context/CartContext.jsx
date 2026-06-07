import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = sessionStorage.getItem('cartItems');
    return stored && stored !== "undefined" ? JSON.parse(stored) : [];

  });

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

const addToCart = (itemTitle, itemPrice) => {
  setCartItems(prevItems => {
    const existingIndex = prevItems.findIndex(item => item.title === itemTitle);
    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...prevItems];
      updatedCart[existingIndex].quantity += 1;

    } else {
      updatedCart = [...prevItems, { title: itemTitle, price: itemPrice, quantity: 1 }];
    }

    return updatedCart; 
  });
};

const deleteItem = (itemTitle) =>{
  setCartItems(prevItems =>{
    const index = prevItems.findIndex(item=> item.title === itemTitle)
    let updatedCart;
    updatedCart = [...prevItems];
    let item = updatedCart[index];

    if(item.quantity >1){
      updatedCart[index].quantity -=1;
      sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }else{
      updatedCart = cartItems.filter((item, i) => i !== index);
      sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
    return updatedCart;
  })
}


  return (
    <CartContext.Provider value={{ cartItems, addToCart, deleteItem}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
