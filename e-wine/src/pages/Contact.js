import React, { useState, useEffect } from "react";
import "./Contact.css";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    const storedSurname = localStorage.getItem("surname") || "";
    const storedEmail = localStorage.getItem("email") || "";

    setFormData((prev) => ({
      ...prev,
      name: storedName,
      surname: storedSurname,
      email: storedEmail,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, surname, email, message } = formData;
    if (!name.trim() || !surname.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Contact form submitted:", formData);
    setSuccessMessage(
      "Thanks for contacting us! We'll get back to you via email shortly."
    );
    setFormData((prev) => ({ ...prev, message: "" }));
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <div className="contact-container">
      <h1 className="contact-heading">Contact Us</h1>
      <p className="contact-description">
        We'd love to hear from you. If you have any questions about our wines,
        services, or just want to say hi—drop us a message!
      </p>

      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="First Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleChange}
            rows={5}
          />

          <button type="submit" className="contact-button">
            Send Message
          </button>
        </form>

        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114813.75684331603!2d28.014906040428716!3d-25.93752636691754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956608911ce097%3A0x519896b4b6eda40a!2sOpen%20Window%20-%20Centurion!5e0!3m2!1sen!2sza!4v1749033103032!5m2!1sen!2sza"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
          ></iframe>
        </div>
      </div>

      {successMessage && (
        <SuccessToast
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
      {errorMessage && (
        <ErrorToast
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
};

export default Contact;
