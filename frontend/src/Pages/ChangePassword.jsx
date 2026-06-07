import React, { useState } from 'react'
import axios from 'axios';
import '../index.css'

const ChangePassword = () =>{
    const token = JSON.parse(sessionStorage.getItem('token'));
    const accessToken = token?.access;
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        'password': '',
        'password2': ''
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))


    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            console.log(accessToken);
            const response = await axios.post('http://127.0.0.1:8000/api/changePassword/', formData,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
            console.log(response.data);
            alert("Password Changed Successfully")
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

    return(
        <section className='signup-page'>
        <div className="box" name="signup" >
                <h1 class="heading" >Change Password</h1>
                <div>
                    <form id="signin-form" onSubmit={handleSubmit}>
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
                        <button type="submit" class="signup-btn">Change Password</button>
                    </form>
                </div>
            </div>
    </section>
    )
}

export default ChangePassword