import React from "react";
import "../assets/styles/NewsLetter.css";

function NewsLetter() {
  return (
    <div className="news-letter">
      <div className="header">
        <h3>FREE EMAIL NEWSLETTER</h3>
      </div>
      <p>Let About.com send you the latest from our Neurology Expert</p>
      <form>
        <input
          type="checkbox"
          id="treatment"
          name="treatment"
          value="treatment"
        />
        <label for="treatment"> Treatment Options</label>
        <br />
        <input
          type="checkbox"
          id="specialty"
          name="specialty"
          value="specialty"
        />
        <label for="specialty"> Specialty Information</label>
        <br />

        <input
          className="email-input"
          type="text"
          name="email"
          placeholder="Your email address"
        />
        <div className="submit-btn-container">
          <button className="submit-btn">SIGN UP</button>
        </div>
      </form>
    </div>
  );
}

export default NewsLetter;
