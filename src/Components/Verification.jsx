import React, { useState, useEffect, useContext } from "react";
import FlashMessage from '../assets/FlashMessage'; 
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import config from "../config";

import PageFixeImg from '../assets/Img/fixed_bg.jpg';
import MarkedImg from '../assets/Img/marked.svg';

import CompLogo from '../assets/Img/comp_logo.png';



function Verification() {

  const [backgroundImage, setBackgroundImage] = useState(null); // State to store background image URL


  const currentYear = new Date().getFullYear(); // Get the current year


  const { orgID } = useParams(); // Get orgId from URL

  const [responseData, setResponseData] = useState(null); // New state for API response

 
  const [organizationData, setOrganizationData] = useState(null); // For organization data
  const [organizationDatalogo, setOrganizationDataLogo] = useState(null); // For organization data

  
  const [organizationData_name, setOrganizationData_name] = useState(null); // For organization data
  const [loading, setLoading] = useState(false); // State for loader
  const [certificateNumber, setCertificateNumber] = useState('');
  const [issuedDate, setIssuedDate] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  // New state for flash message

  useEffect(() => {
    const fetchBackgroundImage = async () => {
        try {
            const response = await fetch(
                `${config.API_BASE_URL}/api/accounts/auth/organization/background_image/selected/${orgID}/`
            );
            const data = await response.json();

            if (response.ok) {
                // Set the background image URL
                const backgroundImageUrl = data.background_image;
                setBackgroundImage(backgroundImageUrl); // Save the background image URL
            } else {
                console.error("Error fetching background image:", data.message);
            }
        } catch (error) {
            console.error("Error fetching background image:", error);
        }
    };

    fetchBackgroundImage();
}, [orgID]);



  const handleFormSubmit = async (event) => {
      event.preventDefault();

      if (certificateNumber && issuedDate) {
          setLoading(true); // Start the loader
          try {
              // Format issued_date to 'YYYY-MM-DD' in local time
              const formattedDate = issuedDate.getFullYear() + '-' + 
                                    String(issuedDate.getMonth() + 1).padStart(2, '0') + '-' + 
                                    String(issuedDate.getDate()).padStart(2, '0');
  
              // Call API to verify the certificate
              const response = await fetch(`${config.API_BASE_URL}/api/certificates/verify-certificate/${orgID}/`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      certificate_id: certificateNumber,
                      issued_date: formattedDate, // Use the locally formatted date
                  }),
              });
  
              const data = await response.json();
              if (response.ok) {
                  setResponseData(data); // Save the response data



                  setShowResult(true);
              } else {
                  console.error('Verification Failed :', data.message);
                  setErrorMessage(data.message || 'An error occurred');
              }
          } catch (error) {
              console.error('Error verifying certificate:', error);
              setErrorMessage('Error verifying certificate: ' + error.message);
          } finally {
              setLoading(false); // Stop the loader
          }
      }
  };


// Fetch organization data
useEffect(() => {
  const fetchOrganizationData = async () => {
    try {
      const response = await fetch(
        `${config.API_BASE_URL}/api/accounts/auth/organizations/${orgID}/`
      );
      const data = await response.json();
      if (response.ok) {
        setOrganizationData(data);
        setOrganizationData_name(data.name);
        setOrganizationDataLogo(data.logo)
        
      } else {
        console.error("Error fetching organization data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };

  fetchOrganizationData();
}, [orgID]);

  const handleGoBackClick = () => {
      setCertificateNumber('');
      setIssuedDate(null);
      setShowResult(false);
  };





  const handleCloseFlashMessage = () => {
    setErrorMessage(null);
  };
  



  return (
     <div className='Verification_page'>
      <div className="Fixed_BG_OO">

         {backgroundImage ? (
                <img src={`${config.API_BASE_URL}${backgroundImage}`} className="Fixed-ImgBg" alt="Background" />
            ) : (
                <img src={PageFixeImg} className="Fixed-ImgBg" alt="Fallback Background" />
            )}

         <span>

             <img 
            src={`${config.API_BASE_URL}${organizationDatalogo}`} 
            alt="CEO" 
            // onError={(e) => { e.target.onerror = null; e.target.src = SampleImage; }}

            className="comp_Logo"
        />
              <img src={MarkedImg} className="marked_Img"></img>

         </span>
      </div>
     </div>
  )
}

export default Verification
