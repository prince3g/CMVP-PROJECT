import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import MinusIcon from '../../assets/Img/minus-icon.svg';
import CheckIcon from '../../assets/Img/check-icon.svg';

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


export default function Subscription() {
    const [plans, setPlans] = useState([]);
    const [isSubscribing, setIsSubscribing] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    

    const navigate = useNavigate();
    const [flashMessage, setFlashMessage] = useState(""); // State for flash message

    useEffect(() => {
        // Fetch subscription plans
        const fetchPlans = async () => {
            try {
                const response = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/subscription-plans/`);
                const data = await response.json();
                setPlans(data.results); // The actual plans are in `results` array
                //console.log("Fetched Plans Data: ", data);
            } catch (error) {
                console.error("Error fetching subscription plans:", error);
            }
        };
        fetchPlans();



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
                    //console.log("Subscription Details: ", data);

                } catch (error) {
                    console.error("Error fetching subscription details:", error);
                }
            }
        };
        fetchSubscriptionDetails();
    }, []); // Empty dependency array, runs on component mount



    const handleSubscribeClick = async (planId) => {
        setIsSubscribing(planId); // Start loader for the specific plan
        const authToken = localStorage.getItem("authToken");
        const authUserId = localStorage.getItem("authUserId");

        if (!authToken) {
            setFlashMessage("Please login or register to continue");
            setTimeout(() => {
                setFlashMessage("");
                navigate("/login");
            }, 3000);
            setIsSubscribing(null); // Stop loader
            return;
        }

        const payload = {
            user: authUserId,
            subscription_plan: planId,
            transaction_id: "your_transaction_id"
        };

        try {

            const response = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/user-subscriptions/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to subscribe");
            }

            const result = await response.json();
            localStorage.setItem("subscription_plan", result.subscription_plan);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error subscribing:", error);
            setFlashMessage(error.message || "An unexpected error occurred");
            setTimeout(() => setFlashMessage(""), 3000);
        } finally {
            setIsSubscribing(null); // Stop loader
        }
    };



    const [paymentData, setpaymentData] = useState({
        key: "", // enter your key here
        customerId: "",
        firstName: "",
        lastName: "",
        email: "",
        amount: null,
        narration: "",
      });
      let data = {
        ...paymentData,
        onSuccess: function (response) {
          // function callback when payment is successful
          console.log("callback Successful Response", response);
        },
        onError: function (response) {
          // function callback when payment fails
          console.log("callback Error Response", response);
        },
        onClose: function () {
          // function callback when payment modal is closed
          console.log("closed");
        },
      };


    return (

                    <div  className="Pricing_Sec">
                    <div className="Pricing_top">
                        <h3 className="big-text">Subscription Plans</h3>
                        <p>Subscription plans for certificate management and verification portal (CMVP).</p>
                    </div>
                    <div className="Plans_Sec">
                        {plans.length > 0 ? (
                            plans.map((plan) => (
                                <div key={plan.id} className="plan_box">
                                    <div className="Pricing_sub">
                                        <h3>CMVP Plan</h3>
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
                                            <h3>{plan.name}</h3>
                                        </div>
                                        <div className="plan_box_Top_1">
                                    <h3 className="plan_price">${plan.price}</h3>
                                    <Link
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSubscribeClick(plan.unique_subscription_plan_id);
                                        }}
                                        className="btn-bg"
                                        >
                                        {isSubscribing === plan.unique_subscription_plan_id ? "Subscribing..." : "Subscribe"}
                                    </Link>
                                    {flashMessage && <div className="flash-message">{flashMessage}</div>}
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
                                                    <td>Access to portal</td>
                                                    <td>
                                                        {plan.features.access_deleted_certificates_files ? (
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
                                                        {!plan.features.access_deleted_certificates_files ? (
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
                                                    <td>Add up to {plan.features.num_certificate_categories} certificate categories</td>
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
                                                    <td>Upload up to {plan.features.num_daily_certificate_upload} certificates daily</td>
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
                                                    <td>Access to deleted certificates and files</td>
                                                    <td>
                                                        {plan.features.access_deleted_certificates_files ? (
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
                                                        {!plan.features.access_deleted_certificates_files ? (
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
                                                    <td>{plan.features.maximum_login_users} maximum login users</td>
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
                                                    <td>24/7 support</td>
                                                    <td>
                                                        {plan.features["24/7_support"] ? (
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
                                                        {!plan.features["24/7_support"] ? (
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
                            ))
                        ) : (
                            <p>Loading plans...</p>
                        )}
                    </div>
                </div>


    );
}
