import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import './Css/Dash.css';
import config from "../../config.jsx";
import FlashMessage from "../FlashMessage/FlashMessage.jsx"
import MinusIcon from './Img/minus-icon.svg';
import CheckIcon from './Img/check-icon.svg';

export default function Pricing() {

    const [flash, setFlash] = useState(null);
    
    const showMessage = (message, type) => {
            setFlash({ message, type });
        };
    
    const [activePlanFree, setActivePlanFree] = useState("1 Month");
    const [activePlanBasic, setActivePlanBasic] = useState("1 Month");
    const [activePlanPro, setActivePlanPro] = useState("1 Month");

    const [basicPrice, setBasicPrice] = useState(200);
    const [proPrice, setProPrice] = useState(350);

    const [errorMessage, setErrorMessage] = useState(null);

    const [plans, setPlans] = useState([]);
    const [plan, setPlan] = useState(null); // Use null initially for a single object

    useEffect(() => {
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
                        if (response.status === 404) {
                            showMessage("You are not subscribed to any plan. Please subscribe to access the features.", "failure")
                            throw new Error("You are not subscribed to any plan. Please subscribe to access the features.");
                        } else {
                            throw new Error("Failed to fetch subscription details");
                        }
                    }
    
                    const data = await response.json();
                    setPlan(data); // Set the single object to the state

                    // console.log("data")
                    // console.log(data)
                    // console.log("data")
                    localStorage.setItem("subscriptionDetails", JSON.stringify(data)); 
                    // console.log("Subscription Details: ", data);
    
                } catch (error) {
                    console.error("Error fetching subscription details:", error);
                    setPlan(null); // Clear plan state
                    setErrorMessage(error.message); // Set error message to be displayed
                }
            }
        };
    
        fetchSubscriptionDetails();
    }, []);
    

    const handlePlanClick = (plan, setActivePlan, setPrice, basePrice) => {
        setActivePlan(plan);
        let multiplier = 1;
        switch(plan) {
            case "3 Months":
                multiplier = 3;
                break;
            case "6 Months":
                multiplier = 6;
                break;
            case "1 Year":
                multiplier = 12;
                break;
            default:
                multiplier = 1;
        }
        setPrice(basePrice * multiplier);
    };

    return (
        <div className="Pricing_Sec">
            <div className="Pricing_top">

            {flash && (
                <FlashMessage
                message={flash.message}
                type={flash.type}
                onClose={() => setFlash(null)} // Remove flash message after timeout
                />
            )}
                <h2>Your Current Subscription</h2>
                <p className="paopa">Your current subscription plan for CMVP!</p>
                <h2>Your Subscription Plans</h2>
                {/* <p className="paopa">Your Subscription plan for certificate management and verification portal (CMVP).</p> */}
            </div>



            <div className="Table_Sec">
                 <div className="Cart_select_Sec kkja-de">
                                        <select>
                                            <option value="">Last 3 months</option>
                                            <option value="">Last 6 months</option>
                                            <option value="">Last 12 months</option>
                                        </select>
                                    </div>


                    <table className="Upload_Table">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Date of Subscription</th>
                                <th>Plan</th>
                                <th>Duration</th>
                                <th>Ammount</th>
                                <th>Vat (7.5%)</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                             <td>1</td>
                             <td>12/12/2025</td>
                             <td>Basic Plan</td>
                             <td>3 months</td>
                             <td>NGN3,000</td>
                             <td>NGN 3,885.12</td>
                             <td>NGN 4,000</td>
                             <td>Active</td>
                             <td>
                             <div className="Uploaded_Cert_Div">
                                    <button className="down_Inv_LAbel">Download Invoice</button>
                                </div>
                                </td>

                            </tr>

                            <tr>
                             <td>2</td>
                             <td>12/12/2025</td>
                             <td>Basic Plan</td>
                             <td>3 months</td>
                             <td>NGN3,000</td>
                             <td>NGN 3,885.12</td>
                             <td>NGN 4,000</td>
                             <td>Inactive</td>
                             <td>
                             <div className="Uploaded_Cert_Div">
                                    <button className="down_Inv_LAbel">Download Invoice</button>
                                </div>
                                </td>

                            </tr>

                        </tbody>
                    </table>


                    
                <div className="pagination">
        <a href="#">&laquo;</a>
        <a href="#">1</a>
        <a href="#" class="active">2</a>
        <a href="#">3</a>
        <a href="#">&raquo;</a>
      </div>


                </div>



                    
                      
                    </div>
    )
}
