import React, { useState, useEffect } from "react";
import './Css/Dash.css';
import userImg from './Img/user-img.jpg';
import CopyIcon from './Img/copyicon.svg';
import PhotoEditIcon from './Img/edit_icon.svg';
import AngleDownIcon from './Img/angle-down.svg';
import config from '../../config.jsx';

import FlashMessage from "../FlashMessage/FlashMessage.jsx"

export default function Profile({ orgId }) {

    const [flash, setFlash] = useState(null);
    
    const showMessage = (message, type) => {
          setFlash({ message, type });
        };
    
    const organizationID = sessionStorage.getItem("authUserId");
    const organizationName = sessionStorage.getItem("authName");

    const [isLoading, setIsLoading] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [contactFirstName, setContactFirstName] = useState("");
    const [contactLastName, setContactLastName] = useState("");
    const [contactTelephone, setContactTelephone] = useState("");
    const [yearIncorporated, setYearIncorporated] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [nationality, setNationality] = useState("");
    const [staffNumber, setStaffNumber] = useState("");
    const [cityAddress, setCityAddress] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [imgSrc, setImgSrc] = useState(userImg);
    const [organizationDATA, setOrganizationDATA] = useState(userImg);

    // Fetch organization data
    useEffect(() => {
        const fetchOrganizationData = async () => {
            try {
                const response = await fetch(`${config.API_BASE_URL}/api/accounts/auth/organizations/${organizationID}/`);
                if (response.ok) {
                    const data = await response.json();
                    const organizationData = data; // Assuming the data is under 'data' key
                    setOrganizationDATA(organizationData)
    
                    // Ensure yearIncorporated is in YYYY-MM-DD format
                    const yearIncorporatedFormatted = organizationData.year_incorporated
                        ? organizationData.year_incorporated.split('T')[0] // Remove time and keep date part
                        : "";
    
                    // Set the fields with the fetched data
                    setCompanyName(organizationData.name || "");
                    setBusinessType(organizationData.business_type || "");
                    setContactFirstName(organizationData.contact_first_name || "");
                    setContactLastName(organizationData.contact_last_name || "");
                    setContactTelephone(organizationData.contact_telephone || "");
                    setYearIncorporated(yearIncorporatedFormatted);
                    setRegistrationNumber(organizationData.registration_number || "");
                    setNationality(organizationData.nationality || "");
                    setStaffNumber(organizationData.staff_number || "");
                    setCityAddress(organizationData.address || "");
                    setCountry(organizationData.nationality || "");
                    setState(organizationData.state || "");
                    setImgSrc(organizationData.logo || "");

                    // console.log("organizationData Logo")
                    // console.log(organizationDATA.logo)
                    // console.log("organizationData Logo")
                } else {
                    console.error("Error fetching organization data");
                }
            } catch (error) {
                console.error("Error fetching organization data", error);
            }
        };
    
        fetchOrganizationData();
    }, [organizationID]);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", companyName);
        formData.append("business_type", businessType);
        formData.append("contact_first_name", contactFirstName);
        formData.append("contact_last_name", contactLastName);
        formData.append("contact_telephone", contactTelephone);
        formData.append("year_incorporated", yearIncorporated);
        formData.append("registration_number", registrationNumber);
        formData.append("nationality", nationality);
        formData.append("staff_number", staffNumber);
        formData.append("city_address", cityAddress);
        formData.append("country", country);
        formData.append("state", state);

        const fileInput = document.getElementById("file-upload");
        if (fileInput.files[0]) {
            formData.append("logo", fileInput.files[0]);
        }

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/accounts/auth/organizations/${organizationID}/update-by-subscriber-id/`, {
                method: "PATCH",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                //console.log("Organization updated:", data);
               // alert("Organization updated:", data);

            //    const organizationName = sessionStorage.setItem("authName");
                sessionStorage.setItem("authName", data.name);
                showMessage('Organization data updated successfully', 'success')
            } else {
                const data = await response.json();
                console.error("Error updating organization:", data.message);
            }
        } catch (error) {
            console.error("Error updating organization:", error);
        }

        setIsLoading(false);
    };

    const [copyMessage, setCopyMessage] = useState('Copy verification Url');

    const handleCopy = () => {
        const copyText = document.getElementById("portalUrl");
        copyText.select();
        document.execCommand("copy");

        setCopyMessage('Copied!');
        setTimeout(() => setCopyMessage('Copy portal Url'), 2000);
    };

    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);
    const [isCertificateSectionVisible, setIsCertificateSectionVisible] = useState(false);

    const toggleUploadEnvVisibility = () => {
        setIsUploadEnvHidden(!isUploadEnvHidden);
        setIsUploadBoxTogglerActive(!isUploadBoxTogglerActive);
    };


    return (
        <div className="profile-Sec">
            <div className="ToP_Upload_env">
                <h3
                    className={`Upload_Box_Toggler ${isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''}`}
                    onClick={toggleUploadEnvVisibility}
                >
                     Profile<img src={ AngleDownIcon} alt="Angle Down Icon" />
                </h3>
               
            </div>

            <div className={`Upload_env_main ${isUploadEnvHidden ? 'Hide_Envi_Box' : ''}`}>
                <div className="OnglS_sec">
                    <div className="top-dash">
                        <div className="top-dash-1">
                            <div className="top-dash-1-main">
                                <input type="file" id="file-upload" onChange={handleFileChange} style={{ display: 'none' }} />
                                <label htmlFor="file-upload" className="user-img">
                                    <img src={`${imgSrc || PhotoEditIcon}`} alt="User" id="img-display" />
                                    {/* <span><img src={`${config.API_BASE_URL}${imgSrc || PhotoEditIcon}`} alt="Edit Icon" /></span> */}
                                    {/* <span><img src={PhotoEditIcon} alt="Edit Icon" /></span> {config.API_BASE_URL}{imgSrc} */}
                                </label>
                                <div className="user-details">
                                    <h4>{companyName} Company Profile </h4>
                                    <div className="Copy_Url_Sec jhhaj-op">

                                        <div className="Copy_Url_box" onClick={handleCopy}>
                                            <div className="Copy_Url_box_Main">
                                                <h3>{copyMessage}</h3>
                                                <input
                                                    id="portalUrl"
                                                    type="text"
                                                    value={`${config.WEB_PAGE_BASE_URL}/verification/${organizationID}/${organizationName}/`}
                                                    readOnly
                                                />
                                            </div>
                                            <button className="Copy_Url_Btn">
                                                <img src={CopyIcon} alt="Copy Icon" />
                                            </button>
                                        </div>
                                        
                                    </div>
                                    <p className="pop-PP">Click "save button" to reflect changes</p>
                                </div>
                            </div>
                        </div>

                        <div className="top-dash-2">

                        {flash && (
                            <FlashMessage
                            message={flash.message}
                            type={flash.type}
                            onClose={() => setFlash(null)} // Remove flash message after timeout
                            />
                        )}

                            <div className="top-dash-2-main top-dash-2-main-1 active-top-dash-2-main">
                                <div className="form-header">
                                    <h3>Company Profile Settings </h3>
                                </div>
                                <form className="site-form" onSubmit={handleSubmit}>
                                    <div className="d-grid">
                                        <div className="form-input">
                                            <p>Company Name</p>
                                            <input
                                                type="text"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-input">
                                            <p>Business Type</p>
                                            <input
                                                type="text"
                                                value={businessType}
                                                onChange={(e) => setBusinessType(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-input">
                                        <p>Contact Person's First Name</p>
                                        <input
                                            type="text"
                                            value={contactFirstName}
                                            onChange={(e) => setContactFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Contact Person's Last Name</p>
                                        <input
                                            type="text"
                                            value={contactLastName}
                                            onChange={(e) => setContactLastName(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className="form-input">
                                        <p>Contact Telephone</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Contact Person's Telephone"
                                            value={contactTelephone}
                                            onChange={(e) => setContactTelephone(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-input">
                                        <p>Year Incorporated</p>
                                        <input
                                            type="date"
                                            placeholder="Enter Year Incorporated"
                                            value={yearIncorporated}
                                            onChange={(e) => setYearIncorporated(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Registration Number</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Registration Number"
                                            value={registrationNumber}
                                            onChange={(e) => setRegistrationNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>City Address</p>
                                        <input
                                            type="text"
                                            placeholder="Enter City Address"
                                            value={cityAddress}
                                            onChange={(e) => setCityAddress(e.target.value)}
                                        />
                                    </div>
           
                                    <div className="form-input">
                                        <p>Select Country</p>
                                        <select value={state} onChange={(e) => setState(e.target.value)}>
                                            <option value="">Select Country</option>
                                            <option value="Lagos">Nigeria</option>
                                            <option value="California">USA</option>
                                            <option value="London">UK</option>
                                            {/* Add more states as needed */}
                                        </select>
                                    </div>
                                    <div className="form-input">
                                        <p>Select State</p>
                                        <select value={state} onChange={(e) => setState(e.target.value)}>
                                            <option value="">Select State</option>
                                            <option value="Lagos">Lagos</option>
                                            <option value="California">California</option>
                                            <option value="London">London</option>
                                            {/* Add more states as needed */}
                                        </select>
                                    </div>
                                    <div className="form-input">
                                        <button type="submit" className="profile_submit_btn btn-bg btn-bg2">
                                            {isLoading ? (
                                                <span className="loader">Updating Data...</span>
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
