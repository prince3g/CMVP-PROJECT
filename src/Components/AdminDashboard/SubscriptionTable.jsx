// import React from 'react';
// import { Link} from "react-router-dom";

// const SubscriptionTable = () => {
//   return (
//     <div className="JJha-DhA">
//       <div className="Dash-Intro subscripp-header">
//         <h2>Registered users with their subscription plans</h2>
//         <Link to="/add-subscription-plan" className="add-subscription-plan">
//         <span className="material-icons">add</span>
//         Add Subscription Plan
//       </Link>
//       </div>

//       <div className="Sec-table">
//         <table>
//           <thead>
            // <tr>
            //   <th>S/N</th>
            //   <th>Name</th>
            //   <th>Plan</th>
            //   <th>Duration</th>
            //   <th>Subscription Date</th>
            //   <th>Expiration date</th>
            //   <th>Status</th>
            //   <th>Uploaded documents</th>
            //   <th>Action</th>
            // </tr>
//           </thead>
//           <tbody>
            
//             <tr>
//               <td>1</td>
//               <td>Proliance LTD</td>
//               <td>Basic Plan</td>
//               <td>3 Months</td>
//               <td>12/2/2024</td>
//               <td>12/5/2024</td>
              // <td className='active-BGD'>Active</td>
//               <td>100 documents</td>
//               <td>
//                 <div className="action-btns">
//                 <Link to="user-profile" className="prof-bank-btn">
//                     View Profile
//                   </Link>
//                 </div>
//               </td>
//             </tr>


//             <tr>
//               <td>2</td>
//               <td>Cenglobal</td>
//               <td>Pro Plan</td>
//               <td>1 Month</td>
//               <td>12/2/2024</td>
//               <td>12/5/2024</td>
//               <td className='expired-BGD'>Expired</td>
//               <td>5 documents</td>
//               <td>
//                 <div className="action-btns">
//                   <Link to="user-profile" className="prof-bank-btn">
//                     View Profile
//                   </Link>
//                 </div>
//               </td>
//             </tr>

            
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionTable;


import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Css/Dash.css";
import config from "../../config";

const SubscriptionTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios
      //.get(`${config.API_BASE_URL}/api/accounts/auth/organization/`)
      .get(`${config.API_BASE_URL}/api/accounts/auth/subscription/organizations/subscriptions/`)
      .then((response) => {
        setData(response.data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle delete functionality
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this organization?");
    if (confirmDelete) {
      axios
        .delete(`${config.API_BASE_URL}/api/accounts/auth/organization/${id}`)
        .then(() => {
          setData((prevData) => prevData.filter((org) => org.id !== id));
          alert("Organization removed successfully!");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete the organization.");
        });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  const calculateDaysDifference = (endDate) => {
    if (!endDate) return 0;
    const currentDate = new Date();
    const endDateObj = new Date(endDate);
    const diffTime = endDateObj - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 1 ? diffDays : 0;
  };


  return (
    <div className="JJha-DhA">
      <div className="Dash-Intro subscripp-header">
        <h2>Registered Users with Their Subscription Plans</h2>
        <Link to="/admin-dashboard/add-subscription-plan" className="add-subscription-plan">
          <span className="material-icons">add</span>
          Add Subscription Plan
        </Link>
      </div>

      <div className="Sec-table">
        <table>
          <thead>
          <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Plan</th>
              <th>Duration</th>
              <th>Subscription Date</th>
              <th>Expiration date</th>
              <th>Status</th>
              <th>Uploaded documents</th>
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
                <td>{organization.subscription_plan_name}</td>
                <td>{calculateDaysDifference(organization.subscription_end_time)} Days</td>
                <td>
                  {organization.subscription_start_time 
                    ? new Date(organization.subscription_start_time).toLocaleDateString("en-GB") 
                    : "Not Subscribed"}
                </td>
                
                <td>
                  {organization.subscription_end_time 
                    ? new Date(organization.subscription_end_time).toLocaleDateString("en-GB") 
                    : "Not Subscribed"}
                </td>


                <td className='active-BGD'>Active</td>


                {/* Contact Name */}
                <td>{organization.num_certificates_uploaded}</td>

                {/* Actions */}
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
  );
};

export default SubscriptionTable;
