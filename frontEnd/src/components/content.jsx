import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Content(props) {
  var [customTranscript,setCustomTranscript] = useState('');
    useEffect(()=>{
      setCustomTranscript(props.transcript);
    },[props.transcript])

  const commands = [
    {
      command: 'download the pdf',
      callback: (name ) => props.need === 'content' ? handleDownloadPdf() :''
    },
    {
    command: 'delete last * words',
      callback: (name) => {
        console.log(customTranscript);
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

  
  useEffect(()=>{
    props.setcommand(commands);
  },[commands])

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
    // doc.text(`Late Fee Submission Application`, 70, yPos);
    console.log(customTranscript);
    let start = 0;
    while(start !== customTranscript.length - 16){
      doc.text(customTranscript.slice(start,start = start + 90), 10, yPos = yPos + 10);
    }
    
    doc.save('ContentCreation.pdf');
    
        // Save the PDF as a Blob
        // doc.save(`leavApplication.pdf`);
        const pdfBlob = doc.output('blob');
    
        // Create a URL for the Blob and trigger a download
        const blobUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = blobUrl;
        // link.download = 'document.pdf';
        link.click();
        // Clean up the URL object after the download is triggered
        URL.revokeObjectURL(blobUrl);
      };
    return (
        <div>{props.transcript}</div>
    )
}