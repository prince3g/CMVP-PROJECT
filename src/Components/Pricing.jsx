import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';

import CheckCmvp from '../assets/Img/check-cmvp.svg';

export default function Pricing() {

    return (
        <div className="Landing-page MMha-page subscript-page">

                <div className="Top_Plannsia oaiia">
                    <div className="site-container">
                    <div  className="Pricing_Sec">
                    <div className="Pricing_top UUya_Ooa">
                        <h3 className="big-text">CMVP Subscription Plan</h3>
                        <p>Subscription plans for CMVP is tailored to meet the specific needs of different organizations. </p>
                    </div>

                    <div className="oahhs_Sec">
                        <div className="oahhs_Card">
                            <h3>BASIC</h3>
                            <p>All-in-one certificate management package available for a limited time.</p>
                            <button>free <span>/one month</span></button>
                            <ul>
                                <li><CheckIcon /> Access to portal</li>
                                <li><CheckIcon /> Add UNLIMITED certificate categories</li>
                                <li><CheckIcon /> Upload UNLIMITED certificates daily</li>
                                <li><CheckIcon /> Access to deleted certificates and files</li>
                                <li><CheckIcon /> maximum login users</li>
                                <li><CheckIcon /> 24/7 support</li>
                            </ul>
                            <a href="#">Free Trial</a>
                        </div>


                        <div className="oahhs_Card">
                            <h3>STANDARD</h3>
                            <p>Larger organizations with more complex certificate management requirements.</p>
                            <button>NGN 9495 <span>/per month</span></button>
                            <ul>
                                <li><CheckIcon /> Access to portal</li>
                                <li><CheckIcon /> Add up to 5 certificate categories</li>
                                <li><CheckIcon /> Upload up to 10 certificates daily</li>
                                <li><CheckIcon /> Access to deleted certificates and files</li>
                                <li><CheckIcon /> maximum login users</li>
                                <li><CheckIcon /> maximum login users</li>
                            </ul>
                            <a href="#">Subscribe</a>
                        </div>

                        <div className="oahhs_Card">
                            <h3>PREMIUM</h3>
                            <p>Large enterprises with high-volume certificate management needs.</p>
                            <button>NGN 12500 <span>/per month</span></button>
                            <ul>
                                <li><CheckIcon /> Access to portal</li>
                                <li><CheckIcon /> Add UNLIMITED certificate categories</li>
                                <li><CheckIcon /> Upload UNLIMITED certificates daily</li>
                                <li><CheckIcon /> Access to deleted certificates and files</li>
                                <li><CheckIcon /> maximum login users</li>
                                <li><CheckIcon /> 24/7 support</li>
                            </ul>
                            <a href="#">Subscribe</a>
                        </div>


                    </div>


                                    <div className='hag_Top hhags' data-aos="fade-up">
                                    <div className='hag_Top_1'>
                                        <img src={CheckCmvp}></img>
                                    </div>
                                    <div className='hag_Top_2'>
                                        <h2 className='big-text'>Meet your records <span>management compliance</span> needs with <span>CMVP</span></h2>
                                        <Link to="/about-cmvp">About CMVP</Link>
                                    </div>
                                    </div>
                                </div>


                

                    </div>
                </div>

           


        </div>
    );
}
