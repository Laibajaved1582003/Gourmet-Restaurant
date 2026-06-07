import React, { useState, useEffect } from 'react';
import '../index.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext'


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  const name = sessionStorage.getItem('name');
  const [showsidebar, setsidebar] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cartItems, deleteItem } = useCart();
  const cartLength = cartItems?.length || 0;
  
  useEffect(() => {
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        console.log("Token found:", parsedToken);
      } catch (e) {
        console.log("Error parsing token");
      }
    } else {
      console.log("No token found");
    }
  }, [token]);


  const account = () =>{
     return `Hi! ${name}`
  }

  const handleDelete = (itemToDelete) =>{
    deleteItem(itemToDelete);
  }

  const handleClick = () =>{
    setsidebar(prev => !prev)
  }
  return (
    <>
      <header>
        <div className="logo">
          <h1>Gourmet Haven</h1>
          <p>Fine Dining Experience</p>
        </div>
        <nav>
          <ul>
            <li>
              <a onClick={() => navigate('/')} className={location.pathname === '/' ? 'active' : ''}>Home</a>
            </li>
            <li>
              <a onClick={() => navigate('/menu')} className={location.pathname === '/menu' ? 'active' : ''}>Menu</a>
            </li>
            <li>
              <a onClick={() => navigate('/order-online')} className={location.pathname === '/order-online' ? 'active' : ''}>Order Online</a>
            </li>
            <li>
              <a onClick={() => navigate('/booking')} className={location.pathname === '/booking' ? 'active' : ''}>Book a Table</a>
            </li>
            <li>
              <a onClick={() => navigate('/about-us')} className={location.pathname === '/about-us' ? 'active' : ''}>About Us</a>
            </li>
            <li>
              <a onClick={() => navigate('/contact')} className={location.pathname === '/contact' ? 'active' : ''}>Contact</a>
            </li>
            <button className='btn' id='acc-btn' onClick={token ? handleClick : () => navigate('/signup')}>{token? account() : 'SIGN UP'}</button>
          </ul>
        </nav>
          {showsidebar && (
              <div className='sidebar' >
                <button className='sidebar-txt' onClick={() => navigate('/profile')} >Account</button>
                <button className='sidebar-txt' onClick={() => setShowCart(prev => !prev)}>Your Cart</button>
                {showCart && (
                  <> {cartLength === 0? (
                    <p className='empty-cart-msg'>🛒 Your cart is empty.</p>
                  ): 
                      <ul className={`cartItems ${showCart ? 'show' : ''}`}>
                        {cartItems.map((item, index) => (
                          <div className='cart-items-sidebar' >
                            <li key={index}>{item.title} (x{item.quantity}) - ${item.price * item.quantity}</li>
                              <i class="bi bi-trash delete-icon" onClick={()=>{
                                handleDelete(item.title)
                              }}></i>
                          </div>

                        ))}
                      </ul>
                   }
                  </>
                )}
                {cartLength>0 &&(
                  <button  className='checkout-btn' onClick={(e) =>{
                    e.preventDefault();
                    navigate('/order-online');
                  }}>
                    Proceed To CheckOut
                  </button>
              )}

                <button className='btn' onClick={() => {
                  sessionStorage.clear();
                  window.location.reload();
                }}>
                  Logout
                </button>
              </div>
            )}

        <div className="mobile-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </header>
    </>
  );
};


export default Header;
