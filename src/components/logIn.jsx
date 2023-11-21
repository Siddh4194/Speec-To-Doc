import React, { useState } from 'react';

export default function Login(props){
    const [state,setState] = useState(false);
    const handleClick = () => {
        setState(!state);
    }
    return (
        <div className='logIN'>
    {
        state ? (
            <div className="logDiv">
                <h2>Login to Your Account</h2>
                <div className='input-container'>
                    <input type="text" name="user-name" id="" placeholder='User Id'/>
                    <input type="password" name='password' placeholder='password'/>
                </div>
                <div>
                    <h6>Never have an account</h6>
                    <h5 onClick={handleClick}>Sign Up</h5>
                </div>
            </div>
        ) : (
            <div className="logDiv">
                <h2>Sign Up</h2>
                <div>
                    <input type="text" name="full-name" id="" placeholder='name'/>
                    <input type="text" name="user-name" id="" placeholder='User Id'/>
                    <input type="password" name='password' placeholder='password'/>
                </div>
                <div>
                    <h6>Never have an account</h6>
                    <h5 onClick={handleClick}>Sign Up</h5>
                </div>
            </div>
        )
    }
</div>

    )
}