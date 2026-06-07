import React from 'react'
import '../index.css'


const OrderRow = (props) =>{
    return(
      <div className="order-table-container">
        <table className="order-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Items</th>
                <th>Total Amount</th>
                <th>Order</th>
              </tr>
            </thead>
          <tbody>
              <tr>
                  <td>{props.index}</td>
                  <td>{props.id}</td> 
                  <td>{new Date(props.OrderedAt).toLocaleString('en-Pk',{
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: 'false'
                  })}</td> 
                  <td>{props.OrderStatus}</td> 
                  <td>{props.TotalItems}</td> 
                  <td>{props.TotalAmount}</td> 
                  {props.Order.map((item, index) => (
                  <div key={index} className="order-item">
                      <p>{item.title} (x{item.quantity})</p>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  ))}
              </tr>
          </tbody>
        </table>
      </div>
    )
}


export default OrderRow