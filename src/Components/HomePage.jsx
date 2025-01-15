import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Typewriter from 'typewriter-effect';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HeroBanner from '../assets/Img/hero-banner.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import OHIMG from '../assets/Img/Oh-img.png';

import Video from '../assets/Img/video.mp4';

import CheckmarkAnimation from '../assets/CheckmarkAnimation';


import LogoIcon2 from '../assets/Img/logo-icon2.png';

function HomePage() {

    const [isVideoPopupVisible, setVideoPopupVisible] = useState(false);
    const videoRef = useRef(null);
  
    const handlePlayVideo = () => {
      setVideoPopupVisible(true);
      // Ensure the video plays when the popup becomes visible
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 0);
    };
  
    const handleCloseVideo = () => {
      setVideoPopupVisible(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset video to the beginning
      }
    };
  

  return (
   <div className='home-page'>
    <div className='hero-sec'>
        <div className='site-container'>
        <div className='hero-main'>
            <div className='hero-dlt'>
                <div>
                {/* <h6>CMVP - Powered by Proliance LTD (ISO 9001 certified company)</h6> */}
                <h1 className='big-text'>Digital certificate <br /> 
                <span className="typewriter">
                    <Typewriter
                    options={{
                        strings: ['verification', 'management', 'security'], // Words to type
                        autoStart: true,
                        loop: true,
                        delay: 75, // Typing speed
                        deleteSpeed: 50, // Deleting speed
                        pauseFor: 5000, // Pause before deleting
                    }}
                    />
                </span>
                </h1>
                <p>Experience secure and efficient digital certificate verification and management with our advanced and user-friendly portal.</p>

                <div className='hero-btns'>
                    <Link to="/signup">Get started with CMVP</Link>
                    <button className="HH-Btn" onClick={handlePlayVideo}>
                    <span className="btn-bg">
                      <PlayArrowIcon />
                    </span>
                    <h5>
                      Click to <br />
                      Watch Video
                    </h5>
                  </button>
                </div>
            </div>
            </div>
            <div className='hero-banner'>
                <img src={HeroBanner}></img>
            </div>
            </div>
        </div>
    </div>
    <div className="Nwass-sec">
        <div className='site-container'>
        <div className="Nwass-Top">
            <h2 className='big-text'>Certificate verification link</h2>
            <p>Manage and create unique certificate verification link for;</p>
        </div>

        <div className="Nwass-Grid">
        <div className="Nwass-Box">
            <h3>Inspection Certificates</h3>
            <p>Ensure authenticity with unique verification links for inspection certificates.</p>
        </div>

        <div className="Nwass-Box">
            <h3>Calibration Certificates</h3>
            <p>Ensure accuracy with unique verification links for calibration certificates.</p>
        </div>

        <div className="Nwass-Box">
            <h3>Training Certificates</h3>
            <p>Validate skills with unique verification links for training certificates.</p>
        </div>

        <div className="Nwass-Box">
            <h3>Results</h3>
            <p>Confirm authenticity with unique verification links for results.</p>
        </div>

        </div>

        <div className="hhgd-sec">
            <h3>Meet your records management compliance needs with CMVP</h3>
            <p>Ensure seamless compliance with records management standards, enhance efficiency, and maintain data integrity with CMVP.</p>
            <a href='#'>Learn More <ArrowForwardIcon /></a>
        </div>

        <div className='Gloand-sec'>
        <div className='Gloand-1'>
            <h4>Certificate Verification <span></span></h4>
                    <div className='GG_Anim_Sec'>
                    <div className='GG_Anim_Main'>
                        <img src={LogoIcon2}></img>
                        <CheckmarkAnimation />
                    </div>
                    </div>
        </div>
        <div className='Gloand-2'>
            <h2 className='big-text'>Create and manage unique verification links for issued <span>certificates</span>.</h2>
            <p>Manage and create unique certificate verification link for all generated and issued certificates requiring verification</p>

            <ul>
                <li>
                    <h3 className='big-text'>01</h3>
                    <h5>Generate unique certificate verification URL link</h5>
                </li>
                <li>
                    <h3 className='big-text'>02</h3>
                    <h5>Create multiple certificate categories</h5>
                </li>
                <li>
                    <h3 className='big-text'>03</h3>
                    <h5>Upload certificate details for verification</h5>
                </li>
                <li>
                    <h3 className='big-text'>04</h3>
                    <h5>Customize your verification page</h5>
                </li>

            </ul>
        </div>
        </div>


        </div>

    <div className='Bidd-secs'>
        <div className='site-container'>
             <div className='Bidd-Main'>
                <div className='Bidd-Dlt'>
                    <h2 className='big-text'><span>Manage</span> your certificate records with ease</h2>
                    <p>Our system ensures proper management, traceability  and verification of your certificate records.</p>
                    <ul>
                        <li>
                            <h3 className='big-text'>24/7</h3>
                            <h4>Support system</h4>
                        </li>
                        <li>
                            <h3 className='big-text'>100%</h3>
                            <h4>Efficient</h4>
                        </li>
                    </ul>
                </div>
                <div className='Bidd-banner'>
                    <img src={OHIMG}></img>
                </div>
             </div>
        </div>
    </div>

    <div className='ggatsh-sec'>
        <div className='site-container'>
        <div className='ggatsh-main'>
            <h2 className='big-text'>Say goodbye to forgery of your brand certificates</h2>
            <Link to="/signup">Get started with CMVP</Link>
        </div>
        </div>
    </div>
    </div>

    {/* Video Popup */}
    {isVideoPopupVisible && (
        <div className="video-popup">
          <button className="close-video-popup" onClick={handleCloseVideo}>
            Close
          </button>
          <video ref={videoRef} src={Video} controls></video>
        </div>
      )}
   </div>
  )
}

export default HomePage
