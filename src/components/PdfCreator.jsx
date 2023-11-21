import React, { useEffect, useMemo, useRef } from "react";
import './SpeechAnimation.css';
import {jsPDF} from 'jspdf';
import SpeechRecognition , {useSpeechRecognition} from 'react-speech-recognition';


const PDFFile = (props) => {
// todays date fro the letter
  const today = new Date();
  const dateString = today.toDateString();

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
  resetTranscript();
}

useEffect(() => {
  changeMainPage("...");
},[])

useEffect(() =>{
  if(props.StartRec){
    startListening();
    console.log("started listening from the formal letter file");
  }
},[props.StartRec])

// establish the speech recognition model commands
const commands = [
  {
    command: 'my name is *',
    callback: (name,{ resetTranscript }) => {userGenData["Your Full Name"] = name; userGenData.name = name; resetTranscript()}
  },
  {
    command: 'my name is *',
    callback: (name,{ resetTranscript }) => {userGenData["Your Full Name"] = name; resetTranscript()}
  },
  {
    command: 'I live in * city',
    callback: (name,{ resetTranscript }) => {userGenData.city = name; resetTranscript()}
  },
  {
    command: 'in the * subdivision',
    callback: (name,{ resetTranscript }) => {userGenData["SubDivision / Taluka"] = name; resetTranscript()}
  },
  {
    command: 'which is in * district',
    callback: (name,{ resetTranscript }) => {userGenData.Dist = name; resetTranscript()}
  },
  {
    command: 'of * district',
    callback: (name,{ resetTranscript }) => {userGenData.Dist = name; resetTranscript()}
  },
  {
    command: 'and the * is pin code',
    callback: (name,{ resetTranscript }) => {userGenData["Pin Code"] = name; resetTranscript()}
  },
  {
    command: 'use the * salutation',
    callback: (name,{ resetTranscript }) => {userGenData["salutation for the recipient"] = name; resetTranscript()}
  },
  {  
    command: 'receiver name is *',
    callback: (name,{ resetTranscript }) => {userGenData.receiver = name; resetTranscript()}
  },
  {
    command: 'start the first para * save first para',
    callback: (name,{ resetTranscript }) => {userGenData["first para"] = transcript; changeMainPage("Speak the first para"); resetTranscript()}
  },
  {
    command: 'start the second para *',
    callback: (name,{ resetTranscript }) => {userGenData["second para"] = name;changeMainPage("Speak the second para"); resetTranscript()}
  },
  {
    command: 'start the third para *',
    callback: (name,{ resetTranscript }) => {userGenData["third para"] = name;changeMainPage("Speak the third para"); resetTranscript()}
  },
  {
    command: 'regards is *',
    callback: (name,{ resetTranscript }) => {userGenData["salutation for the recipient"] = name;changeMainPage(`${name} is used as regards and name is taken from you above entered name.`); resetTranscript()}
  },
  {
    command: 'i want to look my pdf',
    callback: () => {changeMainPage("yes you can take a look at the side page")}
  },
  {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
  }
];
var{
  transcript,
  listening,
  resetTranscript,
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
    
    doc.text(` ${userGenData["salutation for the recipient"]} \n ${userGenData.receiver}`, 20,yPos = yPos + 10);

    while(start < userGenData["first para"].length){
    doc.text(` ${userGenData["first para"].slice(start,start+90)}`, 20,yPos=+10);
    start += 90;
    }

    start = 0;
    while(start < userGenData["second para"].length){
    doc.text(` ${userGenData["second para"].slice(start,start+90)}`, 20,yPos=+10);
    start += 90;
    }
    
    start = 0;
    while(start < userGenData["third para"].length){
    doc.text(` ${userGenData["third para"].slice(start,start+90)}`, 20,yPos=+10);
    start += 90;
    }
    doc.text(` ${userGenData.regards}`, 20,yPos=+10);
    doc.text(` ${userGenData.name}`, 20,yPos=+10);
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
      <h6 key={key}>{value}</h6> : ""
  ));

  return (
    <>
    <button onClick={handleDownloadPdf}>Hello</button>
    <div className="letter">
    <div className="rightCorner">
      <h6>From</h6>
      <div>{valuesList}</div>
    </div>
    </div>
    
    </>
  );
};

export default PDFFile;