// import React, { useState } from "react";
// import config from "../config";
// import Logo from "../assets/Img/logo-lit.png";

// import { Link, useNavigate } from "react-router-dom";

// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import FlashMessage from "./FlashMessage/FlashMessage"

// function Footer() {

//     const [flash, setFlash] = useState(null);
    
//     const showMessage = (message, type) => {
//           setFlash({ message, type });
//         };
    


// const currentYear = new Date().getFullYear(); // Get the current year

//   return (
//     <div className='Footer'>
//      <div className='site-container'>
//         <div className='top_Footer'>
//             <div className='foot_cnt_1'>
//                 <Link to="/"><img src={Logo}></img></Link>


//                 <div className='NewSletter'>
//                     <h3>Subscribe now for Updates</h3>
//                     <div className='NewSletter-input'>
//                         <input type='text' placeholder='Email'></input>
//                         <button><ArrowForwardIcon /></button>
//                     </div>
//                 </div>


//             </div>
//             <div className='foot_cnt_2'>
//                 <div className='foot_cnt_Nav'>
//                     <Link to="/about-cmvp">About CMVP</Link>
//                     <Link to="/how-it-works">How it Works <ArrowUpwardIcon /></Link>
//                     <Link to="/pricing">Subscription Plans</Link>
//                     <Link to="/contact-us">Contact Us</Link>
//                     <Link to="/faq">FAQ</Link>
//                 </div>
//                 <div className='foot_cnt_Nav'>
//                     <a href="/terms-of-use" target='_blank'>Terms of Use</a>
//                     <a href="/privacy-policy" target='_blank'>Privacy Policy</a>
//                 </div>

//                 <div className='connect-sec'>
//                     <div className='social-media'>
//                     <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
//                     <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M4.054 4l8.493 12.136L4 26h1.924l7.483-8.637L19.455 26H26l-8.972-12.817L24.984 4H23.06l-6.891 7.953L10.599 4H4.055zm2.829 1.514H9.89l13.28 18.971h-3.007L6.883 5.515z" fill="currentColor"></path></svg>
//                     </a>
//                     <a href="https://www.youtubeIcon com" target="_blank" rel="noopener noreferrer">
//                                     <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 width="30" height="30"
//                 >
//                 <path d="M21.8 8s-.2-1.45-.82-2.1a2.9 2.9 0 0 0-2.1-.82C16.73 5 12 5 12 5s-4.73 0-6.88.08a2.9 2.9 0 0 0-2.1.82C2.4 6.55 2.2 8 2.2 8S2 9.81 2 11.61v.78c0 1.8.2 3.61.2 3.61s.2 1.45.82 2.1c.39.39.91.66 1.45.78C6.5 19 12 19 12 19s4.73 0 6.88-.08a2.9 2.9 0 0 0 2.1-.82c.62-.62.82-2.1.82-2.1s.2-1.81.2-3.61v-.78C22 9.81 21.8 8 21.8 8z" fill="currentColor" />
//                 <path d="M10 15l5.5-3.5L10 8v7z" fill="#081C15" transform="scale(1.1) translate(0, -0.2)" />
//                 </svg>

//                     </a>

//                     <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
//                     <svg viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M7.734 27V9.48H2.285V27h5.45zM4.98 7.137c1.758 0 3.165-1.465 3.165-3.223C8.145 2.214 6.738.81 4.98.81a3.126 3.126 0 00-3.105 3.105c0 1.758 1.406 3.223 3.105 3.223zM28.066 27h.059v-9.61c0-4.687-1.055-8.32-6.563-8.32-2.636 0-4.394 1.465-5.156 2.813h-.058V9.48h-5.215V27h5.449v-8.672c0-2.285.41-4.453 3.223-4.453 2.812 0 2.87 2.578 2.87 4.629V27h5.391z" fill="currentColor"></path></svg>
//                     </a>
//                     </div>

//                 <a href='#' className='togle-Up-A'><ArrowUpwardIcon /></a>

//             </div>

//             </div>
//         </div>
//         <div className='sub-footer'>
//         <p><a href='https://www.prolianceltd.com/'>Powered by Proliance LTD (ISO 9001:2015 certified company)</a></p>
//         <span>© {currentYear} CMVP. All rights reserved.</span>
//         </div>
//      </div>
//     </div>
//   )
// }

// export default Footer


import React, { useState } from "react";
import config from "../config";
import Logo from "../assets/Img/logo-lit.png";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for the loader
import FlashMessage from "./FlashMessage/FlashMessage"

