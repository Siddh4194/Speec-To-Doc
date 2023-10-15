import './App.css';
import React , {useEffect, useState} from 'react';
import SpeechRecognition , {useSpeechRecognition} from 'react-speech-recognition';
// import { useSpeechSynthesis } from 'react-speech-kit';
import PDFFile from './components/pdfCreator';
function App() {
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  // const {speak} = useSpeechSynthesis();
  const [myname , setMyname] = useState('');
  const [foramalCommands , setCommand] = useState('');

  useEffect(() => {
    // speak({text:"hii how can i help you"})    
    startListening();
  },[]);
useEffect(()=>{
  // speak({text:"hii how can i help you"})
},[foramalCommands]);


// pdf generation 
const [pdfText , SetPdfText] = useState('');
const [confStart , SetconfStart] = useState(false);
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
  callback: (name,{ resetTranscript }) => {setCommand(`let's start to build the ${name}`); resetTranscript()}
},
{
  command: 'start the creation',
  callback: ({ resetTranscript }) => {setCommand(`ok`); resetTranscript();SetPdfText('');  SetconfStart(confStart === true ? false : true)}
},
{
  command: 'question mark',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ")+' ? ';
  });resetTranscript()}
},
{
  command: 'delete last three words',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-7);
    return words.join(" ");
  });resetTranscript()}
},
{
  command: 'delete last 3 words',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-7);
    return words.join(" ");
  });resetTranscript()}
},
{
  command: 'asterisk sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ")+' * ';
  });resetTranscript()}
},
{
  command: 'quotation mark',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ")+' " ';
  });resetTranscript()}
},
{
  command: 'double inverted comma',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ")+ ' " ';
  });resetTranscript()}
},
{
  command: 'apostrophe',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + " ' ";
  });resetTranscript()}
},
{
  command: 'full stop sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' . ';
  });resetTranscript()}
},
{
  command: 'comma sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ")+' , ';
  });resetTranscript()}
},
{
  command: 'exclamation mark',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' ! ';
  });resetTranscript()}
},
{
  command: 'percentage sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' % ';
  });resetTranscript()}
},
{
  command: 'plus sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' + ';
  });resetTranscript()}
},
{
  command: 'minus sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ")+' - ';
  });resetTranscript()}
},
{
  command: 'colon sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' : ';
  });resetTranscript()}
},
{
  command: 'semi colon sign',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
    words = words.split(" ").slice(0,-2);
    return words.join(" ") + ' ; ';
  });resetTranscript()}
},
{
  command: 'save it',
  callback: ({ resetTranscript }) => { SetPdfText(prev => {
    prev += transcript;
    var words = prev;
    console.log(words);
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
    console.log(words);
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
console.log(pdfText);
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


  // show the data to pages
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <h1>{
      foramalCommands === '' ? myname : foramalCommands}</h1>
      <PDFFile Text = {confStart ? pdfText : ''}/>
      </div>
  );
}

export default App;
