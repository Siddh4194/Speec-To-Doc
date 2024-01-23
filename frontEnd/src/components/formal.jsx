import React, { useEffect, useMemo } from "react";
import './SpeechAnimation.css';
import {jsPDF} from 'jspdf';
import SpeechRecognition , {useSpeechRecognition} from 'react-speech-recognition';

const PDFFile = (props) => {
// todays date fro the letter
  const today = new Date();
  const dateString = today.toDateString();
  var transcript = props.theTranscript;
  const userGenData = useMemo(() => {
    return {
      "Your Full Name": '',
      "city": '',
      "SubDivision / Taluka":"",
      "Dist": '',
      "Pin Code": '',
      "date": dateString,
      "salutation for the recipient": '',
      "receiver": '',
      "first para": '',
      "second para": '',
      "third para": '',
      "regards": '',
      "name":''
    };
  }, []);
var data = props.dataPass;

const changeMainPage = (webres) =>{
  data(userGenData,webres)
  props.transReset();
}

useEffect(() => {
  changeMainPage("...");
},[])

useEffect(() =>{
  if(props.StartRec){
    // startListening();
    console.log("started listening from the formal letter file");
  }
},[props.StartRec])

// establish the speech recognition model commands
const commands = [
  {
    command: 'my name is *',
    callback: (name,{   }) => {userGenData["Your Full Name"] = name; userGenData.name = name; props.transReset()}
  },
  {
    command: 'my name is *',
    callback: (name,{   }) => {userGenData["Your Full Name"] = name; props.transReset()}
  },
  {
    command: 'I live in * city',
    callback: (name,{   }) => {userGenData.city = name; props.transReset()}
  },
  {
    command: 'in the * subdivision',
    callback: (name,{   }) => {userGenData["SubDivision / Taluka"] = name; props.transReset()}
  },
  {
    command: 'which is in * district',
    callback: (name,{   }) => {userGenData.Dist = name; props.transReset()}
  },
  {
    command: 'of * district',
    callback: (name,{   }) => {userGenData.Dist = name; props.transReset()}
  },
  {
    command: 'pin code is *',
    callback: (name,{   }) => {userGenData["Pin Code"] = name; props.transReset()}
  },
  {
    command: 'use the * salutation',
    callback: (name,{   }) => {userGenData["salutation for the recipient"] = name; props.transReset()}
  },
  {  
    command: 'receiver name is *',
    callback: (name,{   }) => {userGenData.receiver = name; props.transReset()}
  },
  {
    command: 'start first para',
    callback: (name) => {changeMainPage("Speak the first para");  props.transReset()}
  },
  {
    command: 'save first para',
    callback: (name) => {userGenData["first para"] = transcript.split(" ").slice(0,-3).join(" ");props.transReset()}
  },
  {
    command: 'start second para',
    callback: (name) => {changeMainPage("Speak the second para"); props.transReset()}
  },
  {
    command: 'save second para',
    callback: (name) => {userGenData["second para"] = transcript.split(" ").slice(0,-3).join(" "); props.transReset()}
  },
  {
    command: 'start third para',
    callback: (name) => {changeMainPage("Speak the third para"); props.transReset()}
  },
  {
    command: 'save third para',
    callback: (name) => {userGenData["third para"] = transcript.split(" ").slice(0,-3).join(" "); props.transReset()}
  },
  {
    command: 'regards is *',
    callback: (name) => {userGenData["salutation for the recipient"] = name;changeMainPage(`${name} is used as regards and name is taken from you above entered name.`); props.transReset()}
  },
  {
    command: 'i want to look my pdf',
    callback: () => {changeMainPage("yes you can take a look at the side page"); props.transReset()}
  },
  {
      command: 'clear',
      callback: () => props.transReset()
  },
  {
    command: 'download the pdf',
    callback: () => handleDownloadPdf()
},{
  command: 'delete last * words',
    callback: (name) => {
      if (transcript && name) {
        let myDict = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10};
        let myD = {"1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10};
        var words = transcript;
        words = words.split(" ").slice(0, 0 - (myD[name] + 4));
        transcript = words.join(" ");
        props.transOp(transcript);
        console.log("outcome : "+transcript);
      } else {
        console.error('transcript or name is undefined.'+transcript);
      }
    }
  }
];
// useEffect(() => props.setCommands(commands))
var{
  transcripts,
  listening,
  resetTranscript ,
  browserSupportsSpeechRecognition
} = useSpeechRecognition({commands});

// broser support
if(!browserSupportsSpeechRecognition){
  return <span>Your Browser Dosent support Speech to Text</span>
}

const startListening = () => SpeechRecognition.startListening({ continuous: true });



  const handleDownloadPdf = () => {
    // Create a new jsPDF instance
    
    const doc = new jsPDF('a4');
    // doc.setPageSize('A4');
    // Add text content to the PDF document
    doc.setFontSize(12);
    doc.text(` From, \n ${userGenData["Your Full Name"]} \n At.post ${userGenData.city} tal.${userGenData["SubDivision / Taluka"]} \n dist.${userGenData.Dist} ${userGenData["Pin Code"]} \n ${userGenData.date}`, 130, 30);
    doc.setFontSize(12);
    let yPos = 50;
    let start = 0;
    let incr = 10;
    doc.text(` ${userGenData["salutation for the recipient"]} \n ${userGenData.receiver}`, 20,yPos = yPos + incr);
    yPos = yPos + 20;
    while(start < userGenData["first para"].length){
    doc.text(` ${userGenData["first para"].slice(start,start+90)}`, 20,yPos = yPos + incr);
    console.log(userGenData["first para"].slice(start,start+90));
    start += 90;
    }

    start = 0;
    while(start < userGenData["second para"].length){
    doc.text(` ${userGenData["second para"].slice(start,start+90)}`, 20,yPos = yPos + incr);
    start += 90;
    }
    
    start = 0;
    while(start < userGenData["third para"].length){
    doc.text(` ${userGenData["third para"].slice(start,start+90)}`, 20,yPos = yPos + incr);
    start += 90;
    }
    doc.text(` ${userGenData.regards}`, 20,yPos = yPos + incr);
    doc.text(` ${userGenData.name}`, 20,yPos = yPos + incr);
    // Save the PDF as a Blob
    doc.save('my-document.pdf');
    const pdfBlob = doc.output('blob');

    // Create a URL for the Blob and trigger a download
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'document.pdf';
    link.click();

    // Clean up the URL object after the download is triggered
    URL.revokeObjectURL(blobUrl);
  };

  const valuesList = Object.entries(userGenData).map(([key, value]) => (
    key !== "name" ?
    '':
      key === "Your Full Name" ? <p key={key}>{value}</p> :
      key === "city" ? <p key={key}>{value}</p> :
      key === "SubDivision / Taluka" ? <p key={key}>{value}</p> :
      key === "Dist" ? <p key={key}>{value}</p> :
      key === "Pin Code" ? <p key={key}>{value}</p> :
      key === "date" ? <p key={key}>{value}</p> :
      key === "salutation for the recipient" ? <p key={key}>{value}</p> :
      key === "receiver" ? <p key={key}>{value}</p> :
      key === 'first para' ? <p key={key}>{value}</p> :
      key === 'second para' ? <p key={key}>{value}</p> :
      key === 'third para' ? <p key={key}>{value}</p> :
      key === 'fourth para' ? <p key={key}>{value}</p> :
      key === "regards" ? <p key={key}>{value}</p> :
      key === "name" ? <p key={key}>{value}</p> : ''
  ))
  return (
    <>
    <button onClick={handleDownloadPdf}>Hello</button>
    <div className="letter">
      <h6>From</h6>
      <div>{valuesList}</div>
    </div>
    </>
  );
};
export default PDFFile;