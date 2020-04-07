import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className="skewed-bg">
        <h1 className="name">Planet Code</h1>
        <h1 className="subtext">An intuitive learning solution</h1>
        <Link to="/practice" style={{ textDecoration: "none" }}>
          <button className="uk-button uk-button-primary get-started">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
