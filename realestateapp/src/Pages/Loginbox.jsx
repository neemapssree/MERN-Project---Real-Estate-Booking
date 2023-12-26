import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { BASE_URL } from '../Constants/constants';

const Loginbox = ({setBoxName}) => {

  const [loginData, setLoginData] = useState(
    {
      email:'',
      password:'',
    }
  );

  // useEffect(()=> {
  //   console.log("Inside login useeffect", loginData);
  // },[loginData]);

  const handleLogin = (e) =>{
    e.preventDefault();
    try{      
      if(loginData.email && loginData.password) {
        axios.post(`${BASE_URL}/auth/login`,loginData).then((res)=>{
          
        });
      }else{
        toast.error('Credentials not filled');
      }
    } catch(err){
      console.log(err);
    }    
  };
  

  const gotoSignup = () => {
      setBoxName('signup');
  };

  return (    
    <div className='loginForm'>
        <h1 className='text-center mb-5'>Sign In</h1>
        <form>
            <div className="form-group my-3">
            <label htmlFor="email" className='mb-3'>Email</label>
            <input type="email" className="form-control customInput" id="email" name="email" placeholder="Enter Email" value={loginData.email} onChange={e=>{setLoginData({...loginData,email:e.target.value})}}/>                    
            </div>
            <div className="form-group my-3">
            <label htmlFor="password" className='mb-3'>Password</label>
            <input type="password" className="form-control customInput" id="password" name="password" placeholder="Password" value={loginData.password} onChange={e=>setLoginData({...loginData,password:e.target.value})} />
            </div>            
            <button type="submit" className="btn primaryBtn my-3" onClick={handleLogin}>Submit</button>
            <p>Don't have an account? <span onClick={gotoSignup} className='btn text-white' style={{textDecoration: 'underline'}}>Register here.</span></p>
        </form>
    </div>
  )
}

export default Loginbox