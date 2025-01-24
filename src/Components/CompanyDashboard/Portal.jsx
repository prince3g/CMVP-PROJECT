import React, { useState, useEffect } from "react";
import axios from "axios";
import './Css/Dash.css';

import CopyIcon from './Img/copyicon.svg';
import AngleDownIcon from './Img/angle-down.svg';
import ArrowRightLit from './Img/arrow-right-lit.svg';
import DropArrow1 from './Img/droparrow1.svg';
import DropArrow2 from './Img/droparrow2.svg';
import ArrowLeft from './Img/arrow-left.svg';
import PhotoIcon from './Img/photo-icon.svg';
import config from '../../config.jsx';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function PortalPage() {

    const organizationID =  localStorage.getItem("authUserId");
    const organizationName =  localStorage.getItem("authName");

    const [subscriptionDetails, setSubscriptionDetails] = useState(null); // Store subscription details
    const [numDailyCertificateUpload, setNumDailyCertificateUpload] = useState(0); // State to store num_daily_certificate_upload
    const [uploadedCount, setUploadedCount] = useState(0);
    const [deletedCount, setDeletedCount] = useState(0);
    const [copyMessage, setCopyMessage] = useState('Copy verification Url');
    const [imagePreview, setImagePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isCertificateSectionVisible, setIsCertificateSectionVisible] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);
    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isAddCertCartiVisible, setIsAddCertCartiVisible] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    
    const [isLoading1, setIsLoading1] = useState(false);

    const [categories1, setCategories1] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
              
    const [organizationDatalogo, setOrganizationDataLogo] = useState(null); // For organization data
    const [certificateData, setCertificateData] = useState({
        
        organization_id: organizationID,
        certificate_category: "",
        certificate_id: "",
        certificate_title: "",
        type: "",
        client_name: "",
        dateOfIssue: "",
        issuedNumber: "",
        examination_type: "",
        issuedBy: ""
    });


    useEffect(() => {
        // Check if the user is logged in and fetch subscription details
        const fetchSubscriptionDetails = async () => {
            const authToken = localStorage.getItem("authToken");
            const authUserId = localStorage.getItem("authUserId");
    
            if (authToken && authUserId) {
                try {
                    const response = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/user-subscription/${authUserId}/`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${authToken}`,
                        },
                    });
    
                    if (!response.ok) {
                        throw new Error("Failed to fetch subscription details");
                    }
    
                    const data = await response.json();
                    localStorage.setItem("subscriptionDetails", JSON.stringify(data)); // Store subscription data in local storage
                    // console.log("Subscription Details: ", data);
    
                } catch (error) {
                    console.error("Error fetching subscription details:", error);
                }
            }
        };
    
        fetchSubscriptionDetails();
    }, []); // Empty dependency array, runs on component mount
    
    useEffect(() => {
        // Fetch the uploaded certificates count
        const fetchUploadedCertificates = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/certificates/organization/${organizationID}/`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setUploadedCount(response.data.count);
                setOrganizationDataLogo(response.data.logo)
            } catch (error) {
                console.error("Error fetching uploaded certificates count:", error);
            }
        };

        

        // Fetch the deleted certificates count
        const fetchDeletedCertificates = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/certificates/soft-deleted-certificates/${organizationID}/`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                //console.log(response.data); // Log the response structure
                setDeletedCount(response.data.results.length); // Update based on correct structure
            } catch (error) {
                console.error("Error fetching deleted certificates count:", error);
            }
        };

        fetchUploadedCertificates();
        fetchDeletedCertificates();
    }, []);

    const handleCopy = () => {
        const copyText = document.getElementById("portalUrl");
        copyText.select();
        document.execCommand("copy");

        setCopyMessage('Copied!');
        setTimeout(() => setCopyMessage('Copy portal Url'), 2000);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleUploadButtonClick = () => {
        setIsCertificateSectionVisible(true);
    };

    const handleCloseButtonClick = () => {
        setIsCertificateSectionVisible(false);
    };

    const toggleUploadEnvVisibility = () => {
        setIsUploadEnvHidden(!isUploadEnvHidden);
        setIsUploadBoxTogglerActive(!isUploadBoxTogglerActive);
    };

    const handleChange = (event) => {
        setCategoryName(event.target.value);

        
    };

    const showAddCertCarti = () => {
        setIsAddCertCartiVisible(true);
    };

    const hideAddCertCarti = () => {
        setIsAddCertCartiVisible(false);
        setCategoryName('');
    };

    const handleInputChange = (event) => {
        setSelectedCategory(event.target.value);

        // console.log("event.target.value")
        // console.log(event.target.value)
        // console.log("event.target.value")


        const { name, value } = event.target;
        setCertificateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        console.log('selectedCategory:', selectedCategory); // Log the selectedCategory value
    
        if (!selectedCategory) {
            alert("Please select a certificate category.");
            setLoading(false);
            return; // Prevent form submission
        }
        const formData = new FormData();
        formData.append("organization", certificateData.organization_id); 


        // console.log("111selectedCategory111")
        // console.log(selectedCategory)
        // console.log("111selectedCategory111")

        formData.append("certificate_category", selectedCategory); 
        formData.append("certificate_id", certificateData.number);
        formData.append("client_name", certificateData.client_name);
        formData.append("issue_date", certificateData.dateOfIssue); 

        formData.append("examination_type", certificateData.examination_type); // Ensure this line is present
        formData.append("issuedNumber", certificateData.issuedNumber); // Ensure this line is present

        formData.append("examination_type", certificateData.examination_type); // Ensure this line is present
        formData.append("issuedNumber", certificateData.issuedNumber); // Ensure this line is present
        

        formData.append("certificate_title", certificateData.certificate_title); // Ensure this line is present

        formData.append("issuedBy", certificateData.issuedBy); 
        
        formData.append("expiry_date", "");  // Optional
        if (selectedFile) {
            formData.append("pdf_file", selectedFile);
        }

        // console.log("formData")
        // // Iterate over entries and log key-value pairs
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`); 
        // }
        // console.log("formData")
    
        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/certificates/create/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            alert("Certificate created successfully!");
            
            window.location.reload();
        } catch (error) {
            // console.error("Error creating certificate:", error);
            // alert("Failed to create certificate. Please try again.");
                    // Extract and display the specific error message
            const errorMessage = error.response?.data?.error || "Please change CertificateID to be unique or select the  category";
            console.error("Error creating certificate:", error);
            alert(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch subscription details from localStorage
        const storedSubscriptionDetails = localStorage.getItem("subscriptionDetails");
        if (storedSubscriptionDetails) {
            const parsedDetails = JSON.parse(storedSubscriptionDetails);
            setSubscriptionDetails(parsedDetails);
            // Extract num_daily_certificate_upload
            const numCerts = parsedDetails.subscription_plan.features.num_daily_certificate_upload;
            setNumDailyCertificateUpload(numCerts);
        }
    }, []); // Runs on component mount



  
    const handleChange1 = (event) => {
      setCategoryName(event.target.value);
    };
  

    const handleSubmit1 = async (event) => {
        event.preventDefault();
        setIsLoading1(true);
    
        try {
          const response = await axios.post(`${config.API_BASE_URL}/api/certificates/categories/`, {
            name: categoryName,
            organization: organizationID
          });
    
          // Handle successful response (e.g., show success message)
         // console.log('Category created successfully:', response.data);

          setCategoryName(''); 
          setIsLoading1(false); 
          alert("Certificate Category Created successfully")

        } catch (error) {
          // Handle error (e.g., display error message)
          console.error('Error creating category:', error);
          setIsLoading1(false); 
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${config.API_BASE_URL}/api/certificates/certificateCategory/${organizationID}`);
            setCategories1(response.data);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchData();
      }, []);




    return (
        <div className="PortalPage">
            <section className={`Certificate_Sec ${isCertificateSectionVisible ? 'PopOut_Certificate_Sec' : ''}`}>
                <div className={`Add_Cert_Carti ${isAddCertCartiVisible ? 'Active_Add_Cert_Carti' : ''}`}>
                    <div className="site-container">

                        <div className="Add_Cert_Carti_box">
                            <div className="Add_CCt_Input">
                                <input
                                type="text"
                                placeholder="Enter category name HERE"
                                value={categoryName}
                                onChange={handleChange1}
                                />
                            </div>
                            <div className="Add_CCt_btns">
                                <button
                                className="Add_Cert_Certegory btn-bg"
                                onClick={handleSubmit1}
                                disabled={isLoading1} 
                                >
                                {isLoading1 ? 'Adding...' : 'Add category'} 
                                </button>
                                <button className="Close_Cert_Certegory" onClick={hideAddCertCarti}>
                                Close
                                </button>
                            </div>
                            </div>


                    </div>
                </div>
                <div className="Certificate_Sec_Main">
                    <div className="site-container">
                        <div className="Top_CC_Mn">
                            <button className="Close_Certificate_Sec" onClick={handleCloseButtonClick}>
                                <img src={ArrowLeft} alt="Arrow Left" />
                            </button>
                        </div>
                        <form className="Main_CC_Mn" onSubmit={handleSubmit}>
                            <div className="L_CC_Mn">
                                <div className="L_CC_Mn_main">


                                    <h3>Upload certificate</h3>
                                    <div className="Certificate_Form">

                                        <div className="Cert_Form_input Cert_Form_input_Select Cert_Form_input_Selct">
                                        <select value={selectedCategory} onChange={handleInputChange}>
                                            <option value="">Select certificate category</option>
                                            {categories1.map((category) => (
                                            <option key={category.id} value={category.unique_certificate_category_id}>
                                                {category.name} 
                                            </option>
                                            ))}
                                        </select>
                                        <div className="Add_Cart_Btn" onClick={showAddCertCarti}>
                                            Add category
                                        </div>

                                        </div>

                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="number"  // Maps to `certificate_id`
                                                value={certificateData.number}
                                                onChange={handleInputChange}
                                                placeholder="Certificate ID"
                                            />

                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="certificate_title"
                                                value={certificateData.certificate_title}
                                                onChange={handleInputChange}
                                                placeholder="Certificate title"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="examination_type"
                                                value={certificateData.examination_type}
                                                onChange={handleInputChange}
                                                placeholder="Type of examination / Event (optional)"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="client_name"  // Maps to `client_name`
                                                value={certificateData.client_name}
                                                onChange={handleInputChange}
                                                placeholder="Issued To"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="date"
                                                name="dateOfIssue"  // Maps to `issue_date`
                                                value={certificateData.dateOfIssue}
                                                onChange={handleInputChange}
                                                placeholder="Date of Issue"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="issuedNumber"
                                                value={certificateData.issuedNumber}
                                                onChange={handleInputChange}
                                                placeholder="Issue number"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="issuedBy"
                                                value={certificateData.issuedBy}
                                                onChange={handleInputChange}
                                                placeholder="Issued by"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="R_CC_Mn">
                                <div className="R_CC_Mn_Main">
                                    <h4>Upload file (optional)</h4>
                                    <p>
                                        <b>Note:</b> The uploaded file is solely for internal records management purposes and will not be visible to the verifier or the general public.
                                    </p>

                                    <div 
                                        className={`Image_Upload_div ${isDragging ? 'dragging' : ''}`} 
                                        onClick={triggerFileInput}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="uploadedImage" />
                                        ) : (
                                            <>
                                                <img src={PhotoIcon} className="photo_Icon" alt="Photo Icon" />
                                                <span>Drag and drop file (pdf, Jpeg, PNG)</span>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />

                                    <div className="Submit_Sec">
                                        <button type="submit" disabled={loading} className="btn-bg">
                                            {loading ? "Submitting..." : "Save changes"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>


            <div className="Copy_Url_Sec">

            <div className="Port_into">
                        <h2><WorkspacePremiumIcon /><span><i></i><i></i>{organizationName}</span>  CMVP Portal</h2>
                        <p>
                            Welcome to your CMVP portal.
                        </p>
                    </div>
                    
                <div className="Copy_Url_box" onClick={handleCopy}>
                    <div className="Copy_Url_box_Main">
                        <h3>{copyMessage}</h3>
                        <input
                            id="portalUrl"
                            type="text"
                            value={`${config.WEB_PAGE_BASE_URL}/${organizationID}/${organizationName}/`}
                            readOnly
                        />
                    </div>
                    <button className="Copy_Url_Btn">
                        <img src={CopyIcon} alt="Copy Icon" />
                    </button>
                </div>
                

            </div>

            <div className="Main_Port_Sec">
                <div className="fsite-container">


                    <div className="ToP_Upload_env">
                        <h3
                            className={`Upload_Box_Toggler ${
                                isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''
                            }`}
                            onClick={toggleUploadEnvVisibility}
                        >
                            Upload <img src={AngleDownIcon} alt="Angle Down Icon" />
                        </h3>
                        <div className="Upload_Conunter">
                            <span>0%</span>
                            <p>
                                You can only upload <b>{numDailyCertificateUpload}</b> certificates a day
                            </p>
                        </div>
                    </div>

                    <div className={`Upload_env_main ${isUploadEnvHidden ? 'Hide_Envi_Box' : ''}`}>
                        <button className="CertUpload_Btn btn-bg" onClick={handleUploadButtonClick}>
                            <CloudUploadIcon /> Upload Certificate
                        </button>

                            <div className="Upload_env_main_Foot">
                            <p>
                                {uploadedCount} uploaded<img src={DropArrow1} alt="Drop Arrow 1" />
                            </p>
                            <p>
                                {deletedCount} deleted <img src={DropArrow2} alt="Drop Arrow 2" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
