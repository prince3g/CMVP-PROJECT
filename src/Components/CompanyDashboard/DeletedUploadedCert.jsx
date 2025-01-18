import config from '../../config.jsx';
import React, { useState, useEffect } from "react";
import axios from 'axios';  // Assuming axios is already installed
import AngleDownIcon from './Img/angle-down.svg';
import RestoreIcon from './Img/restore_icon.svg';
import VerifiedIcon from './Img/verified-badge2.svg';
import TrashIcon from './Img/trash.svg';

export default function DeletedUploadedCert() {

    const organizationID = localStorage.getItem("authUserId");

    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);
    const [isCertificateSectionVisible, setIsCertificateSectionVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [loadingCertificateId, setLoadingCertificateId] = useState(null);  // Track the loading certificate

    // Fetch the soft deleted certificates when the component mounts
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/certificates/soft-deleted-certificates/${organizationID}/`);
                setCertificates(response.data.results); // Use 'results' from the response
            } catch (error) {
                console.error("Error fetching certificates:", error);
            }
        };
    
        fetchCertificates();
    }, []);
    
    
    // Toggle the visibility of the upload environment section
    const toggleUploadEnvVisibility = () => {
        setIsUploadEnvHidden(!isUploadEnvHidden);
        setIsUploadBoxTogglerActive(!isUploadBoxTogglerActive);
    };

    const handleCloseButtonClick = () => {
        setIsCertificateSectionVisible(false);
    };

    const handlePreviewButtonClick = () => {
        setIsCertificateSectionVisible(true);
    };

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Function to handle the restoration of a certificate
    const restoreCertificate = async (certificateId) => {
        setLoadingCertificateId(certificateId); // Set the loading state to the current certificate ID
        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/certificates/${certificateId}/restore/`);
            console.log('Certificate restored:', response.data);

            // Update the certificates state by removing the restored certificate
            setCertificates(prevCertificates => 
                prevCertificates.filter(cert => cert.certificate_id !== certificateId)
            );
        } catch (error) {
            console.error("Error restoring certificate:", error);
        } finally {
            setLoadingCertificateId(null); // Reset the loading state after the request finishes
        }
    };

    return (
        <div className="Uploaded_Cert_page">
            <div className="ToP_Upload_env">
                <h3 
                    className={`Upload_Box_Toggler ${isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''}`} 
                    onClick={toggleUploadEnvVisibility}
                >
                    Deleted Certificates <img src={AngleDownIcon} alt="Angle Down Icon" />
                </h3>
                <div className="Upload_Conunter">
                    <span>{certificates.length}</span>
                    <p><b>Deleted</b> certificates</p>
                </div>
            </div>

            <div className={`Upload_env_main ${isUploadEnvHidden ? 'Hide_Envi_Box' : ''}`}>
                <div className="Cert_Carti_Sel_Sec">
                    <h3>Training certificate</h3>
                    <div className="Cart_select_Sec">
                        <select value={selectedCategory} onChange={handleChange}>
                            <option value="">All certificate</option>
                            <option value="training">Training certificate</option>
                            <option value="inspection">Inspection certificate</option>
                        </select>
                    </div>
                </div>

                <div className="Table_Sec">
                    <table className="Upload_Table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Certificate number</th>
                                <th>Certificate title</th>
                                <th>Type of Examination / Event</th>
                                <th>Issued to</th>
                                <th>Date of issue</th>
                                <th>Issue number</th>
                                <th>Issued by</th>
                                <th>Status</th>
                                <th>Uploaded Downloaded / E-copy</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certificates.map((cert, index) => (
                                <tr key={cert.id}>
                                    <td><span className="serial_Number_span">{index + 1}</span></td> {/* Serial number */}
                                    <td>{cert.certificate_id}</td>
                                    <td>{cert.client_name}</td>
                                    <td>{cert.issue_date ? "Welding" : "N/A"}</td> {/* Example of how to handle missing fields */}
                                    <td>{cert.client_name}</td>
                                    <td>{cert.issue_date}</td>
                                    <td>038</td>
                                    <td>Mr. Daniel</td>
                                    <td>
                                        <span className="Status_Respn"><img src={VerifiedIcon} alt="Verified Icon" /> Verified</span>
                                    </td>
                                    <td>
                                        <div className="Uploaded_Cert_Div">
                                            <button className="deleted_LAbel">Deleted <img src={TrashIcon} alt="Trash Icon" /></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="td_Btns">
                                            <button 
                                                className="restore_btn" 
                                                onClick={() => restoreCertificate(cert.certificate_id)}
                                                disabled={loadingCertificateId === cert.certificate_id}  // Disable the button if it's loading
                                            >
                                                {loadingCertificateId === cert.certificate_id ? "Restoring..." : "Restore"} 
                                                {loadingCertificateId === cert.certificate_id && <span className="loader">...</span>}
                                                <img src={RestoreIcon} alt="Restore Icon" />
                                            </button>
                                            <button>Remove</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
