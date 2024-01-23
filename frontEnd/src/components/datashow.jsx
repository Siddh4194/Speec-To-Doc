import React from 'react';

export default function Insides(props) {
    const undefinedData = props.data;
    const need = props.need;
    console.log(need);
    return(
        <>
        {
            need === 'formal' ?
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
            ) : need === 'sl' ? (
                <div className='userData'>
                    <h6>Name :- {undefinedData["Your Full Name"]}</h6>
                    <h6>Class :- {undefinedData.class}</h6>
                    <h6>Start Date :- {undefinedData["start date"]}</h6>
                    <h6>End Date :- {undefinedData["end date"]}</h6>
                    <h6>Reason :- {undefinedData["reason"]}</h6>
                    <h6>Department :- {undefinedData.hodDep}</h6>
                </div>
            ): need === 'latefee' ? (
                <div className='userData'>
                    <h6>Name :- {undefinedData["Your Full Name"]}</h6>
                    <h6>Class :- {undefinedData.class}</h6>
                    <h6>Reason :- {undefinedData["reason"]}</h6>
                    <h6>Date :- {undefinedData.Date}</h6>
                    <h6>Reciever :- {undefinedData.reciever}</h6>
                    <h6>Department :- {undefinedData.hodDep}</h6>
                    <h6>Roll No :- {undefinedData.rollNo}</h6>
                </div>
            ):''
        }   
        </>
        
    )
}