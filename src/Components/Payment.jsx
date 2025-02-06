import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import RemitaBDG from '../assets/Img/remita-bdg.png';
import CheckIcon from '@mui/icons-material/Check';

function Payment() {
    const [isYearly, setIsYearly] = useState(false);
    const [count, setCount] = useState(1);

    // Toggle between Monthly and Yearly
    const handleToggle = () => {
        setIsYearly(prevState => !prevState);
    };

    // Increase or decrease count between 1 and 20
    const handleCountChange = (type) => {
        setCount(prevCount => {
            if (type === "increase" && prevCount < 20) return prevCount + 1;
            if (type === "decrease" && prevCount > 1) return prevCount - 1;
            return prevCount;
        });
    };

    // Handle payment confirmation
    const handlePaymentConfirmation = () => {
        Swal.fire({
            title: "Payment Confirmed!",
            text: "We have received your payment and will update your subscription within 24 hours.",
            icon: "success",
            confirmButtonText: "OK",
            showClass: {
                popup: "animate__animated animate__fadeInDown"
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutUp"
            }
        });
    };

    return (
        <div className="Payment-sec">
            <div className="site-container">
                <div className="payment-main">
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
                                        <input type="text" readOnly value="Proliance Limited" />
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
                                        <label>Amount:</label>
                                        <input type="text" readOnly value="9495" />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="payment-part-2">
                            <ul>
                                <li><CheckIcon /> Access to Portal for 15 days after Registration</li>
                                <li><CheckIcon /> Add 3 certificate categories daily</li>
                                <li><CheckIcon /> Upload 5 certificates daily</li>
                                <li><CheckIcon /> Access to deleted certificates and files</li>
                                <li><CheckIcon /> 24/7 support</li>
                            </ul>

                            <h2>
                                <b>Number of {isYearly ? "Year(s)" : "Month(s)"}</b>
                                <button>
                                    <span onClick={() => handleCountChange("decrease")}>-</span>
                                    <span>{count}</span>
                                    <span onClick={() => handleCountChange("increase")}>+</span>
                                </button>
                            </h2>

                            <h3>
                                <span>Charge today</span>
                                <span>NGN9495</span>
                            </h3>

                            <button className="confrim-btn" onClick={handlePaymentConfirmation}>
                                I’ve Sent the Money
                            </button>

                            <h6>We will confirm your payment within 24hrs and update your subscription accordingly.</h6>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Payment;