function Footer() {

    const [flash, setFlash] = useState(null);
    
    const showMessage = (message, type) => {
          setFlash({ message, type });
        };
    
  const [email, setEmail] = useState(""); // Email state
  const [isLoading, setIsLoading] = useState(false); // Loading state



  const handleSubscribe = async () => {
    if (!email) {
      showMessage("Please enter a valid email", "failure");
      return;
    }

    setIsLoading(true); // Set loading to true when the request starts

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/newslettersubscription/auth/api/subscribe/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email as JSON payload
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Subscription successful!", "success");
        setEmail(""); // Clear email input after successful
      } else {
        showMessage(data.message || "Subscription failed", "error");
      }
    } catch (error) {
      showMessage("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false); // Set loading to false after request completes
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="Footer">
      <div className="site-container">
        <div className="top_Footer">
          <div className="foot_cnt_1">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>

            <div className="NewSletter">

            {flash && (
                  <FlashMessage
                  message={flash.message}
                  type={flash.type}
                  onClose={() => setFlash(null)} // Remove flash message after timeout
                  />
                )}


              <h3>Subscribe now for Updates</h3>
              <div className="NewSletter-input">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubscribe} disabled={isLoading}>
                  {isLoading ? (
                   "Subscribibg ... "// Show spinner while loading
                  ) : (
                    <ArrowForwardIcon />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="foot_cnt_2">
            <div className="foot_cnt_Nav">
              <Link to="/about-cmvp">About CMVP</Link>
              <Link to="/how-it-works">How it Works</Link>
              <Link to="/pricing">Subscription Plans</Link>
              <Link to="/contact-us">Contact Us</Link>
              <Link to="/faq">FAQ</Link>
            </div>
            <div className="foot_cnt_Nav">
              <a href="/terms-of-use" target="_blank" rel="noopener noreferrer">
                Terms of Use
              </a>
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </div>
    <div className='Footer'>
     <div className='site-container'>
        <div className='top_Footer'>
            <div className='foot_cnt_1'>
                <Link to="/"><img src={Logo}></img></Link>
                <div className='NewSletter'>
                    <h3>Subscribe now for Updates</h3>
                    <div className='NewSletter-input'>
                        <input type='text' placeholder='Email'></input>
                        <button><ArrowForwardIcon /></button>
                    </div>
                </div>
            </div>
            <div className='foot_cnt_2'>
                <div className='foot_cnt_Nav'>
                    <Link to="/about-cmvp">About CMVP</Link>
                    <Link to="/how-it-works">How it Works <ArrowUpwardIcon /></Link>
                    <Link to="/pricing">Subscription Plans</Link>
                    <Link to="/contact-us">Contact Us</Link>
                    <Link to="/faq">FAQ</Link>
                </div>
                <div className='foot_cnt_Nav'>
                    <a href="/terms-of-use" target='_blank'>Terms of Use</a>
                    <a href="/privacy-policy" target='_blank'>Privacy Policy</a>
                </div>

                <div className='connect-sec'>
                    <div className='social-media'>

                    <a href="https://web.facebook.com/prolianceltd/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" fill="currentColor"></path></svg>
                    </a>

                    <a href="https://x.com/prolianceltd" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M4.054 4l8.493 12.136L4 26h1.924l7.483-8.637L19.455 26H26l-8.972-12.817L24.984 4H23.06l-6.891 7.953L10.599 4H4.055zm2.829 1.514H9.89l13.28 18.971h-3.007L6.883 5.515z" fill="currentColor"></path></svg>
                    </a>
                    <a href="https://www.youtubeIcon com" target="_blank" rel="noopener noreferrer">
                                    <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="30" height="30"
                >
                <path d="M21.8 8s-.2-1.45-.82-2.1a2.9 2.9 0 0 0-2.1-.82C16.73 5 12 5 12 5s-4.73 0-6.88.08a2.9 2.9 0 0 0-2.1.82C2.4 6.55 2.2 8 2.2 8S2 9.81 2 11.61v.78c0 1.8.2 3.61.2 3.61s.2 1.45.82 2.1c.39.39.91.66 1.45.78C6.5 19 12 19 12 19s4.73 0 6.88-.08a2.9 2.9 0 0 0 2.1-.82c.62-.62.82-2.1.82-2.1s.2-1.81.2-3.61v-.78C22 9.81 21.8 8 21.8 8z" fill="currentColor" />
                <path d="M10 15l5.5-3.5L10 8v7z" fill="#081C15" transform="scale(1.1) translate(0, -0.2)" />
                </svg>

                    </a>

                    <a href="https://www.linkedin.com/company/proliance-limited/about/" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M7.734 27V9.48H2.285V27h5.45zM4.98 7.137c1.758 0 3.165-1.465 3.165-3.223C8.145 2.214 6.738.81 4.98.81a3.126 3.126 0 00-3.105 3.105c0 1.758 1.406 3.223 3.105 3.223zM28.066 27h.059v-9.61c0-4.687-1.055-8.32-6.563-8.32-2.636 0-4.394 1.465-5.156 2.813h-.058V9.48h-5.215V27h5.449v-8.672c0-2.285.41-4.453 3.223-4.453 2.812 0 2.87 2.578 2.87 4.629V27h5.391z" fill="currentColor"></path></svg>
                    </a>
                    </div>

            <div className="connect-sec">
              <div className="social-media">
                {/* Social media links */}
              </div>
            </div>
          </div>
        </div>
        <div className="sub-footer">
          <p>
            <a href="https://www.prolianceltd.com/">Powered by Proliance LTD</a>
          </p>
          <span>© {currentYear} CMVP. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
