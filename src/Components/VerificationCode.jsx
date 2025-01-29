import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const VerificationCode = () => {
  const [inputs, setInputs] = useState(Array(6).fill("")); // Change to 6 inputs
  const [timer, setTimer] = useState(25);
  const [isResendVisible, setResendVisible] = useState(false);

  // Handle input changes
  const handleInputChange = (index, event) => {
    const value = event.target.value;

    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("text");

    // Ensure only numeric data and check if length matches the number of inputs
    if (/^\d+$/.test(pasteData) && pasteData.length === inputs.length) {
      const newInputs = pasteData.split("").slice(0, inputs.length);
      setInputs(newInputs);
    }
  };

  // Trigger validation when all 6 fields are filled
  useEffect(() => {
    if (inputs.every((input) => input !== "")) {
      console.log("Token Validated: ", inputs.join("")); // Dummy action on token validation
    }
  }, [inputs]);

  // Reset the timer when "Resend" is clicked
  const handleResend = () => {
    setTimer(25); // Reset the timer to 25 seconds
    setResendVisible(false); // Hide the resend button while the timer counts down
    setInputs(Array(6).fill("")); // Clear the input fields
    console.log("Verification code resent."); // Dummy action for resending code
  };

  useEffect(() => {
    if (timer === 0) {
      setResendVisible(true); // Show the Resend button when the timer reaches 0
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [timer]);

  return (
    <section className="Get-Seecos login-desis">
      <div className="site-container">
        <div className="Reg_Sec">
          <div className="Reg_Box">
            <div className="Reg_Box_Header">
              <h3>Verification Code</h3>
              <p>Input verification code!</p>
            </div>

            <div className="Gland-Quest jjaao">
              <div className="Gland-Quest-data gghaja-flex">
                {inputs.map((input, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1} // Limit to 1 digit per input
                    value={input} // Bind value to state
                    onChange={(e) => handleInputChange(index, e)} // Handle input change
                    onPaste={handlePaste} // Handle pasting
                  />
                ))}
              </div>
            </div>
            <div className="ghha-foot">
              <p>
                Didn't receive the message?{" "}
                {timer > 0 && <span>Resend in {timer} sec</span>}
                {isResendVisible && (
                  <button onClick={handleResend}>Resend</button> // Restart the timer
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationCode;
