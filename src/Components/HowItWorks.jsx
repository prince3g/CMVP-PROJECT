import React from 'react';
import Video from '../assets/Img/video.mp4';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import LinkIcon from '@mui/icons-material/Link'; 
import CategoryIcon from '@mui/icons-material/Category'; 
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import SettingsIcon from '@mui/icons-material/Settings'; 

function HowItWorks() {
  return (
    <div className='How_Page'>
   <div className='site-container'>
    <div className='How_Seccoo'>
    <div className='How_Seccoo_TOp'>
    <h2 className='big-text'>How CMVP Works</h2>
    <p>The video below explains how our system functions and provides guidance on navigating it effectively.</p>
    </div>

    <div className='How_Seccoo_Vid'>
        <video src={Video} controls></video>
    </div>

    </div>


    <div className="Plan_SUmmry">
                    <h3><span>Certificate verification:</span></h3>
                    <ul>
                        <li>
                            <LinkIcon />
                            <p>Generate unique certificate verification URL link</p>
                        </li>
                        <li>
                            <CategoryIcon />
                            <p>Create multiple certificate categories</p>
                        </li>
                        <li>
                            <CloudUploadIcon />
                            <p>Upload certificate details for verification</p>
                        </li>
                        <li>

                            <SettingsIcon />
                            <p>Customize your verification page</p>
                        </li>
                    </ul>
                </div>


    <div className="hhgd-sec">
            <h3>Meet your records management compliance needs with CMVP</h3>
            <p>Ensure seamless compliance with records management standards, enhance efficiency, and maintain data integrity with CMVP.</p>
            <a href='#'>Learn More <ArrowForwardIcon /></a>
        </div>

   </div>

   </div>
  )
}

export default HowItWorks
