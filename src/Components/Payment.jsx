import React, { useState } from "react";
import Swal from "sweetalert2";
import RemitaBDG from '../assets/Img/remita-bdg.png';
import CheckIcon from '@mui/icons-material/Check';

function Payment() {
    const [isYearly, setIsYearly] = useState(false);
    const [count, setCount] = useState(1);

    // Base price setup
    const monthlyPrice = 9495;
    const yearlyPrice = monthlyPrice * 12;
    
    // Calculate amount based on selection
    const amount = isYearly ? yearlyPrice * count : monthlyPrice * count;
    const vat = amount * 0.075; // 7.5% VAT
    const total = amount + vat;

    // Subscription benefits list
    const subscriptionBenefits = [
        "Access to Portal for 15 days after Registration",
        "Add 3 certificate categories daily",
        "Upload 5 certificates daily",
        "Access to deleted certificates and files",
        "24/7 support"
    ];

    // Toggle Monthly/Yearly selection
    const handleToggle = () => {
        setIsYearly(prevState => {
            setCount(1); // Reset count when toggling
            return !prevState;
        });
    };

    // Handle count increase/decrease
    const handleCountChange = (type) => {
        setCount(prevCount => {
            const maxCount = isYearly ? 1 : 12; // Max 1 year, max 12 months
            if (type === "increase" && prevCount < maxCount) return prevCount + 1;
            if (type === "decrease" && prevCount > 1) return prevCount - 1;
            return prevCount;
        });
    };

    // Handle payment confirmation
    const handlePaymentConfirmation = () => {
        Swal.fire({
            title: "Thank you!",
            text: "We will confirm your payment and update your subscription within 48 hours",
            icon: "success",
            confirmButtonText: "OK",
            showClass: { popup: "animate__animated animate__fadeInDown" },
            hideClass: { popup: "animate__animated animate__fadeOutUp" }
        });
    };

    return (
        <div className="Payment-sec">
            <div className="site-container">
                <div className="payment-main">
                    
                    {/* Plan Selection */}
                    <div className="payment-main-top">
                        <h3>Get Basic Plan</h3>
                        <p>
                            <span>Monthly</span>
                            <button 
                                className={isYearly ? "toggle-button-monthly-yearly" : ""} 
                                onClick={handleToggle}
                            ></button>
                            <span>Yearly</span>
                        </p>
                    </div>

                    <div className="payment-body">
                        
                        {/* Payment Method Section */}
                        <div className="payment-part-1">
                            <div className="payment-part-1-Main">
                                <h3>Payment method</h3>
                                <div className="hhhas-btns">
                                    <button>Bank Transfer</button>
                                    <a href="#"><img src={RemitaBDG} alt="Remita Payment" /></a>
                                </div>
                                <form className="bank-dlt-form">
                                    <h5>Account Details</h5>

                                    <div className="bank-dlt-form-input">
                                        <label>Bank Name:</label>
                                        <input type="text" readOnly value="First Bank" />
                                    </div>

                                    <div className="bank-dlt-form-input">
                                        <label>Account Name:</label>
                                        <input type="text" readOnly value="Proliance LTD" />
                                    </div>

                                    <div className="bank-dlt-form-input">
                                        <label>Account No.:</label>
                                        <input type="text" readOnly value="1234567890" />
                                    </div>

                                    <div className="bank-dlt-form-input">
                                        <label>Currency:</label>
                                        <input type="text" readOnly value="NGN" />
                                    </div>

                                    <div className="bank-dlt-form-input">
                                        <label>TIN:</label>
                                        <input type="text" readOnly value="20657895-0001" />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Subscription Details Section */}
                        <div className="payment-part-2">
                            <ul>
                                {subscriptionBenefits.map((benefit, index) => (
                                    <li key={index}>
                                        <CheckIcon /> {benefit}
                                    </li>
                                ))}
                            </ul>

                            {/* Number of Months/Years Selection */}
                            <h2>
                                <b>Number of {isYearly ? "Year(s)" : "Month(s)"}</b>
                                <button>
                                    <span onClick={() => handleCountChange("decrease")}>-</span>
                                    <span>{count}</span>
                                    <span onClick={() => handleCountChange("increase")}>+</span>
                                </button>
                            </h2>

                            {/* Pricing Breakdown */}
                            <h3 className="ash-1">
                                <span>Amount</span>
                                <span>NGN{amount.toLocaleString()}</span>
                            </h3>

                            <h3 className="ash-2">
                                <span>VAT (7.5%)</span>
                                <span>NGN{vat.toLocaleString()}</span>
                            </h3>

                            <h3 className="ash-3">
                                <span>Total</span>
                                <span>NGN{total.toLocaleString()}</span>
                            </h3>

                            {/* Confirmation Button */}
                            <button className="confrim-btn" onClick={handlePaymentConfirmation}>
                                I’ve Sent the Money
                            </button>
                        </div>

                    </div> {/* End of payment-body */}
                </div> {/* End of payment-main */}
            </div> {/* End of site-container */}
        </div>
    );
}

export default Payment;
