import React, { useState } from "react";
import { createUserLogin } from "../Functions/UserLogin";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if Name is provided
    if (!formData.Name) {
      newErrors.Name = "Name is required.";
    }

    // Check if Email is valid
    if (!formData.Email) {
      newErrors.Email = "Email is required.";
    } else if (!validateEmail(formData.Email)) {
      newErrors.Email = "Invalid email address.";
    }

    // Check if Mobile is valid
    if (!formData.Mobile) {
      newErrors.Mobile = "Mobile number is required.";
    } else if (!validateMobile(formData.Mobile)) {
      newErrors.Mobile = "Mobile number must be 10 digits.";
    }

    // Check if Password is provided
    if (!formData.Password) {
      newErrors.Password = "Password is required.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    }
    if (formData.confirmPassword != formData.Password) {
      newErrors.confirmPassword = "Confirm Password Doesnot Match.";
    }
    if (!formData.agree) {
      newErrors.agree = "You must accept the privacy policy to sign up.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    // e.preventDefault();

    if (!formData.agree) {
      toast.error("You must accept the privacy policy to sign up.");
      return;
    }

    if (validateForm()) { 

      createUserLogin(formData).then((res) => { 
        if (res.data.isOk) {
          toast.success(res.data.message); // Show success message
          navigate("/login");
        } else {
          toast.error(res.data.message || "Error"); // Show error message
        }
      });
    } else {
      toast.error("Please fix the form errors.");
    }
  };

  const [showOTP, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [otp, setOtp] = useState("");
  const sendOTP = async () => {
    if (validateForm()) {
      console.log(formData);
      if (!formData.agree) {
        toast.error("You must accept the privacy policy to sign up.");
        return;
      }

      setIsLoading(true);
      const val = { Email: formData.Email };
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/user/otp-signin-request`,
          val
        ); 
        if (res.data.isOk) {
          setShowOtp(true);
          setOtp(res.data.otp);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Please fix the form errors.");
    }
  };

  const [verifyOTP, setVerifyOtp] = useState("");
  const verify = () => {
    const check = verifyOTP === otp; 
    setIsLoading2(true);
    if (check) {
      toast.success("Thank you for registering");
      setIsLoading2(false);

      setTimeout(() => {
        handleSubmit();
      }, 2000);
    } else {
      setIsLoading2(false);
      toast.error("Otp doesnot match");
    }
  };
  const handleShow = () => { 
    setShowNewPassword((prevState) => !prevState);
  };

  return (
    <main className="main login-page">
      <ToastContainer /> 
      <nav className="breadcrumb-nav mb-10">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Sign Up</li>
          </ul>
        </div>
      </nav> 

      <div className="container pb-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="login-popup signup-popup">
              <div className="tab tab-nav-boxed tab-nav-center tab-nav-underline">
                <div className="text-center">
                  <h4 className="loginTitle  heading-sign">
                    Create your Account in Chanakya Corporate
                  </h4>
                </div>

                <div className="tab-content">
                  <div className="tab-pane active in" id="sign-in">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="form-group col-md-6 col-lg-4">
                          <label>Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                          />
                          {errors.Name && (
                            <small className="text-danger">{errors.Name}</small>
                          )}
                        </div>
                        <div className="form-group col-md-6 col-lg-4">
                          <label>Email Address *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                          />
                          {errors.Email && (
                            <small className="text-danger">
                              {errors.Email}
                            </small>
                          )}
                        </div>
                        <div className="form-group col-md-6 col-lg-4">
                          <label>Contact No *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Mobile"
                            value={formData.Mobile}
                            onChange={handleChange}
                            required
                          />
                          {errors.Mobile && (
                            <small className="text-danger">
                              {errors.Mobile}
                            </small>
                          )}
                        </div>
                        <div className="form-group mb-0 col-md-6 col-lg-4">
                          <label htmlFor="newPassword">
                            Enter New Password*
                            <button
                              className="ms-3 button-none"
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <FaRegEyeSlash />
                              ) : (
                                <FaRegEye />
                              )}
                            </button>
                          </label>
                          <input
                            type={showNewPassword ? "text" : "password"}
                            className={`form-control ${
                              errors.newPassword ? "is-invalid" : ""
                            }`}
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                            required
                          />
                          {errors.newPassword && (
                            <small className="text-danger">
                              {errors.newPassword}
                            </small>
                          )}
                        </div>

                        <div className="form-group mb-0 col-md-6 col-lg-4">
                          <label htmlFor="newPassword">
                            Enter Confirm Password*
                            <button
                              className="ms-3 button-none"
                              type="button"
                              onClick={() =>
                                setShowCnfPassword(!showCnfPassword)
                              }
                            >
                              {showCnfPassword ? (
                                <FaRegEyeSlash />
                              ) : (
                                <FaRegEye />
                              )}
                            </button>
                          </label>
                          <input
                            type={showCnfPassword ? "text" : "password"}
                            className={`form-control ${
                              errors.confirmPassword ? "is-invalid" : ""
                            }`}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                          {errors.confirmPassword && (
                            <small className="text-danger">
                              {errors.confirmPassword}
                            </small>
                          )}
                        </div>
                      </div>
                      <p className="mt-3" style={{textAlign:'start'}}>
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account, and for other purposes described in our{" "}
                        <a href="/privacy-policy" className="text-primary">
                          privacy policy
                        </a>
                        .
                      </p>

                      <div className="form-checkbox d-flex align-items-center justify-content-between mb-0">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          id="agree"
                          name="agree"
                          checked={formData.agree}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="agree" className="font-size-md">
                          I agree to the{" "}
                          <Link
                            to="/privacy-policy"
                            className="text-primary font-size-md"
                          >
                            privacy policy
                          </Link>
                        </label>
                      </div>
                      <div className="text-start mb-5">
                        {errors.agree && (
                          <small className="text-danger">{errors.agree}</small>
                        )}
                      </div>
                      <Button
                        className="w-100 btn-danger" 
                        onClick={sendOTP}
                         
                      >
                        {isLoading ? "Processing" : "Sign Up"}
                      </Button>
                    </form>
                  </div>
                </div>

                <p>
                  Already have an account? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={showOTP} size="sm">
        <ModalHeader
          className="p-3 modalHader"
          toggle={() => {
            setShowOtp(false);
          }}
          close={
            <button onClick={() => setShowOtp(false)} className="close">
              &times;
            </button>
          }
        >
          Verify your otp
        </ModalHeader>
        <form>
          <ModalBody>
            <Row>
              <Col lg={12}>
                <Label>Enter Otp sent to you Email</Label>
                <input
                  value={verifyOTP}
                  onChange={(e) => {
                    setVerifyOtp(e.target.value);
                  }}
                  className="otpInput"
                ></input>
              </Col>
              <Col lg={12}>
                <div className="hstack otpDiv gap-2 justify-content-end">
                  <button
                    className="viewBtn"
                    type="button"
                    onClick={() => {
                      verify();
                    }}
                  >
                    {isLoading2 ? "Loading" : "Submit"}
                  </button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </form>
      </Modal>
    </main>
  );
};

export default SignupPage;
