import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import "material-design-iconic-font/dist/css/material-design-iconic-font.min.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate required fields
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        errors[key] = "This field is required";
        isValid = false;
      }
    });

    // ----- Email Validation -------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    // ------- Validate mobile number format -------
    const phoneRegex = /^\d{10}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Invalid mobile number";
      isValid = false;
    }

    // ------- Validate gender -------
    if (!formData.gender) {
      errors.gender = "Please select a gender";
      isValid = false;
    }

    // ------- Validate password -------
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8081/api/v1/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Registration successful");
          navigate("/login");
        } else {
          const responseData = await response.json();
          console.error("Registration failed:", responseData.message);
          alert("Failed to register. Please try again.");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Failed to register. Please try again later.");
      }
    } else {
      console.log("Form validation failed");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="wrapper"
    >
      <div className="inner">
        <div className="image-holder">
          <img
            className="container-image"
            src="images/register_image.avif"
            alt=""
          />
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <h3 className="register-heading">Register Yourself</h3>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Your Name"
              className={`form-control ${formErrors.name && "error"}`}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <i className="zmdi zmdi-account"></i>
          </div>
          {formErrors.name && (
            <span className="error-message">{formErrors.name}</span>
          )}
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Email Address"
              className={`form-control ${formErrors.email && "error"}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <i className="zmdi zmdi-email"></i>
          </div>
          {formErrors.email && (
            <span className="error-message">{formErrors.email}</span>
          )}
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Phone Number"
              className={`form-control ${formErrors.phoneNumber && "error"}`}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          {formErrors.phoneNumber && (
            <span className="error-message">{formErrors.phoneNumber}</span>
          )}
          <div className="form-wrapper">
            <select
              name="gender"
              className={`form-control ${formErrors.gender && "error"}`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <i
              className="zmdi zmdi-caret-down"
              style={{ fontSize: "17px" }}
            ></i>
          </div>

          {formErrors.gender && (
            <span className="error-message">{formErrors.gender}</span>
          )}
          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Password"
              className={`form-control ${formErrors.password && "error"}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <i className="zmdi zmdi-lock"></i>
          </div>
          {formErrors.password && (
            <span className="error-message">{formErrors.password}</span>
          )}
          <button className="btn" type="submit">
            Register
          </button>
          <p style={{ marginTop: "10px", marginLeft: "50px" }}>
            Already have an account?{" "}
            <a href="/login" onClick={handleLogin}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
