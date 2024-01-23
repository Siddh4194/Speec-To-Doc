import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Login(props){
    var transcript = props.transcript;
    const [state,setState] = useState(true);
    const [userData,setUserData] = useState({
        name:'',
        userId:'',
        password:''
    })
    const handleClick = () => {
        setState(!state);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    };



    // voice commands
    const commands = [
        {
          command: 'name is *',
          callback: (name ) => {userData.name = name; props.transReset()}
        },
        {
          command: 'my name is *',
          callback: (name ) => {userData.name = name; props.transReset()}
        },
        {
          command: 'username is *',
          callback: (name ) => {userData.userId = name.replace(/ /g, "").toLowerCase(); props.transReset()}
        },
        {
          command: 'password is *',
          callback: (name ) => {userData.password = name.replace(/ /g, "").toLowerCase();console.log(name); props.transReset()}
        },
        {
          command: 'sign up',
          callback: (name ) => {signUp(); props.transReset()}
        },
        {
          command: 'login',
          callback: (name ) => {logIn(); props.transReset()}
        },
        {
          command: 'go to sign up',
          callback: (name ) => {setState(!state); props.transReset()}
        },
        {
          command: 'go to login',
          callback: (name ) => {setState(!state); props.transReset()}
        },
        {
            command: 'clear',
            callback: () => props.transReset()
        }
      ];
       const startListening = () => SpeechRecognition.startListening({ continuous: true });
       useEffect(() =>startListening)
      var{
        transcripts,
        listening,
        resetTranscript ,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition({commands});
      console.log(transcript);
      // broser support
      if(!browserSupportsSpeechRecognition){
        return <span>Your Browser Dosent support Speech to Text</span>
      }

    const logIn = () => {
        // console.log(userData);
        fetch('http://localhost:3001/login',{
            method:"POST",
            headers:{
            'Content-Type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify({
                userId : userData.userId,
                password: userData.password
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => {
            if(data.status === true){
                console.log("LogedIn");
                // props.authState();
                props.veriStatus();
            } else {
                console.log("Didn't LogIn");
            }
        })
        .catch(err => {
            console.error('Error during login:', err);
        })
    }

    const signUp = () => {
        console.log(userData);
        fetch('http://localhost:3001/register',{
            method:"POST",
            headers:{
            'Content-Type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify({
                userId : userData.userId,
                password: userData.password,
                name: userData.name
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => {
            if(data.status === true){
                console.log("LogedIn");
                // props.authState();
                setState(!state);
                setUserData({
                    name:'',
                    userId:'',
                    password:''
                })
            } else {
                console.log("Didn't LogIn");
            }
        })
        .catch(err => {
            console.error('Error during login:', err);
        })
    }
    return (
        <div className='logIN'>
            <div className="transcript">{transcript}</div>
            {
                state ? (
                    <div className="logDiv">
                        <h2>Login</h2>
                        <div className='input-container'>
                            <input type="text" name="userId" id="" value={userData.userId} onChange={handleChange} placeholder='User Id'/>
                            <input type="password" name='password' value={userData.password} onChange={handleChange} placeholder='password'/>
                            <button onClick={logIn}>LogIn</button>
                        </div>
                        <div>
                            <h6>Never have an account</h6>
                            <h5 onClick={handleClick}>Sign Up</h5>
                        </div>
                    </div>
                ) : (
                    <div className="logDiv">
                        <h3>Sign Up</h3>
                        <div>
                            <input type="text" name="name" id="" value={userData.name} onChange={handleChange} placeholder='name'/>
                            <input type="text" name="userId" id="" value={userData.userId} onChange={handleChange} placeholder='User Id'/>
                            <input type="password" name='password' value={userData.password} onChange={handleChange} placeholder='password'/>
                            <button onClick={signUp}>SignUp</button>
                        </div>
                        <div>
                            <h6>Never have an account</h6>
                            <h5 onClick={handleClick}>Log  In</h5>
                        </div>
                    </div>
                )
            }
        </div>
    )
}