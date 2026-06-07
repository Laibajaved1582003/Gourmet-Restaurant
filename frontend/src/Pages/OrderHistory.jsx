import React, { useState , useEffect} from 'react'
import '../index.css'
import axios from 'axios'
import OrderRow from '../components/OrderRow'


const OrderHistory = () =>{
    const token = JSON.parse(sessionStorage.getItem('token'));
    const accessToken = token?.access;
    const [Orderdata, setData] = useState({
        'user': '',
        'TotalItems': '',
        'TotalAmount': '',
        'Order': '',
        'OrderStatus': ''
    })
    const getData = async () =>{
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/add-order/', {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setData(response.data);
            console.log(response.data);
            console.log(Orderdata);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
    getData(); // Call once when component mounts
  }, []);

    return (
        <section className='profile-page'>
            <div className="order-box" >
                {Array.isArray(Orderdata) &&  Orderdata.length>0 ? 
                Orderdata.map((order, index)=>{
                    return(
                        <OrderRow 
                        key={index} 
                        index = {index +1}
                        id={order.id}  
                        TotalItems = {order.TotalItems}  
                        TotalAmount = {order.TotalAmount} 
                        OrderedAt = {order.OrderedAt}
                        Order = {order.Order} 
                        OrderStatus={order.OrderStatus} />
                    )
                }): <p className='no-order' >No orders found at the moment</p> }
            </div>

        </section>
    )
}

export default OrderHistory



// <div className="profile-box" name="signup" >
//                         <h1 class="profile-heading" >{`${firstName}'s Profile `}</h1>
//                         <div>
//                         <div className="email-container">
//                             <p className="profile-label">📧 Email ID</p>
//                             <div className="profile-email" onClick={handleCopy} title="Click to copy">
//                                 {email}
//                                 <FaRegCopy className="copy-icon" />
//                             </div>
//                             {copied && <span className="copied-msg">Copied!</span>}
//                         </div>
        
//                         <div className="email-container">
//                             <button type="submit" class="cp-btn">Your Orders</button>                    
//                         </div>
        
//                             <div className="changePassword">
//                                 <button type="submit" class="cp-btn" onClick={()=> navigate('/changePassword')} >Change Password</button>
//                             </div>
//                         </div>
//                     </div>