import React, { useState } from 'react';
import './Login.css';
import Loginbox from './Loginbox';
import Signupbox from './SignupBox';

const Login = () => {
  const [boxName, setBoxName] = useState();
  const [buttonsClicked, setButtonsClicked] = useState(false);

  const gotologin = () => {
    setBoxName('login');
    setButtonsClicked(true);
  };

  const gotosignup = () => {
    setBoxName('signup');
    setButtonsClicked(true);
  };  

  return (
    <div className=''>
      <div className='container-fluid'>
        <div className='row align-items-center justify-content-center loginSec'>
          <div className='col-md-6 h-100 d-flex flex-column justify-content-center px-5 text-center blueCol'>

            {!buttonsClicked && (
              <>
                <div className='firstText'>
                  <h1 className='text-uppercase mb-3'>The Leading Luxury Real Estate Properties in UAE</h1>
                  <h3 className='mb-4'>Explore our latest proeprties</h3>
                </div> 
                <div>
                  <button className="btn primaryBtn my-3 me-4" onClick={gotologin}>Login</button>
                  <button className="btn primaryBtn my-3" onClick={gotosignup}>Register Now</button>
                </div>                
              </>
              )}

              {boxName === 'login' && <Loginbox setBoxName={setBoxName}/>}
              {boxName === 'signup' && <Signupbox setBoxName={setBoxName}/>} 
            </div>
          <div className='col-md-6 loginBg h-100'>
                       
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login