
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Css/Dash.css';
import config from '../../config';

export default function RegUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`${config.API_BASE_URL}/api/accounts/auth/subscription/organizations/subscriptions/`)
      .then((response) => {
        setData(response.data); // Access the `results` array from the response
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

   // Function to handle delete
   const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this organization?");
    if (confirmDelete) {
      axios
        .delete(`${config.API_BASE_URL}/api/accounts/auth/organization/${id}/`)
        .then(() => {
          // Update the state to reflect the deletion
          setData((prevData) => prevData.filter((organization) => organization.id !== id));
          alert("Organization deleted successfully!");
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred while deleting the organization.");
        });
    }
  };

  return (
    <div className="DDD-Seco">
      <div className="JJha-DhA">
        <div className="Dash-Intro">
          <h2>Registered Users</h2>
        </div>

        <div className="Sec-table">
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Address</th>
                <th>Registration Date</th>
                <th>Current Plan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((organization, index) => (
                <tr key={organization.id}>
                  {/* Serial Number (S/N) */}
                  <td>{index + 1}</td>

                  {/* Organization Data */}
                  <td>{organization.name}</td>
                  <td>{organization.email}</td>
                  <td>{organization.phone}</td>
                 
                  <td>{organization.address}</td>

                  {/* Format Date */}
                  <td>{new Date(organization.date_joined).toLocaleDateString('en-GB')}</td>

                  {/* Actions */}
                  <td>{organization.subscription_plan_name}</td>
                  <td>
                    <div className="action-btns">
                   <Link
                      to={{
                        pathname: "/admin-dashboard/user-profile",
                        search: `?num_certificates_uploaded=${encodeURIComponent(organization.num_certificates_uploaded)}
                        &name=${encodeURIComponent(organization.name)}
                        &phone=${encodeURIComponent(organization.phone)}
                        // &logo=${encodeURIComponent(organization.logo)}
                        &address=${encodeURIComponent(organization.address )}
                        &id=${organization.id}
                        
                        &subscription_start_time=${encodeURIComponent(organization.subscription_start_time)}
                        &subscription_end_time=${encodeURIComponent(organization.subscription_end_time)}
                        &subscription_plan_name=${encodeURIComponent(organization.subscription_plan_name)}
                        &subscription_duration=${encodeURIComponent(organization.subscription_duration)}
                        &email=${encodeURIComponent(organization.email)}
                        &date_joined=${encodeURIComponent(organization.date_joined)}`,
                      }}
                      className="prof-bank-btn"
                    >
                      View Profile
                    </Link>
                      
                      <button onClick={() => handleDelete(organization.id)}>Remove</button>
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
