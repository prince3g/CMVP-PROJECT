

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { Link } from "react-router-dom";
import axios from "axios";
import ShowPassIcon from "../assets/Img/showPass-icon.svg";
import HidePassIcon from "../assets/Img/hidePass-icon.svg";

const Login = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
  
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/accounts/auth/login/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const token = response.data;
  
      localStorage.setItem("authToken", token.access);
      localStorage.setItem("authEmail", token.email);
      localStorage.setItem("authUserId", token.unique_subscriber_id);
      localStorage.setItem("authName", token.name);
      localStorage.setItem("authPhone", token.phone);
      localStorage.setItem("authAddress", token.address);
      localStorage.setItem("loginTime", token.login_time);
  
      // Check if the logged-in email is "ekenehanson@gmail.com"
      if (token.email === "ekenehanson@gmail.comt" && token.user_role === "super_admin") {
        navigate("/admin-dashboard/"); 
      } else {  
        navigate("/dashboard/");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || "Failed to log in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };



  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  
  return (
    <div>
      <section className="Get-Seecos login-desis">
        <div className="site-container">
          <div className="Reg_Sec">
            <div className="Reg_Box">
              <div className="Reg_Box_Header">
                <h3>Welcome Back</h3>
              </div>
              <form className="Reg_Form" onSubmit={handleFormSubmit}>
                <div className="Reg_Input">
                <div className={`input-container ${emailFocused ? "focused" : ""}`}>
                <label>Email address*</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    onFocus={() => setEmailFocused(true)}
                    onBlur={(e) => setEmailFocused(e.target.value !== "")}
                    autoFocus
                  />
                </div>
                </div>
                <div className="Reg_Input pass-Input">
                <div className={`input-container ${passwordFocused ? "focused" : ""}`}>
                <label>Password</label>
                  <input
                    type={passwordType}
                    name="password"
                    id="passwordField"
                    onFocus={() => setPasswordFocused(true)}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    onBlur={(e) => setPasswordFocused(e.target.value !== "")}
                  />
                  <span id="togglePassword" onClick={togglePasswordVisibility}>
                    <img
                      src={passwordType === "password" ? ShowPassIcon : HidePassIcon}
                      id="toggleIcon"
                      alt={passwordType === "password" ? "Show Password" : "Hide Password"}
                    />
                  </span>

                  </div>
                </div>

                <div className="Reg_Input">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>

                <div className="Reg_Input">
                  <button
                    type="submit"
                    className="btn-bg"
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Logging In..." : "Log In"}
                  </button>
                </div>
              </form>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="Reg_Box_Foot">
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
