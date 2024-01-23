import './App.css';
import React , {useEffect, useRef, useState} from 'react';
import SpeechRecognition , {useSpeechRecognition} from 'react-speech-recognition';
// import { useSpeechSynthesis } from 'react-speech-kit';
import PDFFile from './components/formal';
import Insides from './components/datashow';
import SL from './components/sl';
import LateFee from './components/lateFee';
import Login from './components/logIn';
import Content from './components/content';
import Home from './components/HomePage';
// import '../node_modules/bootstrap/dist/'


function App() {
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  // const {speak} = useSpeechSynthesis();
  const [myname , setMyname] = useState('');
  const [foramalCommands , setCommand] = useState('');
  const [need,setNeed] = useState('');
  const [stopRec , setRec] = useState(false);
  const [verStatus,setVarStatus] = useState(true);
  // transcript clear state cancel at content page
  const [clearState,setClearState] = useState(false);
  // data is stored comes from the files which we used to declare the letters formatsW
  const [undefinedData,setUndefinedData] = useState({});
// for the reduce the bugs during the deletetion process
  var [customTranscript, setCustomTranscript] = useState('');
  // content creation commands callback from the content page
  const [contentCommands,setContentCommands] = useState([])
  const setCommandPage = (data) => {
    console.log(data);
    setContentCommands(data);
  }




  useEffect(() => {
    // speak({text:"hii how can i help you"})    
    startListening();
  },[]);

  const text = foramalCommands === '' ? myname : foramalCommands; 



useEffect(()=>{
  textTyper();
},[text]);


useEffect(()=>{
  // speak({text:"hii how can i help you"})
  },[foramalCommands]);


// pdf generation 
const [pdfText , SetPdfText] = useState('');
const [confStart , SetconfStart] = useState(false);

useRef(()=>{
  console.log(confStart);
},[confStart]);

const commands = [
{
  command: 'hello my name is *',
  callback: (name,{ resetTranscript }) => {setMyname(`hello ${name} how can i help you`);  resetTranscript()}
},
{
  command: 'hi my name is *',
  callback: (name,{ resetTranscript }) => {setMyname(`hello ${name} how can i help you`); resetTranscript()}
},
{
  command: 'my name is *',
  callback: (name,{ resetTranscript }) => {setMyname(`hello ${name} how can i help you`); resetTranscript()}
},
{
  command: 'greetings my name is *',
  callback: (name,{ resetTranscript }) => {setMyname(`hello ${name} how can i help you`); resetTranscript()}
},
{
  command: 'hello, you can call me *',
  callback: (name,{ resetTranscript }) => {setMyname(`hello ${name} how can i help you`); resetTranscript()}
},
{
  command: 'greetings i am *',
  callback: (name,{ resetTranscript }) => {setMyname(`hello ${name} how can i help you`); resetTranscript()}
},
{
  command: 'hi i am *',
  callback: (name,{ resetTranscript }) => {setMyname(`hello ${name} how can i help you`); resetTranscript()}
},
{
  command: 'can we start',
  callback: ({ resetTranscript }) => {setCommand(`yes how can i help you`); resetTranscript()}
},
{
  command: 'i want to create *',
  callback: (name,{ resetTranscript }) => {setCommand(`let's start to build the ${name} choose one of above`);
  name === "letter" ? setNeed("letter") : setNeed("");
  resetTranscript()}
},
{
  command: 'choose the formal',
  callback: ({ resetTranscript }) => {
    setCommand(`Opening the formal letter files`);
    setNeed("formal");
    resetTranscript()
    SpeechRecognition.stopListening();
    console.log("stopped listening from the main file");
    setRec(!stopRec);
  },
},
{
  command: 'choose the school leaving',
  callback: ({ resetTranscript }) => {
    setCommand(`Opening school leaving application`);
    setNeed("sl");
    resetTranscript()
    SpeechRecognition.stopListening();
    console.log("stopped listening from the main file");
    setRec(!stopRec);
  },
},
{
  command: 'choose the late fees submission application',
  callback: ({ resetTranscript }) => {
    setCommand(`late fee submission application application`);
    setNeed("latefee");
    resetTranscript()
    SpeechRecognition.stopListening();
    console.log("stopped listening from the main file");
    setRec(!stopRec);
  },
},
{
  command: 'start the creation',
  callback: ({ resetTranscript }) => {setCommand(`ok`); resetTranscript();SetPdfText('');  SetconfStart(true)}
},
{
  command: 'question mark',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
        words = words.split(" ").slice(0,-2);
    return words.join(" ")+' ? ';
  });resetTranscript()}
},
{
  command: 'stop the creation',
  callback: ({ resetTranscript }) => {
    SpeechRecognition.stopListening();
    setRec(!stopRec);
    SetPdfText(prev => {
      prev += transcript;
      var words = prev;
      words = words.split(" ").slice(0,-3);
      return words.join(" ")+' ? ';
    })
    resetTranscript();
  }
},
{
  command: 'start content creation',
  callback: ({ resetTranscript }) => {
    setCommand(`speak the content and then download it`);
    resetTranscript();
    setNeed('content');
    setClearState(!clearState);
  }
},
{
  command: 'asterisk sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
        words = words.split(" ").slice(0,-2);
    return words.join(" ")+' * ';
  });resetTranscript()}
},
{
  command: 'quotation mark',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
        words = words.split(" ").slice(0,-2);
    return words.join(" ")+' " ';
  });resetTranscript()}
},
{
  command: 'double inverted comma',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
        words = words.split(" ").slice(0,-2);
    return words.join(" ")+ ' " ';
  });resetTranscript()}
},
{
  command: 'apostrophe',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
        words = words.split(" ").slice(0,-2);
    return words.join(" ") + " ' ";
  });resetTranscript()}
},
{
  command: 'full stop sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' . ';
  });resetTranscript()}
},
{
  command: 'comma sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    
    words = words.split(" ").slice(0,-2);
    return words.join(" ")+' , ';
  });resetTranscript()}
},
{
  command: 'exclamation mark',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' ! ';
  });resetTranscript()}
},
{
  command: 'percentage sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' % ';
  });resetTranscript()}
},
{
  command: 'plus sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' + ';
  });resetTranscript()}
},
{
  command: 'minus sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    
    words = words.split(" ").slice(0,-2);
    return words.join(" ")+' - ';
  });resetTranscript()}
},
{
  command: 'colon sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' : ';
  });resetTranscript()}
},
{
  command: 'semi colon sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' ; ';
  });resetTranscript()}
},
{
  command: 'save it',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    
    words = words.split(" ").slice(0,-2);
    return words.join(" ");
  });resetTranscript()}
  // callback: ({ resetTranscript }) => {setCommand(`?`); SetPdfText(prev => prev + transcript); resetTranscript()}
},
{
  command: 'log out the session',
  callback: ({ resetTranscript }) => {
    console.log("under the logout process");
    logOut();
  }
  // callback: ({ resetTranscript }) => {setCommand(`?`); SetPdfText(prev => prev + transcript); resetTranscript()}
},
{
  command: 'clear',
  callback: ({ resetTranscript }) => {
    console.log("transcript cleared");
    if(clearState){
      setClearState(!clearState);
    }
    console.log("clear state at the clear command "+clearState);
  }
  // callback: ({ resetTranscript }) => {setCommand(`?`); SetPdfText(prev => prev + transcript); resetTranscript()}
},
{
  command: 'adapt it',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    words = words.split(" ").slice(0,-2);
    return words.join(" ");
  });resetTranscript()}
  // callback: ({ resetTranscript }) => {setCommand(`?`); SetPdfText(prev => prev + transcript)}
},
{
  command: 'refresh the page',
  callback: ({ resetTranscript }) => {window.location.reload();}
},
{
command: 'delete last * words',
  callback: (name) => {
    if (customTranscript && name) {
      let myDict = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10};
      let myD = {'1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10};
      var words = customTranscript.split(" ");
      let number = myDict[name] ? myDict[name] : myD[name];
      console.log(number);
      words = words.slice(0, 0 - (number + 4));
      customTranscript = words.join(" ");
      console.log(words);
      setCustomTranscript(customTranscript);
      console.log(customTranscript);
    } else {
      console.error('transcript or name is undefined.'+customTranscript);
    }
  }
}
]
  var{
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition( clearState ? {contentCommands} : {commands})

  // broser support
  if(!browserSupportsSpeechRecognition){
    return <span>Your Browser Dosent support Speech to Text</span>
  }

// console.log(confStart)
  // show the data to pages
const getInfoFromChild = (data,webRes) => {
    setUndefinedData(data);
    setCommand(webRes);
  }


// console.log(transcript);
// typing effect on the website response element

let typingTimeOut;

// typing effect useeffect
let countAlpha = 0; 
function textTyper() {
  const textNode = document.querySelector(".popUp");

  // Check if textNode and textNode.firstChild are not null
  if (textNode && textNode.firstChild) {
    textNode.firstChild.textContent = text.slice(0, countAlpha);
    countAlpha++;

    if (countAlpha <= text.length) {
      typingTimeOut = setTimeout(textTyper, 50);
    }
  } else {
    console.error('textNode or textNode.firstChild is null');
  }
}

if(countAlpha > text.length){
   clearTimeout(typingTimeOut);
}

customTranscript = transcript;

const transOp = (data) => {
  console.log("i called");
  setCustomTranscript(data);
}

const verify = () => {
  setVarStatus(!verStatus);
}


// logout the user
const logOut = () => {
  fetch('http://localhost:3001/logout',{
      method:"POST",
      headers:{
      'Content-Type':'application/json'
      },
      credentials:'include',
      body: JSON.stringify({
          userId : "",
          password: ""
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
          console.log("LogedOut");
          // props.authState();
          setVarStatus(!verStatus);
      } else {
          console.log("Didn't LogOut");
      }
  })
  .catch(err => {
      console.error('Error during login:', err);
  })
}


const checkAuthStatus = () => {
  fetch('http://localhost:3001/checkAuth', {
      method: "Get",
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'include'
      })
      .then(response => {
      if (response.ok) {
          // Response is successful
          return response.json();
      } else {
          // Response is not successful
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      })
      .then(data => {
      // Process the JSON response
      console.log(data);
      })
      .catch(err => {
           console.error('Error during fetching:', err);
  });
}

  return (

    <div>
      {
        verStatus == false
        ?
        (
          <Home/>
        // <>
        // <Login veriStatus = {verify} StartRec={stopRec} transOp={transOp} transcript={transcript} theTranscript={customTranscript}  transReset={resetTranscript}  Text = {confStart ? pdfText : ''}/>
        // <button onClick={checkAuthStatus}>checkAuthStatus</button>
        // </>
        )
        
        :
        <div className='display'>
            <div className='container-fluid'>
              <div className='row'>
                      <div className='col col-lg-6 col-md-6 col-sm-12 col-12 providingText'>
                    <p>{need === "content" ? '':customTranscript}</p>
              {/* <h1>{foramalCommands === '' ? myname : foramalCommands}</h1> */}
                        {
                          need === 'letter' ? 
                          (
                            <>
                            <h3>Formal</h3>
                            <h3>School Leaving Application</h3>
                            <h3>Late Fee Submission application</h3>
                            </>
                          ): need === 'content' ?
                          <h3>Speak Your Content then download it</h3>:
                          (
                            <>
                            <Insides data={undefinedData} need={need}/>
                            </>
                          )
                        }
                      </div>
                      <div className='col col-lg-6 col-md-6 col-sm-12 col-12 pdf'>
                        {
                          need === 'formal' ?
                          <PDFFile StartRec={stopRec} need={need} transOp={transOp} theTranscript={customTranscript}  transReset={resetTranscript} dataPass={getInfoFromChild} Text = {confStart ? pdfText : ''}/> 
                          : need === "sl" ? 
                          <SL StartRec={stopRec} transOp={transOp} need={need} theTranscript={customTranscript}  transReset={resetTranscript} dataPass={getInfoFromChild} Text = {confStart ? pdfText : ''}/> 
                          : need === 'latefee' ?
                          <LateFee StartRec={stopRec} need={need} transOp={transOp} theTranscript={customTranscript}  transReset={resetTranscript} dataPass={getInfoFromChild} Text = {confStart ? pdfText : ''}/> 
                          : need === 'content' ?
                          <Content need={need} transcript={customTranscript} setcommand={setCommandPage}/>:''
                        }
                      </div>  
                    </div>
                  </div>
                <div className='popUp'>
                  <h6 className='webCommand'>.</h6>
                </div>
        </div>
      }
      </div>
  );
}

export default App;
