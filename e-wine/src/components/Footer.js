import React, { useContext } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import WineLogoWhite from "../assets/WineLogoWhite.png";
import { AuthContext } from "../context/AuthContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useContext(AuthContext);

  return (
    <footer className="footer-container">
      <div className="footer-grid">
        <div className="footer-section brand">
          <img
            src={WineLogoWhite}
            alt="Pour Decisions Logo"
            className="footer-logo"
          />
        </div>

        <div className="right-footer-columns">
          <div className="footer-section">
            <h3>Explore</h3>
            <ul>
              <li>
                <Link to="/products">Wines</Link>
              </li>
              <li>
                <Link to="/favourites">Favourites</Link>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <Link to="/add-product">Add Wine</Link>
                </li>
              )}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="footer-icons">
              <a
                href="https://www.instagram.com/openwindowinstitute/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/theopenwindow/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.youtube.com/@theopenwindowschool"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Pour Decisions. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
