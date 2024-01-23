import React, { useEffect, useMemo } from "react";
import './SpeechAnimation.css';
import {jsPDF} from 'jspdf';
import SpeechRecognition , {useSpeechRecognition} from 'react-speech-recognition';

const SL = (props) => {
// todays date fro the letter
  var transcript = props.theTranscript;
  const userGenData = useMemo(() => {
    return {
      "Your Full Name": '',
      "class": '',
      "start date":"",
      "end date":"",
      "reason":"",
      'hodDep':""
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
      command: 'clear',
      callback: () => props.transReset()
  },
  {
    command: 'download the pdf',
    callback: () => props.need === 'sl'? handleDownloadPdf() :''
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
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    var yPos = 30;
    doc.text(`School Leaving Application`, 70, yPos);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`To,\nThe HOD,\n${userGenData.hodDep},\nNMCOE, Peth`, 20, yPos = yPos + 20);
    doc.text(`Dear Sir / Madam,`, 20, yPos = yPos + 30);
    doc.text(`       I, ${userGenData["Your Full Name"]}, studying in ${userGenData.class} class, would like to request leave from \n${userGenData["start date"]} to ${userGenData["end date"]}. The reason for this leave is ${userGenData.reason}. I\nkindly request you to grant me leave for the above-mentioned dates.`, 20, yPos = yPos + 10);
    doc.text(`       I understand the importance of this leave and will make every effort to minimize any\ninconvenience caused by my absence.`, 20, yPos = yPos + 20);
    doc.text(`Sincerely`, 25, yPos = yPos + 30);
    doc.text(`${userGenData["Your Full Name"]}`, 20, yPos = yPos + 10);
    doc.setFontSize(12);
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
                margin: 1em auto;
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
                <h2>Leave Application</h2>
                    <p>To,
                        <br/>The HOD,
                        <br/>{userGenData.hodDep !== "" ? userGenData.hodDep : "[DepartMent]"},
                        <br/>NMCOE, Peth</p>
                    <p>Dear Sir / Madam,</p>

                <p>I, {userGenData["Your Full Name"] !== "" ? userGenData["Your Full Name"] : "[Name]"}, studying in {userGenData.class !== "" ? userGenData.class : "[class]"}, would like to request leave from {userGenData["start date"] !== "" ? userGenData["start date"] : "[start date]"}
                    to {userGenData["end date"]!== "" ? userGenData["end date"] : "[End Date]"}. The reason for this leave is {userGenData.reason !== "" ? userGenData.reason : "[Leave Reason]"}. I kindly request you to
                    grant me leave for the above-mentioned dates.</p>

                <p>I understand the importance of this leave and will make every effort to minimize any
                    inconvenience caused by my absence.</p>

                <div class="signature">
                    <p>Sincerely,</p>
                    <p>{userGenData["Your Full Name"] !== "" ? userGenData["Your Full Name"] : "[Name]"}</p>
                </div>
                </div>
            </div>
    </>
  );
};
export default SL;