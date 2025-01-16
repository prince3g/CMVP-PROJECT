import React from 'react';
import LogoIcon from '../assets/Img/logo-icon.png';

import YoutubeIcon from '@mui/icons-material/Youtube';

import { Link, useNavigate } from "react-router-dom";

function Footer() {
    const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <div className='Footer'>
        <div className='site-container'>
        <div className='footer-Content'>
            <div className='footer-top-sec'>
            <div className='footer-top-sec-Box'>
                <div className='footer-top-sec-Box-1'><img src={LogoIcon}></img></div>
                <div className='footer-top-sec-Box-2'>
                    
            <div className='connect-sec'>
                <h3>Let's Connect:</h3>
                    <div className='social-media'>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="SocialMediaLinks_m-social-media-links__icon__aLbPt"><path d="M4.054 4l8.493 12.136L4 26h1.924l7.483-8.637L19.455 26H26l-8.972-12.817L24.984 4H23.06l-6.891 7.953L10.599 4H4.055zm2.829 1.514H9.89l13.28 18.971h-3.007L6.883 5.515z" fill="currentColor"></path></svg>
                    </a>
                    <a href="https://www.youtubeIcon com" target="_blank" rel="noopener noreferrer">
                       <YoutubeIcon />
                    </a>

                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="SocialMediaLinks_m-social-media-links__icon__aLbPt"><path d="M7.734 27V9.48H2.285V27h5.45zM4.98 7.137c1.758 0 3.165-1.465 3.165-3.223C8.145 2.214 6.738.81 4.98.81a3.126 3.126 0 00-3.105 3.105c0 1.758 1.406 3.223 3.105 3.223zM28.066 27h.059v-9.61c0-4.687-1.055-8.32-6.563-8.32-2.636 0-4.394 1.465-5.156 2.813h-.058V9.48h-5.215V27h5.449v-8.672c0-2.285.41-4.453 3.223-4.453 2.812 0 2.87 2.578 2.87 4.629V27h5.391z" fill="currentColor"></path></svg>
                    </a>
                    </div>

            </div>
            
            <div className='Footer-Links'>
                <Link to="/about-cmvp">About CMVP</Link>
                <Link to="/pricing">Pricing</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/how-it-works">How it Works</Link>
                <Link to="/contact-us">Contact Us</Link>
                <Link to="/terms-of-use">Terms of Use</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                </div>



                </div>
                </div>
            </div>
            <div className='Sub-Foot'>
                <p><a href='#'>Powered by Proliance LTD (ISO 9001:2015 certified company)</a></p>
                <span>© {currentYear} CMVP. All rights reserved.</span>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Footer
