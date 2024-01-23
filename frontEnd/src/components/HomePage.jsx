import React, { useEffect, useState } from 'react';

const Home = (props) => {
    const [toggleButton,setToggle] = useState(true)
    let typingTimeOut;
    let text ="Speak Go To Log In If you don't have an account Speak Go To Sign Up";
    // typing effect useeffect
    let countAlpha = 0; 
    function textTyper() {
        const textNode = document.querySelector(".content");

        // Check if textNode and textNode.firstChild are not null
        if (textNode && textNode.firstChild) {
            textNode.firstChild.textContent = text.slice(0, countAlpha);
            countAlpha++;

            if (countAlpha <= text.length) {
            typingTimeOut = setTimeout(textTyper, 90);
            }
        } else {
            console.error('textNode or textNode.firstChild is null');
        }
    }


    useEffect(()=>{
        textTyper();
      },[text]);

    if(countAlpha > text.length){
    clearTimeout(typingTimeOut);
    }



    return(
        <>
        <div className='home'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-md-6 col-12 col-sm-12">
                        <div className="headlines">
                            <div className="main_heading">
                                <h1>Shrut_lekh <span className='span_Heading'>Expriment</span></h1>
                            </div>
                            <div className="main-buttons">
                                <button className='button1' style={{backgroundColor:toggleButton ? '#fbfbfb86' : '#fbfbfb23'}} onClick={()=> {setToggle(!toggleButton);}}>Information</button>
                                <button className='button1' style={{backgroundColor:toggleButton ? '#fbfbfb23' : '#fbfbfb86'}} onClick={()=> {setToggle(!toggleButton);}}>Instructions</button>
                            </div>
                            <div className="main_desc">
                                {
                                    toggleButton ?
                                    <h5>Your Voice , Your Words: Dictate, edit 📝, and refine your documents 📃 effortlessly using the magic 🪄 of speech recognition technology.</h5>
                                    :
                                    <h5>Speak this Commands for following Actions.<br/>Refresh The Page : Refresh the Page<br/>Log In : after writing login info<br/>Sign Up : after writing signUp info<br/>Show Instructions : to know the page things<br/></h5>
                                }
                            </div>
                            <div className='main_para'>
                                    {toggleButton && <p>Welcome to Shrutilekh, an innovative platform transforming the way you interact with written content. As we embark on this journey, your support is invaluable. Together, let's shape the future of document creation and exploration. Stay tuned for exciting updates and features. The adventure has just begun!</p>}
                            </div>
                        </div>
                        
                    </div>
                    <div className="col col-md-6 col-12 col-sm-12 main_commands">
                            <div className="content">
                                <h4 className='webCommand'></h4>
                            </div>
                    </div>
                    <div className="col voice_animation">
                        <div class="voice-bars"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;