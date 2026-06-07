import React, { useContext, useEffect, useState } from 'react'
import { useCart } from '../Context/CartContext';
import axios from 'axios';
import { jsPDF } from 'jspdf'; 
import '../Toast.css'
import '../index.css'

const Order = () =>{
    const { cartItems } = useCart();
    const name = sessionStorage.getItem('name');
    const cartLength = cartItems?.length || 0;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const accessToken = token?.access;
    const [orderId, setorderId] = useState('');
    const [showReceipt, setShowReceipt] = useState(false);
    let errorData;
    const [formData, setFormData] = useState({
        'name': '',
        'phone': '',
        'address': ''
    })

    const [orderData, setOrderData] = useState({
        'user': '',
        'TotalItems': '',
        'TotalAmount': '',
        'Order': '',
        'OrderStatus': ''
    })
    const [showToast, setShowToast] = useState(false);
    const [showOrderToast, setShowOrderToast] = useState(false);
    const [showErrorToast, setshowErrorToast] = useState(false);
    const totalAmount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))
    }

const handleCheckout = () => {
    const {name, phone, address} = formData;
    if (!name.trim() || !phone.trim() || !address.trim()){
        setShowToast(true);
        setTimeout (()=> setShowToast(false), 2000)
        console.log("Form is Empty");
    }
    else if (cartLength>0){
        handleData();
    }
};

const handleData = ()=>{
            const finalData = {
            TotalItems: cartLength,
            TotalAmount: totalAmount.toFixed(2),
            Order: cartItems.map(item => ({
                title: item.title,
                quantity: item.quantity,
                price: item.price
            })),
            OrderStatus: 'delivered'
        };
            setOrderData(finalData);
}

const postOrder = async () =>{
    try{
        const response = await axios.post('http://127.0.0.1:8000/api/add-order/', orderData,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
        const Order = response.data;
        setorderId(Order.order.id);
        setShowReceipt(true);
        setshowErrorToast(false);
        setShowOrderToast(true);
        setTimeout(() => setShowOrderToast(false), 2000);
    }
    catch(err){
        errorData = err.response.data;
        console.log(errorData);
        setShowReceipt(false);         
        setShowOrderToast(false);
        setshowErrorToast(true);
        setTimeout(() => setshowErrorToast(false), 2000);
    }
}


useEffect(()=>{
    if(orderData && orderData.TotalItems){
        postOrder(orderData);
    }
}, [orderData])

const handleDownload = () => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text('Receipt', 105, 20, null, null, 'center');

  // Customer Name
  doc.setFontSize(12);
  doc.setTextColor(70, 70, 70);
  doc.text(`Customer: ${name}`, 105, 28, null, null, 'center'); // under title

  // Order ID
  doc.setFontSize(11);
  doc.setTextColor(90, 90, 90);
  doc.text(`Order ID: ${orderId}`, 105, 34, null, null, 'center'); // under customer name

  // Line separator
  doc.setLineWidth(0.5);
  doc.line(20, 38, 190, 38);

  // Items
  let y = 45;
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);

  cartItems.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.title}`, 20, y);
    doc.text(`Qty: ${item.quantity}`, 120, y);
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 160, y);
    y += 10;
  });

  // Total
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.line(20, y + 5, 190, y + 5);
  doc.text(`Total: $${totalAmount.toFixed(2)}`, 160, y + 15);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for your order!', 105, y + 30, null, null, 'center');

  doc.save('receipt.pdf');
  setShowReceipt(false);
};


    return(
        <>
          <section id ="order" className="order-section">
            <h2>Order Online</h2>
            <div className="order-container">
                <div className="order-items">
                    <h3>Your Order</h3>
                    {cartLength>0 ? (
                      <div className='order-list'>
                       {cartItems.map((item, index) => {
                            return <p key={index}>{item.title} (x{item.quantity}) - ${item.price * item.quantity}</p>;
                        })}
                        </div>

                    ):
                    <div className="order-list" id="order-list">
                        <p className="empty-order">Your cart is empty. Add items from the menu.</p>
                    </div>  
                    }


                    <div className="order-total">
                        <p>Total: <span id="order-total">${(totalAmount).toFixed(2)}</span></p>
                    </div>
                    <button className="btn" id="checkout-btn" onClick={()=>{
                        handleCheckout();
                    }}> Proceed to Checkout</button>
                    {showToast && <div className="toast"> Please Fill the Delivery Form </div>}
                    
                    {showReceipt && (
                        <div className="receipt-modal">
                            <div className="receipt-content">
                            <h3>Your Receipt</h3>
                            <div className="cross-mark" onClick={() => setShowReceipt(false)}>
                              <i className="bi bi-x"></i>
                            </div>
                            <ul>
                                {cartItems.map((item, index) => (
                                <li key={index}>
                                    {item.title} (x{item.quantity}) - ${item.price * item.quantity}
                                </li>
                                ))}
                            </ul>
                            <p>
                                <strong>Total:</strong> $
                                {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                            </p>
                            <button className="download-btn" onClick={()=>{
                                handleDownload();                                
                                setShowOrderToast(true);
                                setTimeout (()=> setShowOrderToast(false), 2000)
                            }}>
                                <span>✅ Okay / Download Receipt</span>
                            </button>
                            </div>
                        </div>
                        )}
                        {showErrorToast && <div className='toast' >You have Already Placed the Order</div>}
                        {showOrderToast && <div className='toast' >Order Placed</div>}

                </div>
                <div className="delivery-info">
                    <h3>Delivery Information</h3>
                    <form id="delivery-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name='name' required  onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name='phone' required onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Delivery Address</label>
                            <textarea id="address" rows="3" name='address' required onChange={handleChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="instructions">Special Instructions</label>
                            <textarea id="instructions" rows="2" onChange={handleChange}></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default Order