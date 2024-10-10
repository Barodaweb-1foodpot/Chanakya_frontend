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

const SignupPage = () => {
  const navigate = useNavigate();
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
      console.log(formData);

      createUserLogin(formData).then((res) => {
        console.log(res);
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

  const [showOTP, setShowOtp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [otp, setOtp] = useState('')
  const sendOTP = async () => {
    setIsLoading(true)
    const val = { Email: formData.Email }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/user/otp-signin-request`, val)
      console.log(res)
      if(res.data.isOk)
      {
      
      setShowOtp(true)
      setOtp(res.data.otp)
      setIsLoading(false)
      }
      else{
        setIsLoading(false)
        toast.error(res.data.message)
      }

    }
    catch (error) {
      console.error(error)
    }
  }

  const [verifyOTP, setVerifyOtp] = useState("")
  const verify = () => {
    const check = verifyOTP === otp
    console.log(otp)
    console.log(check)
    setIsLoading2(true)
    if (check) {
      toast.success("Thank you for registering")
      setIsLoading2(false)

      setTimeout(() => {
        handleSubmit();
      }, 2000);


    }
    else {
      setIsLoading2(false)
      toast.error("Otp doesnot match")
    }
  }

  return (
    <main className="main login-page">
      <ToastContainer />
      {/* Start of Breadcrumb */}
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
      {/* End of Breadcrumb */}

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
                            <span className="text-danger">{errors.Name}</span>
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
                            <span className="text-danger">{errors.Email}</span>
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
                            <span className="text-danger">{errors.Mobile}</span>
                          )}
                        </div>
                        <div className="form-group mb-0 col-md-6 col-lg-4">
                          <label>Password *</label>
                          <input
                            type="password"
                            className="form-control"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                            required
                          />
                          {errors.Password && (
                            <span className="text-danger">
                              {errors.Password}
                            </span>
                          )}
                        </div>
                        <div className="form-group mb-0 col-md-6 col-lg-4">
                          <label>Confirm Password *</label>
                          <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                          {errors.confirmPassword && (
                            <span className="text-danger">
                              {errors.confirmPassword}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="form-checkbox d-flex align-items-center justify-content-between mb-5">
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
                          <Link to="/privacy-policy" className="text-primary font-size-md">
                            privacy policy
                          </Link>
                        </label>
                        {errors.agree && (
                          <span className="text-danger">{errors.agree}</span>
                        )}
                      </div>

                      <Button
                        className=" btn-danger"
                        disabled={!formData.agree || isLoading}
                        onClick={sendOTP}
                        // disabled={isLoading}
                        style={{
                          pointerEvents: !formData.agree ? "none" : "auto",
                        }}
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
      <Modal
        isOpen={showOTP}

        size="sm"
      >
        <ModalHeader
        
          
          className="p-3 modalHader"
          toggle={() => {
            setShowOtp(false);
          }}
          close={
            <button       onClick={() => setShowOtp(false)}
            className="close" >
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
              onChange={(e) => { setVerifyOtp(e.target.value) }}
              className="otpInput"
            >
            </input>
              </Col>
              <Col lg={12}>
              <div className="hstack otpDiv gap-2 justify-content-end">
              <button
                className="viewBtn"
                type="button"
                onClick={() => { verify() }}>
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
