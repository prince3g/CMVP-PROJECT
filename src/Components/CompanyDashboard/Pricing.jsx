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
                <h2>Subscription Plans</h2>
                <p className="paopa">Your Subscription plan for certificate management and verification portal (CMVP).</p>
            </div>

                    
                             <div className="Plans_Sec">
                                {errorMessage ? (
                                    <div className="error_message">
                                        <p className="erroroo">{errorMessage}</p>
                                    </div>
                                ) : plan ? (
                                <div className="plan_box">
                                    <div className="Pricing_sub">
                                        <h3>{plan.subscription_plan.name}</h3>
                                        {/* <div className="pricing_Top_Btns">
                                            {["1 Month", "3 Months", "6 Months", "1 Year"].map((duration) => (
                                                <button key={duration} className="plan_btn">
                                                    {duration}
                                                </button>
                                            ))}
                                        </div> */}
                                    </div>
                                    <div className="plan_box_Top">
                                        <div className="plan_box_Top_1">
                                            <h3>{plan.subscription_plan.name}</h3>
                                        </div>
                                        <div className="plan_box_Top_1">
                                            <h3 className="plan_price">${plan.subscription_plan.price}</h3>
                                            <Link 
                                                to={`/edit-plan?id=${plan.subscription_plan.id}&price=${plan.subscription_plan.price}&name=${encodeURIComponent(plan.subscription_plan.name)}
                                                &twentyFourSevenSupport=${encodeURIComponent(plan.subscription_plan.features["24/7_support"] || '')}`}>
                                                Subscribe
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="plan_box_Body">
                                    <table className="plan_table">
                                        <thead>
                                            <tr>
                                                <th>Feature</th>
                                                <th>Active</th>
                                                <th>Not Active</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>24/7 Support</td>
                                                <td>
                                                    {plan.subscription_plan.features["24/7_support"] ? (
                                                        <span className="Check_Span">
                                                            <img src={CheckIcon} alt="Check Icon" />
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <img src={MinusIcon} alt="Minus Icon" />
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    {!plan.subscription_plan.features["24/7_support"] ? (
                                                        <span className="Check_Span">
                                                            <img src={MinusIcon} alt="Minus Icon" />
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <img src={CheckIcon} alt="Check Icon" />
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Maximum Login Users</td>
                                                <td>
                                                    <span className="Check_Span">
                                                        <img src={CheckIcon} alt="Check Icon" />
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>
                                                        <img src={MinusIcon} alt="Minus Icon" />
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Number of Certificate Categories</td>
                                                <td>
                                                    <span className="Check_Span">
                                                        <img src={CheckIcon} alt="Check Icon" />
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>
                                                        <img src={MinusIcon} alt="Minus Icon" />
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Number of Daily Certificate Uploads</td>
                                                <td>
                                                    <span className="Check_Span">
                                                        <img src={CheckIcon} alt="Check Icon" />
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>
                                                        <img src={MinusIcon} alt="Minus Icon" />
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Access Deleted Certificates Files</td>
                                                <td>
                                                    {plan.subscription_plan.features["access_deleted_certificates_files"] ? (
                                                        <span className="Check_Span">
                                                            <img src={CheckIcon} alt="Check Icon" />
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <img src={MinusIcon} alt="Minus Icon" />
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    {!plan.subscription_plan.features["access_deleted_certificates_files"] ? (
                                                        <span className="Check_Span">
                                                            <img src={MinusIcon} alt="Minus Icon" />
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <img src={CheckIcon} alt="Check Icon" />
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    </div>
                                </div>
                            ) : (
                                <p>Loading plan details...</p>
                            )}
                            </div>
                    </div>
    )
}
