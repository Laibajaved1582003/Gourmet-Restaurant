import React, { useState } from 'react';
import axios from 'axios';
import '../signup.css'
import { useNavigate, useLocation  } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    'email': '',
    'name': '',
    'tc': true,
    'password': '',
    'password2': ''
})

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log("Change");
        setCredentials(prev =>({
            ...prev,
            [name]: value
        }))
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("Submit");
        try{
            console.log(credentials)
            const response = await axios.post('http://127.0.0.1:8000/api/register/', credentials);
            alert('Registration Sucessfull')
            navigate('/')
            setErrors({});
            sessionStorage.setItem('token', JSON.stringify(response.data.token));
            sessionStorage.setItem('user', JSON.stringify(response.data));
            sessionStorage.setItem('name', credentials.name);
            console.log("Registered", response.data);
        }catch(err){
             if (err.response && err.response.data) {
                const errorData = err.response.data;
                if (errorData.error) {
                    setErrors(errorData.error); 
                } else {
                    setErrors(errorData); 
                }
                console.log("Error:", errorData);
            }
        }
    }

  return (
    <section className='signup-page'>
        <div className="box" name="signup" >
            <div  className='heading-container' >
                <h1 class="heading" >Sign In</h1>
                </div>
                <div>
                    <form id="signin-form" onSubmit={handleSubmit}>
                        <div class="form-grp" >
                            <label for="username">Name</label>
                            <input type="text" id="name" placeholder="Username" name="name" onChange={handleChange} required/>
                        </div>
                        <div class="form-grp" >
                            <label for="email">Email</label>
                            <input type="email" id="email" placeholder="Email" name="email" onChange={handleChange} required/>
                            {errors.email && <p className="error">{errors.email[0]}</p>}
                        </div>
                        <div class="form-grp" >
                            <label for="password">Password</label>
                            <input type="password" id="password" placeholder="Password" name="password" onChange={handleChange} required/>
                        </div>

                        <div class="form-grp" >
                            <label for="password">Confirm Password</label>
                            <input type="password" id="password2" placeholder="Confirm Password" name="password2" onChange={handleChange} required/>
                            {errors.non_field_errors && (
                                <p className="error">{errors.non_field_errors[0]}</p>
                            )}
                        </div>
                        <button type="submit" class="signup-btn">Sign Up</button>
                        <div class="login" >
                        <a onClick={()=>{navigate('/login')}} >Already a Customer? <span style={{ cursor: 'pointer', color: '#c99f28', fontWeight: 'bold' }}> Login </span></a>
                        </div>
                    </form>
                </div>
            </div>
    </section>
  );
};

export default Signup;




// import React, { useEffect, useState } from 'react'
// import '../signup.css'
// import axios from 'axios'


// const Signup = () =>{
//     return(
//         <>
//           <section className='signup-page' >
            // <div className="box" name="signup" >
            //     <h1 class="heading" >Sign In</h1>
            //     <div>
            //         <form id="signin-form" >
            //             <div class="form-grp" >
            //                 <label for="username">Name</label>
            //                 <input type="text" id="name" placeholder="Username" name="name" required/>
            //             </div>
            //             <div class="form-grp" >
            //                 <label for="email">Email</label>
            //                 <input type="email" id="email" placeholder="Email" name="email" required unique/>
            //             </div>
            //             <div class="form-grp" >
            //                 <label for="password">Password</label>
            //                 <input type="password" id="password" placeholder="Password" name="password" required/>
            //             </div>
            //             <button type="submit" class="signup-btn" >Sign Up</button>
            //             <div class="login" >
            //             <a href="{% url 'signin' %}" onclick="window.location.href=this.href; return true;" class="{%  if request.path == '/sign-in/' %} active {% endif %}">Already a Customer? Login</a>
            //             </div>
            //         </form>
            //         <a href="{% provider_login_url 'google' %}" class="google-btn">
            //             <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" class="google-icon"/>
            //             <span>Sign in with Google</span>
            //         </a>
            //     </div>
            // </div>
//         </section>
//         </>
//     )
// }

// export default Signup