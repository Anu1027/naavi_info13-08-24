import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.scss";
import { useCoinContextData } from "../../context/CoinContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Images
import logo from "../../static/images/logo.svg";
import home1 from "../../static/images/home6.jpg";
import hamIcon from "../../static/images/icons/hamIcon.svg";
import aboutNaavi from "../../static/images/aboutNaavi.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const { preLoginMenu, setPreLoginMenu } = useCoinContextData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const aboutNaaviContent = [
    'naavi is a personalized educational pathways engine that empowers individuals to pursue their passions and create innovative and prosperous economies.',
    'Inspired by the navigation capabilities of Google Maps, naavi leverages vast data on educational trajectories and future transformations to serve as a trusted navigation tool.',
    'naavi offers a digital, data-driven approach to study guidance that is both personalized and unbiased. By providing a comprehensive understanding of each student\'s goals, interests, motivations, and aspirations, the platform creates a tailored experience.',
    'Students are presented with multiple interactive pathways, comprising both macro and micro steps, which progressively clarify and dynamically define their educational journey. Each decision unlocks a new level, allowing students to refine their path and make informed choices about their future.',
  ];

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToChatBot = () => {
    window.open('https://chatbot.naavi.network/');
  };

  return (
    <div className="homepage">
      <div className="navbar">
        <div className="hamMenu-home" onClick={toggleMenu}>
          <img src={hamIcon} alt="Menu" />
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className={`menu-items ${isMenuOpen ? 'dropdown-menu' : ''}`}>
          <a
            href="#aboutID"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("aboutID");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setPreLoginMenu("About Us");
                setIsMenuOpen(false); // Close menu after navigation
              }
            }}
            style={{ color: 'black', textDecoration: 'none' }} // No underline, black color
          >
            <p style={{ fontWeight: preLoginMenu === "About Us" ? "600" : "" }}>
              About naavi
            </p>
          </a>
          <div
            onClick={() => {
              navigate("/social");
              setPreLoginMenu("SocialDimension");
              setIsMenuOpen(false); // Close menu after navigation
            }}
            style={{ color: 'black', textDecoration: 'none' }} // No underline, black color
          >
            <p style={{ fontWeight: preLoginMenu === "SocialDimension" ? "600" : "" }}>
              Social Dimension
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/Technology");
              setPreLoginMenu("Technology");
              setIsMenuOpen(false); // Close menu after navigation
            }}
            style={{ color: 'black', textDecoration: 'none' }} // No underline, black color
          >
            <p style={{ fontWeight: preLoginMenu === "Technology" ? "600" : "" }}>
              Technology
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/contact");
              setPreLoginMenu("ContactUs");
              setIsMenuOpen(false); // Close menu after navigation
            }}
            style={{ color: 'black', textDecoration: 'none' }} // No underline, black color
          >
            <p style={{ fontWeight: preLoginMenu === "ContactUs" ? "600" : "" }}>
              Contact
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/WhitePaper");
              setPreLoginMenu("WhitePaper");
              setIsMenuOpen(false); // Close menu after navigation
            }}
            style={{ color: 'black', textDecoration: 'none' }} // No underline, black color
          >
            <p style={{ fontWeight: preLoginMenu === "WhitePaper" ? "600" : "" }}>
              White Paper
            </p>
          </div>
        </div>
      </div>

      <div className="color-box"></div>
      <div className="homepage-content">
        <div className="cover-Img">
          <img src={home1} alt="Cover" />
          <div className="background-tint"></div>
          <div className="mid-text">Personalized Educational Pathways</div>
          <div className="background-tint1"></div>
          <div className="input-box-container">
            <div className="createPath-btn" onClick={goToChatBot}>
              Generate
            </div>
          </div>
        </div>
        <div className="cover-Img-mobile">
          <img src={home1} alt="Cover Mobile" />
          <div className="background-tint-mobile"></div>
          <div className="mid-text-mobile">Personalized Educational Pathways</div>
          <div className="background-tint1-mobile"></div>
          <div className="input-box-container-mobile">
            <div className="createPath-btn-mobile" onClick={goToChatBot}>
              Generate
            </div>
          </div>
          {isMenuOpen && (
            <div className="menu-items-mobile dropdown-menu">
              <a
                href="#aboutID"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("aboutID");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    setPreLoginMenu("About Us");
                    setIsMenuOpen(false); // Close menu after navigation
                  }
                }}
                style={{ color: 'black', textDecoration: 'none' }} // No underline, black color
              >
                <p style={{ fontWeight: preLoginMenu === "About Us" ? "600" : "" }}>
                  About naavi
                </p>
              </a>
              <div
                onClick={() => {
                  navigate("/social");
                  setPreLoginMenu("SocialDimension");
                  setIsMenuOpen(false); // Close menu after navigation
                }}
                style={{ color: 'black', textDecoration: 'none' }} // No underline, black color
              >
                <p style={{ fontWeight: preLoginMenu === "SocialDimension" ? "600" : "" }}>
                  Social Dimension
                </p>
              </div>
              <div
                onClick={() => {
                  navigate("/Technology");
                  setPreLoginMenu("Technology");
                  setIsMenuOpen(false); // Close menu after navigation
                }}
                style={{ color: 'black', textDecoration: 'none' }} // No underline, black color
              >
                <p style={{ fontWeight: preLoginMenu === "Technology" ? "600" : "" }}>
                  Technology
                </p>
              </div>
              <div
                onClick={() => {
                  navigate("/contact");
                  setPreLoginMenu("ContactUs");
                  setIsMenuOpen(false); // Close menu after navigation
                }}
                style={{ color: 'black', textDecoration: 'none' }} // No underline, black color
              >
                <p style={{ fontWeight: preLoginMenu === "ContactUs" ? "600" : "" }}>
                  Contact
                </p>
              </div>
              <div
                onClick={() => {
                  navigate("/WhitePaper");
                  setPreLoginMenu("WhitePaper");
                  setIsMenuOpen(false); // Close menu after navigation
                }}
                style={{ color: 'black', textDecoration: 'none' }} // No underline, black color
              >
                <p style={{ fontWeight: preLoginMenu === "WhitePaper" ? "600" : "" }}>
                  White Paper
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="aboutNaavi container my-3" id="aboutID">
          <h2 className="pt-5">About naavi</h2>
          <div className="row">
            <div className="col-lg-6 mt-lg-5 py-3">
              <ul className="aboutNaavi-list">
                {aboutNaaviContent.map((text, index) => (
                  <li className="aboutNaavi-list-item" key={index}>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <img className="w-100 h-100" src={aboutNaavi} alt="About Naavi" />
            </div>
          </div>
        </div>

        <div className="footer">
          <p className="text-white py-4 text-center fs-medium">Copyrights © naavi.network</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;