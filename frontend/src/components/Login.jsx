import React, { useRef, useState } from 'react'
import './Login.css'
import Room from '@mui/icons-material/Room'
import CancelIcon from '@mui/icons-material/Cancel';

import axios from 'axios'

export default function Login({setShowLogin, myStorage, setCurrentUser}) {

    const [fail,setFail] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        };
        try{
            const res = await axios.post("/users/login", user);
            myStorage.setItem("user",res.data.username)
            setCurrentUser(res.data.username)
            setShowLogin(false)
            setFail(false);
        }catch(err){
            setFail(true);
        }
    };

  return (
    <div className='loginContainer'>
        <div className='logo'>
            <Room />
            Travelog
        </div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='username' ref={nameRef} />
            <input type='password' placeholder='password' ref={passwordRef} />
            <button className='loginBtn'>Login</button>
            
            {fail && 
                <span className='fail'>Something Went Wrong</span>
            }
              
        </form>

        <CancelIcon className="loginCancel" onClick={() => setShowLogin(false)} />
      
    </div>
  )
}
