import './App.css';
import React , {useEffect, useRef, useState} from 'react';
import SpeechRecognition , {useSpeechRecognition} from 'react-speech-recognition';
// import { useSpeechSynthesis } from 'react-speech-kit';
import PDFFile from './components/PdfCreator';
import Login from './components/logIn';
function App() {
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  // const {speak} = useSpeechSynthesis();
  const [myname , setMyname] = useState('');
  const [foramalCommands , setCommand] = useState('');
  const [need,setNeed] = useState('');
  const [stopRec , setRec] = useState(false);
  const [undefinedData,setUndefinedData] = useState({});
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
  command: 'delete last three words',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    words = words.split(" ").slice(0,-7);
    return words.join(" ");
  });resetTranscript()}
},
{
  command: 'delete last 3 words',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    words = words.split(" ").slice(0,-7);
    return words.join(" ");
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
}
]
  var{
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands})

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



// typing effect on the website response element

let typingTimeOut;

// typing effect useeffect
let countAlpha = 0; 
function textTyper(){
   const textNode = document.querySelector(".popUp");
   textNode.firstChild.textContent = text.slice(0,countAlpha);
   // console.log(text.slice(0,countAlpha));
   countAlpha++;   
   if(countAlpha <= text.length){
      typingTimeOut = setTimeout(textTyper,50)
   }
}
if(countAlpha > text.length){
   clearTimeout(typingTimeOut);
}




  return (

    <div>
      {/* <Login/> */}
        <div className='display'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col col-lg-6 col-md-6 col-sm-12 col-12 providingText'>
                <p>{transcript}</p>
                {/* <h1>{foramalCommands === '' ? myname : foramalCommands}</h1> */}
                {
                  need === 'letter' ? 
                  (
                    <>
                    <h3>Formal</h3>
                    <h3>In Formal</h3>
                    </>
                  ): need === 'formal' ? 
                  (
                   <div className='userData'>
                    <h6>Name :- {undefinedData["Your Full Name"]}</h6>
                    <h6>CITY :- {undefinedData.city}</h6>
                    <h6>SubDivision / Taluka :- {undefinedData["SubDivision / Taluka"]}</h6>
                    <h6>District :- {undefinedData.Dist}</h6>
                    <h6>Pin Code :- {undefinedData["Pin Code"]}</h6>
                    <h6>Date :- {undefinedData.date}</h6>
                    <h6>Salutation for the recipient :- {undefinedData["salutation for the recipient"]}</h6>
                    <h6>Receiver :- {undefinedData.receiver}</h6>
                    <h6>First Para :- {undefinedData["first para"]}</h6>
                    <h6>Second Para :- {undefinedData["second para"]}</h6>
                    <h6>Third Para :- {undefinedData["third para"]}</h6>
                    <h6>Regards :- {undefinedData.regards}</h6>
                   </div>
                  ) :''
                }
              </div>
              <div className='col col-lg-6 col-md-6 col-sm-12 col-12 pdf'>
                {
                  need === 'formal' ?
                  <PDFFile StartRec={stopRec} dataPass={getInfoFromChild} Text = {confStart ? pdfText : ''}/> : ''
                }
              </div>  
            </div>
          </div>
          <div className='popUp'>
          <h6 className='webCommand'>.</h6>
          </div>
        </div>
      </div>
  );
}

export default App;
