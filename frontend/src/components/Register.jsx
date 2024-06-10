import React, { useRef, useState } from 'react'
import './Register.css'
import Room from '@mui/icons-material/Room'
import CancelIcon from '@mui/icons-material/Cancel';

import axios from 'axios'

export default function Register({setShowRegister}) {

    const [success,setSuccess] = useState(false);
    const [fail,setFail] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        try{
            await axios.post("/users/register", newUser);
            setFail(false);
            setSuccess(true);
        }catch(err){
            setFail(true);
        }
    };

  return (
    <div className='registerContainer'>
        <div className='logo'>
            <Room />
            Travelog
        </div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='username' ref={nameRef} />
            <input type='email' placeholder='email' ref={emailRef} />
            <input type='password' placeholder='password' ref={passwordRef} />
            <button className='registerBtn'>Register</button>
            
            {success && 
                <span className='success'>Succesfull. Login Now</span>
            }
            {fail && 
                <span className='fail'>Something Went Wrong</span>
            }
              
        </form>

        <CancelIcon className="registerCancel" onClick={() => setShowRegister(false)} />
      
    </div>
  )
}
