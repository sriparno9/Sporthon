import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "material-design-iconic-font/dist/css/material-design-iconic-font.min.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
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

    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "") {
        errors[key] = "This field is required";
        isValid = false;
      }
    });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:8081/api/v1/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          const user = {
            accessToken: responseData.accessToken,
            refreshToken: responseData.refreshToken,
            name: responseData.name,
            role: responseData.role,
            userid: responseData.id,
          };

          sessionStorage.setItem("user", JSON.stringify(user));

          if (responseData.role === "USER") {
            navigate("/");
          } else if (responseData.role === "ADMIN") {
            navigate("/admin");
          }
          console.log("Login successful:", responseData);
        } else {
          alert("Invalid email or password. Please try again.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Failed to login. Please try again later.");
      }
    } else {
      console.log("Login validation failed");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <form className="form-container" onSubmit={handleLogin}>
          <h3 className="register-heading">Login Here</h3>

          <div className={`form-wrapper ${formErrors.email && "error"}`}>
            <input
              type="text"
              placeholder="Email Address"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <i className="zmdi zmdi-email"></i>
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>

          <div className={`form-wrapper ${formErrors.password && "error"}`}>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <i className="zmdi zmdi-lock"></i>
            {formErrors.password && (
              <span className="error-message">{formErrors.password}</span>
            )}
          </div>

          <button className="btn" type="submit">
            Login
          </button>
          <p style={{ marginTop: "10px", marginLeft: "50px" }}>
            Create your account{" "}
            <a href="/register" onClick={handleRegister}>
              Register
            </a>
          </p>
        </form>
        <div className="image-holder">
          <img
            className="container-image"
            src="images/login_image.avif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
