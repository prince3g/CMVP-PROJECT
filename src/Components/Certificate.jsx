import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Certificate = ({ data, onGoBack }) => {
    
  return (
    <div className="certificate-container">
      {!data || !data.certificate_details ? (
        <p>No certificate data available.</p>
      ) : (
        <>
          <div className="certificate-header">
            <div className="verified-badge">
                <button className="btn-bg" onClick={onGoBack}><ArrowBackIcon /> Back</button>

              <p className="status"
              style={{
                color: data.status === "valid" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {data.status === "valid" ? "✔ Verified" : "Invalid"}
            </p>


            </div>
            <h1 className="big-text">Certificate of Achievement</h1>
          </div>
          <div className="certificate-body">
            <p>
              Certificate Number: <span>{data.certificate_details.certificate_id}</span>
            </p>
            <p>
              Certificate Title: <span>{data.certificate_details.certificate_title}</span>
            </p>
            <p>
              Issued Number: <span>{data.certificate_details.issuedNumber}</span>
            </p>
            <p>
              Date of Issue: <span>{data.certificate_details.issue_date}</span>
            </p>
            <p>
              Issued By: <span>{data.certificate_details.organization_name}</span>
            </p>
            <p>
              Status:{" "}

              <span className="status"
              style={{
                color: data.status === "valid" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {data.status === "valid" ? "✔ Verified" : "Invalid"}
            </span>

            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Certificate;
