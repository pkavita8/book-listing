import React, { useState } from "react";
import "../assets/styles/ButtonsNPopups.css";

function ButtonsNPopups() {
  const [showThankyou, setShowThankyou] = useState(false);
  const [showComeback, setShowComeBack] = useState(false);

  const showThankyouPopup = () => {
    setShowComeBack(false);
    setShowThankyou(true);
    setTimeout(() => {
      setShowThankyou(false);
    }, 5000);
  };

  const showComebackPopup = () => {
    setShowThankyou(false);
    setShowComeBack(true);
    setTimeout(() => {
      setShowComeBack(false);
    }, 5000);
  };
  return (
      <div className="buttons-popups">
        <div>
          <p style={{ textAlign: "center" }}>
            Click on the buttons to see pop ups.
          </p>
          <div className="row-center">
            <button className="option no" onClick={showComebackPopup}>
              Cancel
            </button>
            <button className="option yes" onClick={showThankyouPopup}>
              Accept
            </button>
          </div>
        </div>
        <div
          className="popup thank-you"
          style={{ marginRight: !showThankyou ? "-300px" : "0" }}
        >
          <p>Thank you!</p>
        </div>
        <div
          className="popup come-back"
          style={{ marginRight: !showComeback ? "-350px" : "0" }}
        >
          <p>Come back soon.</p>
        </div>
      </div>
  );
}

export default ButtonsNPopups;
