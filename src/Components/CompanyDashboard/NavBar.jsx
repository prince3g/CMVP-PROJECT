import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import config from '../../config.jsx';
import './Css/Dash.css';


import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

import MenuIcon from '@mui/icons-material/Menu';

import LogoIcon from './Img/DashLogo.png';

import './Css/Dash.css';


export default function NavBar() {
    
    const [daysLeft, setDaysLeft] = useState(null);
    const [organizationDatalogo, setOrganizationDataLogo] = useState(null); 
    const organizationID =  localStorage.getItem("authUserId");
    const organizationName =  localStorage.getItem("authName");
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [activeDropIcon, setActiveDropIcon] = useState(false); 
    const location = useLocation();
    
    const toggleDropdown = () => {

        setDropdownOpen(!isDropdownOpen);
        setActiveDropIcon(!activeDropIcon);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const handleLinkClick = (path) => {
        closeSidebar();
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const closeSearch = () => {
        setShowSearch(false);
    };


    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login if no token
      navigate("/");
    }
  }, [navigate]);


  // Fetch organization data
//   useEffect(() => {
//     const fetchOrganizationData = async () => {
//         try {
//             const response = await fetch(`${config.API_BASE_URL}/api/accounts/auth/organizations/${organizationID}/`);
//             const data = await response.json();
//             if (response.ok) {
//                 setOrganizationDataLogo(data.logo);
//                 console.log("data");
//                 console.log(data);
//                 console.log("data");
//                 // Assuming your API returns the expiry date
//                 const expiryDate = new Date(data.trial_end_date); // Log this value

//                 // console.log('expiryDate:', expiryDate);
                
//                 if (isNaN(expiryDate)) {
//                   console.error('Invalid expiryDate:', data.expiry_date);
//                 } else {
//                   const today = new Date();
//                   const timeDiff = expiryDate - today;
//                   const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//                   setDaysLeft(daysRemaining);
//                 }
                
//             } else {
//                 console.error("Error fetching organization data:", data.message);
//             }
//         } catch (error) {
//             console.error("Error fetching organization data:", error);
//         }
//     };

//     fetchOrganizationData();
// }, [organizationID]);


useEffect(() => {
    const fetchDates = async () => {
        try {
            // Fetch subscription data
            const subscriptionResponse = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/user-subscription/${organizationID}/`);
            const subscriptionData = await subscriptionResponse.json();

            // Fetch organization data (for trial end date)
            const organizationResponse = await fetch(`${config.API_BASE_URL}/api/accounts/auth/organizations/${organizationID}/`);
            const organizationData = await organizationResponse.json();

            setIsSubscribed(organizationData.is_subscribed)
            setOrganizationDataLogo(organizationData.logo)
    
            let endDate;

            if (organizationData.is_subscribed) {
                // User is subscribed, use subscription end date
                endDate = new Date(subscriptionData.end_date);
            } else {
                // User is not subscribed, use trial end date
                endDate = new Date(organizationData.trial_end_date);
            }

            const today = new Date();
            const timeDiff = endDate - today;
            const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setDaysLeft(daysRemaining);

        } catch (error) {
            console.error("Error fetching dates:", error);
        }
    };

    fetchDates();
}, [organizationID]);




    return (
        <div className={`Dash_NavBar ${isSidebarOpen ? 'Toggle_NavBar' : ''}`}>
            <div className="NavBar_Body" onClick={closeSidebar}></div>
            <nav className="Left_Dash_Nav">
                {/* <div className="Top_Dash_nav">
    
                    <button className="Side_Nav_Toggler" onClick={closeSidebar}><img src={`${config.API_BASE_URL}${organizationDatalogo}`}  alt="Close Icon"></img></button>
                </div> */}
                <div className="Nav_Main">
                    <ul>


                        <li>
                            <Link to="/dashboard/" className={location.pathname === "/dashboard/" ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/dashboard/')}>
                            <span> <CloudUploadIcon /></span>
                                <p>Upload Certificate</p>
                            </Link>
                        </li>

                        <li>
                                    <Link to="/dashboard/uploaded-certificates" className={location.pathname === '/dashboard/uploaded-certificates' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/dashboard/uploaded-certificates')}>
                                       <span> <AssignmentTurnedInIcon /></span>
                                        <p>Uploaded Certificates</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/deleted-certificates" className={location.pathname === '/dashboard/deleted-certificates' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/dashboard/deleted-certificates')}>
                                    <span> <DeleteIcon /></span>
                                       <p>Deleted Certificates</p>
                                    </Link>
                                </li>


                        <li>
                            <Link to="/dashboard/logon-info" className={location.pathname === '/dashboard/logon-info' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/dashboard/logon-info')}>
                            <span> <InfoIcon /></span>
                                <p>Logon information</p>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/profile" className={location.pathname === '/dashboard/profile' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/dashboard/profile')}>
                            <span> <PersonIcon/></span>
                                <p>Profile</p>
                            </Link>
                        </li>

                        
                        <li>
                            <Link to="/dashboard/pricing" className={location.pathname === '/dashboard/pricing' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/dashboard/pricing')}>
                            <span> <PriceCheckIcon /></span>
                                <p>Pricing</p>
                            </Link>
                        </li>


                        <li>
                            <Link to="/dashboard/subscription" className={location.pathname === '/dashboard/subscription' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/dashboard/subscription')}>
                            <span> <AttachMoneyIcon /></span>
                                <p>Subscription Plans</p>
                            </Link>
                        </li>




                        <li>
                        <button onClick={() => {
                            localStorage.clear(); // Clear token
                            navigate("/"); // Redirect to login
                        }}>
                           <span> <LogoutIcon /></span>
                           <p>Logout </p>
                        </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <nav className="Top_NaV">
        
                <div className="Main_Top_NaV">
                    <div className="Large-container">
                        <div className="L_NN_V_Sec">
                            <Link to="/dashboard/" className="dash_logo"><img src={LogoIcon}></img></Link>
                        </div>

                        <div className="R_NN_V_Sec">

                            {/* <div className="Sub_Conunter">
                           
                            {daysLeft >= 1 ? (
                                <>
                                <span className={daysLeft < 4 ? "blinking-text" : ""}>{daysLeft}</span>
                                <p><b> {daysLeft > 1 ? "days" : "day"} left</b> for your free trial</p>
                                </>
                            ) : (
                                <p>Your free trial period has expired</p>
                            )}
                            </div> */}

                            <div className="Sub_Conunter">
                                {daysLeft >= 1 ? (
                                    <>
                                        <span className={daysLeft < 4 ? "blinking-text" : ""}>{daysLeft}</span>
                                        <p><b>{daysLeft > 1 ? "days" : "day"} left</b> {isSubscribed ? "in your subscription" : "for your free trial"}</p>
                                    </>
                                ) : (
                                    <p>Your {isSubscribed ? "subscription" : "free trial"} period has expired</p>
                                )}
                            </div>
                            

                             <button onClick={() => {
                                        if (window.confirm("Are you sure you want to log out?")) {
                                            localStorage.clear(); // Clear token
                                            navigate("/"); // Redirect to login
                                        }
                                    }} className="Logout_Dash_Btn btn-bg">
                                        Logout
                                    </button>

                                    <button className="gSide_Nav_toggler" onClick={toggleSidebar}><MenuIcon /></button>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
