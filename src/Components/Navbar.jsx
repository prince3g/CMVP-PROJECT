import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Img/main-logo.png';
import MLogo from '../assets/Img/Logo.png';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Navbar({ className }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeToggle, setActiveToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  const handleClickOutside = (e) => {
    if (!e.target.closest('.Drop_Down') && !e.target.closest('.nav-content')) {
      setIsDropdownVisible(false);
      setActiveToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
    setActiveToggle((prevState) => !prevState);
  };

  const handleLinkClick = (e) => {
    e.preventDefault();  // Prevent default navigation
    setIsDropdownVisible(false);
    setActiveToggle(false);
    // Delay navigation to ensure state changes first
    setTimeout(() => {
      window.location.href = e.target.href;
    }, 0);
  };


  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
      localStorage.clear();
      setIsLoggedIn(false);
  };


  const navigate = useNavigate(); // Hook to handle navigation

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };



  return (
    <div className={`Navbar ${className} ${isScrolled ? 'Scrolled_Nav' : ''}`}>
      <div className="site-container">
        <div className="NavBar-Main">
          <div className="nav-content first-Nav-link">
            <Link to="/" className="site-logo">
              <img src={Logo} className="pc-logo" alt="Logo" />
              <img src={MLogo} className="mobile-logo" alt="Mobile Logo" />
            </Link>
            <div className="Nav-Links">
              <button onClick={toggleDropdown} className={activeToggle ? 'active_Toggle' : ''}>
                  Resources <ArrowDropDownIcon />
                {isDropdownVisible && (
                  <div className="Drop_Down">
                    <Link to="/about-cmvp" onClick={handleLinkClick}>
                      <InfoIcon />
                      About CMVP
                    </Link>
                    <br />
                    <Link to="/faq" onClick={handleLinkClick}>
                      <QuestionAnswerIcon />
                      FAQ
                    </Link>
                    <br />
                    <Link to="/how-it-works" onClick={handleLinkClick}>
                      <SettingsIcon />
                      How it works
                    </Link>
                  </div>
                )}
              </button>
              <Link to="/pricing" onClick={handleLinkClick}>Pricing</Link>
              <Link to="/contact-us" onClick={handleLinkClick}>Contact Us</Link>
            </div>
          </div>

          <div className="nav-content hidden-Nav-links">
          <div className="Nav-Links">
          <button onClick={handleGoBack}>
            <ArrowBackIcon />
            Go Back
          </button>
            </div>
            </div>
          <div className="nav-content last-Nav-link">
            <div className="Nav-Links">

              {isLoggedIn ? (
                                 <Link to="/dashboard" onClick={handleLinkClick}>Account</Link>
                            ) : (
                                 <Link to="/login" onClick={handleLinkClick}>Log In</Link>
                            )}

                            {isLoggedIn ? (
                            <Link to="/login" className="btn-bg" onClick={handleLogout}>Log Out</Link>
                            ) : (

                                    <Link to="/signup" className="btn-bg" onClick={handleLinkClick}>Sign Up</Link>
     
                            )}

            </div>
          </div>
        </div>
        <div className="Mobile-Nav">
          <div className="nav-content">
            <div className="Nav-Links">
              <button onClick={toggleDropdown} className={activeToggle ? 'active_Toggle' : ''}>
                  Resources <ArrowDropDownIcon />
                {isDropdownVisible && (
                  <div className="Drop_Down">
                    <Link to="/about-cmvp" onClick={handleLinkClick}>
                      <InfoIcon />
                      About CMVP
                    </Link>
                    <br />
                    <Link to="/faq" onClick={handleLinkClick}>
                      <QuestionAnswerIcon />
                      FAQ
                    </Link>
                    <br />
                    <Link to="/how-it-works" onClick={handleLinkClick}>
                      <SettingsIcon />
                      How it works
                    </Link>
                  </div>
                )}
              </button>
              <Link to="/pricing" onClick={handleLinkClick}>Pricing</Link>
              <Link to="/contact" onClick={handleLinkClick}>Contact us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
