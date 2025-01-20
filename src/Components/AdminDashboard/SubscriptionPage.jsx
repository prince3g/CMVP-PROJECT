import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Css/Dash.css';
import config from "../../config";

import MinusIcon from './Img/minus-icon.svg';
import CheckIcon from './Img/check-icon.svg';

export default function SubscriptionPage() {
    const [plans, setPlans] = useState([]);

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
    }, []);


    
    return (
        <div className="DDD-Seco">
            <div className="Pricing_Sec">
                <div className="Dash-Intro">
                    <h2>Subscription Plans</h2>
                    <p>Subscription plans for certificate management and verification portal (CMVP).</p>
                </div>
                <div className="JJha-DhA">
                    <div className="Dash-Intro subscripp-header">
                        <h2>Added Subscription Plans</h2>
                        <Link to="/admin-dashboard/add-subscription-plan" className="add-subscription-plan">
                            <span className="material-icons">add</span>
                            Add Subscription Plan
                        </Link>
                    </div>
                </div>

                <div className="Plans_Sec">
                    {plans.length > 0 ? (
                        plans.map((plan) => (
                            <div key={plan.id} className="plan_box">
                                <div className="Pricing_sub">
                                    <h3>{plan.name}</h3>
                                    <div className="pricing_Top_Btns">
                                        {["1 Month", "3 Months", "6 Months", "1 Year"].map((duration) => (
                                            <button key={duration} className="plan_btn">
                                                {duration}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="plan_box_Top">
                                    <div className="plan_box_Top_1">
                                        <h3>{plan.name}</h3>
                                    </div>
                                    <div className="plan_box_Top_1">
                                        <h3 className="plan_price">${plan.price}</h3>
                                        <Link 
                                            to={`/admin-dashboard/edit-plan?id=${plan.id}&price=${plan.price}&name=${encodeURIComponent(plan.name)}
                                            &storage=${encodeURIComponent(plan.features.storage || '')}
                                            &num_certificate_categories=${encodeURIComponent(plan.features.num_certificate_categories || '')}
                                            &num_daily_certificate_upload=${encodeURIComponent(plan.features.num_daily_certificate_upload || '')}
                                            &access_deleted_certificates_files=${encodeURIComponent(plan.features.access_deleted_certificates_files || '')}
                                            &maximum_login_users=${encodeURIComponent(plan.features.maximum_login_users || '')}
                                            &twentyFourSevenSupport=${encodeURIComponent(plan.features["24/7_support"] || '')}`}
                                            >
                                            Edit Plan
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
                                            {/* Check each feature's property in `features` */}
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
        </div>
    );
}
