import React, { useEffect, useMemo } from "react";
import './SpeechAnimation.css';
import {jsPDF} from 'jspdf';
import SpeechRecognition , {useSpeechRecognition} from 'react-speech-recognition';

const LateFee = (props) => {
// todays date fro the letter
  const today = new Date();
  const dateString = today.toDateString();
  var transcript = props.theTranscript;
  const userGenData = useMemo(() => {
    return {
      "Your Full Name": '',
      "class": '',
      "reason":"",
      "reciever":"",
      'Date':dateString,
      'hodDep':"",
      'rollNo':""
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
    callback: (name ) => {userGenData["Your Full Name"] = name; userGenData.name = name; props.transReset()}
  },
  {
    command: 'my name is *',
    callback: (name ) => {userGenData["Your Full Name"] = name; props.transReset()}
  },
  {
    command: 'I am studying in * class',
    callback: (name ) => {userGenData.class = name; props.transReset()}
  },
  {
    command: 'start date is *',
    callback: (name ) => {userGenData["start date"] = name; props.transReset()}
  },
  {
    command: 'and ends on *',
    callback: (name ) => {userGenData["end date"] = name; props.transReset()}
  },
  {
    command: 'department is *',
    callback: (name ) => {userGenData.hodDep = name; props.transReset()}
  },
  {
    command: 'reason is *',
    callback: (name ) => {userGenData.reason = name; props.transReset()}
  },
  {
    command: 'receiver is *',
    callback: (name ) => {userGenData.reciever = name; props.transReset()}
  },
  {
    command: 'roll number is *',
    callback: (name ) => {userGenData.rollNo = name; props.transReset()}
  },
  {
      command: 'clear',
      callback: () => props.transReset()
  },
  {
    command: 'download the pdf',
    callback: () => props.need === 'latefee' ? handleDownloadPdf() :''
  },
  {
    command: 'delete last * words',
    callback: (name) => {
      if (transcript && name) {
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
    // Assuming 'doc' is your jsPDF document instance

doc.setFontSize(15);
doc.setFont('helvetica', 'bold');
var yPos = 30;
doc.text(`Late Fee Submission Application`, 70, yPos);

doc.setFontSize(12);
doc.setFont('helvetica', 'normal');
yPos = yPos + 20;
doc.text(`To,`, 20, yPos);
doc.text(`The ${userGenData.reciever},`, 20, yPos = yPos + 10);
doc.text(`The ${userGenData.hodDep},`, 20, yPos = yPos + 10);
doc.text(`NMCOE`, 20, yPos = yPos + 10);
doc.text(`Peth.`, 20, yPos = yPos + 10);
doc.text(`Date: ${userGenData.Date}`, 20, yPos = yPos + 20);
doc.text(`Subject: Late fee submission application.`, 20, yPos = yPos + 10);

doc.text(`Respected Sir/Madam,`, 20, yPos = yPos + 20);
doc.text(`        My self ${userGenData["Your Full Name"]} and I am studying in ${userGenData.class} class of your school. I am also \na very honest and talented student of your school. I want to inform you through this appl-\nication that recently there has been a lot of loss in my father's business, due to which our \nfinancial condition is not good right now. For this reason, I will not be able to pay my \nschool fees on time.`, 20, yPos = yPos + 10);

doc.text(`      Therefore, I request you to give me a few days' time to pay the fees.`, 20, yPos = yPos + 30);

doc.text(`Thanking You,`, 20, yPos = yPos + 20);

doc.text(`Yours Sincerely`, 20, yPos = yPos + 20);

// Signature Section
doc.text(`${userGenData["Your Full Name"]}`, 20, yPos = yPos + 20);
doc.text(`${userGenData.class}`, 20, yPos = yPos + 10);
doc.text(`${userGenData.hodDep}`, 20, yPos = yPos + 10);
doc.text(`${userGenData.rollNo}`, 20, yPos = yPos + 10);

// Save or display the PDF
// For example, to save the PDF:
// doc.save('LateFeeSubmissionApplication.pdf');

    // Save the PDF as a Blob
    doc.save(`leavApplication-${userGenData["Your Full Name"]}.pdf`);
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

  return (
    <>
        <div className="letter">
            <style>
            {`
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .container {
                max-width: 90%;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            h2 {
                color: #333;
            }

            p {
                color: #555;
            }

            .signature {
                margin-top: 20px;
            }

            footer {
                margin-top: 50px;
                text-align: center;
                color: #888;
            }
            `}
        </style>
            <div class="container">
                <h2>Late Fee Submission Application</h2>
                <p>To,</p>
                <p>The {userGenData.reciever !== "" ? userGenData.reciever : "[reciever]"},</p>
                <p>NMCOE,</p>
                <p>Peth.</p>
                <br/>
                <p>Date:- {userGenData.Date}</p>
                <br/>
                <p>Subject:- Late fee submission application.</p>
                <br/>
                <p>Respected Sir/Madam,</p>
                <p>My self {userGenData["Your Full Name"] !== '' ? userGenData["Your Full Name"] : "[Name]"} and I am studying in class {userGenData.class !== '' ? userGenData.class:"[class]"} of your collage. I am also a very honest and
                    talented student of your collage. I want to tell you through this application that {userGenData.reason !== '' ? userGenData.reason : "[Reason]"}, due to which our financial condition is not good right now. For
                    this reason, I will not be able to pay my school fees on time.</p>

                <p>Therefore, I request you to give me a few days' time to pay the fees.</p>
                <br/>
                <p>Thanking You,</p>
                <br/>
                <p>Yours Sincerely</p>
                <br/>
                <div class="signature">
                    <p>Signature</p>
                    <p>{userGenData["Your Full Name"] !== '' ? userGenData["Your Full Name"] : "[Name]"} </p>
                    <p>{userGenData.class !== '' ? userGenData.class:"[class]"}</p>
                    <p>{userGenData.rollNo !== '' ? userGenData.rollNo:"[Roll No]"}</p>
                </div>
            </div>
        </div>
    </>
  );
};
export default LateFee;