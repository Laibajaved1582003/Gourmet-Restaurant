import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation  } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa';
import axios from 'axios';
import '../index.css'

const Account = () =>{
    const token = JSON.parse(sessionStorage.getItem('token'));
    const [UserData, setUserData] = useState([])
    const accessToken = token?.access;
    const username = UserData.name;
    const firstName = username ? username.split(" ")[0] : "";
    const navigate = useNavigate()
    const [copied, setCopied] = useState(false);
    const email = UserData.email;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
    

    useEffect(()=>{
     const GetData = async () =>{
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setUserData(response.data);
        }catch(err){
            console.log(err);
        }
    };
    GetData();
    }, [])


    return(
        <section className='profile-page'>
        <div className="profile-box" name="signup" >
                <h1 class="profile-heading" >{`${firstName}'s Profile `}</h1>
                <div>
                <div className="email-container">
                    <p className="profile-label">📧 Email ID</p>
                    <div className="profile-email" onClick={handleCopy} title="Click to copy">
                        {email}
                        <FaRegCopy className="copy-icon" />
                    </div>
                    {copied && <span className="copied-msg">Copied!</span>}
                </div>

                <div className="email-container">
                    <button type="submit" class="cp-btn" onClick={()=> navigate('/add-order')} >Your Orders</button>                    
                </div>

                    <div className="changePassword">
                        <button type="submit" class="cp-btn" onClick={()=> navigate('/changePassword')} >Change Password</button>
                    </div>
                </div>
            </div>
    </section>
    )
}

export default Account