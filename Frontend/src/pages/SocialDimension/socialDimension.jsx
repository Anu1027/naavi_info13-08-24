import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCoinContextData } from "../../context/CoinContext";
import "./socialDimension.scss";

import logo from "../../static/images/logo.svg";
import hamIcon from "../../static/images/icons/hamIcon.svg";
import SD from "../../static/images/SD1.png";
import chart from "../../static/images/chart.png";

const SocialDimension = () => {
  const navigate = useNavigate();
  const { preLoginMenu, setPreLoginMenu } = useCoinContextData();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <div className='SocialDimensionPage'>
      <div className="navbar">
        <div className="hamMenu-home" onClick={toggleMenu}> {/* Add onClick here */}
          <img src={hamIcon} alt="ham menu" />
        </div>
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="logo" />
        </div>
        <div className="menu-items">
          <div
            onClick={() => {
              navigate("/");
              setPreLoginMenu("About Us");
            }}
          >
            <p className={preLoginMenu === "About Us" ? "menu-item active" : "menu-item"}>About naavi</p>
          </div>
          
          <div
            onClick={() => {
              setPreLoginMenu("SocialDimension");
            }}
          >
            <p className={preLoginMenu === "SocialDimension" ? "menu-item active" : "menu-item"}>Social Dimension</p>
          </div>
          <div
            onClick={() => {
              navigate("/Technology");
              setPreLoginMenu("Technology");
            }}
          >
            <p className={preLoginMenu === "Technology" ? "menu-item active" : "menu-item"}>Technology</p>
          </div>
          <div
            onClick={() => {
              navigate("/contact");
              setPreLoginMenu("ContactUs");
            }}
          >
            <p className={preLoginMenu === "ContactUs" ? "menu-item active" : "menu-item"}>Contact</p>
          </div>
          <div
            onClick={() => {
              navigate("/WhitePaper");
              setPreLoginMenu("WhitePaper");
            }}
          >
            <p className={preLoginMenu === "WhitePaper" ? "menu-item active" : "menu-item"}>White Paper</p>
          </div>
        </div>
      </div>
      <div className="color-box"></div>
      {isMenuOpen && ( // Conditionally render the menu
        <div className="mobile-menu">
          <div onClick={() => { navigate("/"); setPreLoginMenu("About Us"); }}>About naavi</div>
          <div onClick={() => { setPreLoginMenu("SocialDimension"); }}>Social Dimension</div>
          <div onClick={() => { navigate("/Technology"); setPreLoginMenu("Technology"); }}>Technology</div>
          <div onClick={() => { navigate("/contact"); setPreLoginMenu("ContactUs"); }}>Contact</div>
          <div onClick={() => { navigate("/WhitePaper"); setPreLoginMenu("WhitePaper"); }}>White Paper</div>
        </div>
      )}
      <div className="socialDimension container py-5">
        <div className="row">
          <div className="col-md-6">
            <img className="chart-image" src={chart} alt="Chart" />
          </div>
          <div className="col-md-6">
            <div className="content">
              <h3 className="heading">Social Inequality in Higher Education</h3>
              <div className="card">
                <p className="subheading">
                  <span className="highlight">Social Dimension:</span> Following the Bologna process, German higher education has seen increased social stratification,
                  disproportionately affecting students from disadvantaged and migrant backgrounds
                </p>
              </div>
              <div className="card">
                <p className="subheading">
                  <span className="highlight">Dropout Risks:</span> Immigrant and working-class students face lower grades and a higher dropout risk, leading to increased chances of academic failure
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <h2 className="main-heading">Decision Delusion Problem</h2>
          <div className="col-md-6 my-4">
            <div className="card">
              <p className="animated-text">Due to the lack of Personalised education pathways students often choose generic study option</p>
            </div>
            <div className="card">
              <p className="animated-text">Many students, who do not fit standard educational prospects, fall through the cracks</p>
            </div>
            <div className="card">
              <p className="animated-text">This situation leads to disengagement, low motivation and mismatched careers</p>
            </div>
          </div>
          <div className="col-md-6">
            <img className="SD-image" src={SD} alt="SD" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialDimension;
