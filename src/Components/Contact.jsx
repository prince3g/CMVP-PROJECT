import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";

import ChatIcon from '../assets/Img/contact-chat-icon.svg';
import LocationIcon from '../assets/Img/location-icon.svg';
import CallIcon from '../assets/Img/call-icon.svg';


export default function HelpPage() {

    // State for form inputs
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        serviceInterest: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/accounts/auth/send-contact-email/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }

            const data = await response.json();
            alert("Message sent successfully!");
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                serviceInterest: "",
                message: ""
            });
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send the message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="CnMMha-page">
            <div className="MMha-page-header">
                <div className="site-container GG_Padded">
                    <div className="hero-Blam">
                        <h2 className="big-text">Contact us</h2>
                    </div>
                </div>
            </div>

            <div className="contact-Dlts">
                <div className="site-container GG_Padded">
                    <div className="contact-Dlts-header">
                        <p>
                            Please use the form below to submit your enquiry, providing as much information as possible, and we'll get back to you as swiftly as possible.
                        </p>
                    </div>

                    <div className="Contact_SeccO_1">
                        <ul>
                            <li>
                                <span className="DDl_Span">
                                    <img src={ChatIcon} alt="Chat icon" />
                                </span>
                                <div className="DDl_Div">
                                    <h3>Email us</h3>
                                    <h4><a href="mailto:info@cmvp.net">info@cmvp.net</a></h4>
                                </div>
                            </li>
                            <li>
                                <span className="DDl_Span">
                                    <img src={CallIcon} alt="Call icon" />
                                </span>
                                <div className="DDl_Div">
                                    <h3>Call us</h3>
                                    <h4><a href="tel:+2348079701019">+234 807 970 1019</a><br></br> <a href="tel:+2349114597013">+234 911 459 7013</a></h4>
                                </div>
                            </li>
                            <li>
                                <span className="DDl_Span">
                                    <img src={LocationIcon} alt="Location icon" />
                                </span>
                                <div className="DDl_Div">
                                    <h3>Location</h3>
                                    <h4>Plot 5 Owule Ojuan Street, off Peter Odili Road, Trans Amadi, Port Harcourt, Rivers</h4>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="message_Sec">
                        <h2 className="big-text">Message</h2>
                        <form className="message-form" onSubmit={handleSubmit}>
                            <div className="message-DFlex">
                                <div className="message-form-input">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="message-form-input">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="message-DFlex">
                                <div className="message-form-input">
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* <div className="message-form-input">
                                    <select
                                        name="serviceInterest"
                                        value={formData.serviceInterest}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">--Select service of interest--</option>
                                        <option value="Consultancy">Consultancy</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Project Management">Project Management</option>
                                        <option value="Supply Chain Management">Supply Chain Management</option>
                                        <option value="Learning and Development">Learning and Development</option>
                                    </select>
                                </div> */}
                            </div>
                            <div className="message-form-input">
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="message-form-input">
                                <button type="submit" disabled={isSubmitting} className="btn-bg">
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}
