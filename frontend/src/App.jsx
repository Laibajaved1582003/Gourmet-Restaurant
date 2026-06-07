import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import Header from './components/Header'
import Home from './Pages/Home'
import Signup  from './Pages/Signup';
import Footer from './components/Footer'
import Menu from './Pages/Menu'
import Order from './Pages/Order'
import Booking from './Pages/Booking';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import ChangePassword from './Pages/ChangePassword'
import { CartProvider } from './Context/CartContext';
import Account from './Pages/Account';
import OrderHistory from './Pages/OrderHistory';

// const App = ()=>{
//   //     const [customer, setCustomer] = useState([])

//   // useEffect(()=>{
//   //   async function getAllStudents(){
//   //     try{
//   //       const customer = await axios.get("http://127.0.0.1:8000/api/customer/")
//   //       console.log(customer.data)
//   //       setCustomer(customer.data)
//   //     }catch(error){
//   //       console.log(error)
//   //     }
//   //   }
//   //   getAllStudents()
//   // }, [])
//     return(
//     // <div className="App">
//     //   <h1>App.jsx File Customer Data</h1>
//     //   {
//     //     customer.map((customer, i)=>{
//     //       return(
//     //         <h2 key={i} >{customer.name} {customer.email}</h2>
//     //       )
//     //     })
//     //   }
//     // </div>
//     <div>
//       <Header/>
//         <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="signup/" element={<Signup/>} />
//         </Routes>
//     </div>
//     );
// };


const App = () => {
  return (
    <>
    <CartProvider>
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order-online" element={<Order/>} />
            <Route path="/booking" element={<Booking/>} />
            <Route path="/about-us" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/login" element={<Login />} />
            <Route path='/changePassword' element={<ChangePassword/>}/>
            <Route path='/profile' element={<Account/>}/>
            <Route path='/add-order' element={<OrderHistory/>}/>
          </Routes>
          <Footer/>
      </Router>
    </CartProvider>
    </>
  );
};
export default App

    // <Header/>
    // <Routes>
    //   <Route path='/about' element={<About/>} />
    //   <Route path='/contact' element={<Contact/>} />
    //   <Route path='/product' element={<Product/>} />
    //   <Route path='/' element={<Home/>} />
    // </Routes>

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/menu" element={<Menu />} />
    //     {/* Add more routes here */}
    //   </Routes>
    // </Router>

