import React, { useEffect, useState } from "react";
import { Link, useAsyncError, useNavigate , useLocation} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Password } from "@mui/icons-material";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Puff } from "react-loader-spinner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorsEmail, setErrorsEmail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const validateEmail = (email) => {
    console.log(email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      toast.error("Please enter correct details");
      return;
    }

    // Prepare the data to send
    const values = {
      Email: email, // The email input from the user
      Password: password, // The password input from the user
    };



    // Sending the login request to the API
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/UserMasterLogin`, values)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data)
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", res.data.user._id);
          if (
            location.state &&
            location.state.from &&
            (location.state.from.pathname === "/signUp")
          ) {
            navigate("/");
          } else {
            setTimeout(() => {
              navigate(-1);
            }, 2000);
            // navigate(-1);
          }
          // window.location.href = '/';

          // navigate("/"); // Redirect to the home page after successful login

        } else {
          toast.error(res.data.message || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        // Handle error response from API
        toast.error(
          "An error occurred: " +
          (error.response?.data.message || "Please try again.")
        );
      });
  };

  const [forgetPass, setForgetPass] = useState(false)
  const [forgetemail, setForgetEmail] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState('')
  const [sending, setSending] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [cnfPassword, setCnfPassword] = useState('')
  const [_id, setId] = useState('')
  const [updating, setUpdating] = useState(false)
  console.log(errorsEmail)
  const handleSendOtp = async () => {
    const newErrors = {}
    if (!forgetemail) {
      newErrors.forgetemail = "Email is required.";

      return setErrorsEmail(newErrors);
    } else if (!validateEmail(forgetemail)) {
      newErrors.forgetemail = "Invalid email format.";
      return setErrorsEmail(newErrors);
    }

    try {
      setSending(true)
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/user/otp-forgetpassword-request`, { Email: forgetemail })
      console.log(res)
      if (res.data.isOk) {
        toast.success("Please Enter The OTP send to your email")
        setShowOtp(true)
        setSending(false)
      }
      else {
        setSending(false)
        toast.warning(res.data.message)
      }
    }
    catch (error) {
      setSending(false)
      console.log(error)

    }
  }

  const handleCheckOtp = async () => {
    console.log(otp)
    const newErrors = {}
    if (!otp) {
      newErrors.otp = "OTP is required.";
      setErrors(newErrors)
    }
    const data = {
      otp: parseInt(otp, 10), // Ensures it's parsed as a base-10 integer
      email: forgetemail
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/user/auth/check-otp`, data)
      console.log(res)
      if (res.data.isOk) {
        setResetPassword(true)
        setShowOtp(false)
        setShowNewPassword(false)
        setShowCnfPassword(false)
        setId(res.data.data._id)
      }
      else {
        toast.error(res.data.message)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleResetPassword = async () => {
    const newErrors = {}
    if (!newPassword) {
      newErrors.newPassword = "Enter New Password";
      return setErrors(newErrors)
    }
    if (!cnfPassword) {
      newErrors.cnfPassword = "Enter Confirm Password";
      return setErrors(newErrors)
    }
    if (cnfPassword && cnfPassword != newPassword) {
      newErrors.cnfPassword = "New Password and confirm password doesnot match ";
      return setErrors(newErrors)
    }

    try {
      setUpdating(true)
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/update/UserMasterDetails/${_id}`, { Password: cnfPassword })
      console.log(res)
      if (res.data.isOk) {
        toast.success("Pasword Reset successfull")
        setUpdating(false)
        setTimeout(() => {
          setForgetEmail(false)
          setForgetPass(false)
        }, 3000)
      }
    }
    catch (error) {
      setUpdating(false)
      console.log(error)
      toast.error(error)
    }

  }
  useEffect(() => {
    // Simulate a delay of 2 seconds (adjust as needed)
    const delay = 1000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []);


  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showCnfPassword, setShowCnfPassword] = useState(false)

  return (
    <React.Fragment>
       {isLoading ? (
        // Loader component while loading
        <div className="loader-container">
          <Puff
            color="#a01e20"
            height={50}
            width={50}
            timeout={0} // 0 means no timeout, loader will be displayed until setIsLoading(false) is called
          />
        </div>
      ) : (
    <main className="main login-page">
      <ToastContainer /> {/* Toast notifications */}
      {/* Start of Breadcrumb */}
      <nav className="breadcrumb-nav mb-10">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li onClick={()=>setForgetPass(false)}>Login</li>
            {forgetPass && !resetPassword && <li>Forgot Password</li>}
            {resetPassword  && <li>Reset Password</li>}
          </ul>
        </div>
      </nav>
      {/* End of Breadcrumb */}
      <div className="container pb-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="login-popup">
              {!forgetPass ?
                <div className="tab tab-nav-boxed tab-nav-center tab-nav-underline">
                  <div className="text-center">
                    <h4 className="loginTitle heading-sign">
                      Welcome to Chanakya Corporate, Sign in to your Account
                    </h4>
                  </div>

                  <div className="tab-content">
                    <div className="tab-pane active in" id="sign-in">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="email">Email *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.email ? "is-invalid" : ""
                              }`}
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && (
                            <small className="text-danger">{errors.email}</small>
                          )}
                        </div>

                        <div className="form-group mb-0">
                          <label htmlFor="password">Password *
                            <button
                              className="ms-3 button-none"
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                          </label>
                          <input
                            type={showNewPassword ? "text" : 'password'}
                            className={`form-control ${errors.password ? "is-invalid" : ""
                              }`}
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {errors.password && (
                            <small className="text-danger">
                              {errors.password}
                            </small>
                          )}
                        </div>

                        {/* <div className="form-checkbox d-flex align-items-center justify-content-between">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          id="remember1"
                          name="remember1"
                         
                        />
                        <label htmlFor="remember1">Remember me</label>
                     
                      </div> */}
                        <div className="form-checkbox d-flex align-items-center justify-content-end">
                          <button
                          style={{color:'#a01c20'}}
                            className="loginTitle button-none "
                            onClick={() => setForgetPass(true)} >Forgot Password?</button>
                        </div>

                        <button type="submit" className="w-100 btn loginBtn btn-primary">
                          Sign In
                        </button>
                      </form>
                    </div>
                  </div>


                 
                </div>
                : <div className="tab tab-nav-boxed tab-nav-center tab-nav-underline">
                  <div className="text-center">
                    <h4 className="loginTitle heading-sign">
                    {resetPassword ? "Reset Password " :"Enter your email and we'll send you an OTP to reset your password."}
                    </h4>
                  </div>

                  <div className="tab-content">
                    <div className="tab-pane active in" id="sign-in">
                      <form >
                        <div className="form-group">
                          <label htmlFor="email">Email *</label>
                          <input
                            type="text"
                            disabled={showOtp}
                            className={`form-control ${errorsEmail.forgetemail ? "is-invalid" : ""
                              }`}
                            name="forgetemail"
                            id="forgetemail"
                            value={forgetemail}
                            onChange={(e) => setForgetEmail(e.target.value)}
                          />
                          {errorsEmail.forgetemail && (
                            <small className="text-danger">{errorsEmail.forgetemail}</small>
                          )}
                        </div>
                        {
                          showOtp ?
                            <div className="form-group">
                              <label htmlFor="otp">Enter OTP *</label>
                              <input
                                type="number"
                                onWheel={(e) => e.target.blur()} // Disable scrolling increment
                                className={`form-control ${errors.otp ? "is-invalid" : ""
                                  }`}
                                name="otp"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                              />
                              {errors.otp && (
                                <small className="text-danger">{errors.otp}</small>
                              )}
                            </div> : null
                        }
                        {
                          resetPassword ?
                            <div>
                              <div className="form-group">
                                <label htmlFor="newPassword">Enter New Password*
                                  <button
                                    className="ms-3 button-none"
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                  >
                                    {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                  </button>
                                </label>
                                <input
                                  type={showNewPassword ? "text" : 'password'}
                                  className={`form-control ${errors.newPassword ? "is-invalid" : ""
                                    }`}
                                  name="newPassword"
                                  id="newPassword"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                />
                                {errors.newPassword && (
                                  <small className="text-danger">{errors.newPassword}</small>
                                )}
                              </div>
                              <div className="form-group">
                                <label htmlFor="cnfPassword">Confirm Password*
                                  <button
                                    className="ms-3  button-none"
                                    type="button"
                                    onClick={() => setShowCnfPassword(!showCnfPassword)}
                                  >
                                    {showCnfPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                  </button>
                                </label>
                                <input
                                  type={showCnfPassword? "text" :'password'}
                                  className={`form-control ${errors.cnfPassword ? "is-invalid" : ""
                                    }`}
                                  name="cnfPassword"
                                  id="cnfPassword"
                                  value={cnfPassword}
                                  onChange={(e) => setCnfPassword(e.target.value)}
                                />
                                {errors.cnfPassword && (
                                  <small className="text-danger">{errors.cnfPassword}</small>
                                )}
                              </div>
                            </div> : null
                        }


                        <div className="form-checkbox d-flex align-items-center justify-content-between">


                          <button
                            type="button"
                            style={{ fontSize: '12px' }}
                            className="button-none "
                            onClick={() => {
                              setForgetPass(false)
                              setForgetEmail("")
                              setOtp("")
                              setShowOtp(false)
                              setResetPassword(false)
                              setErrors({})
                              setShowNewPassword(false)
                              setShowCnfPassword(false)
                            }} ><FaArrowLeftLong className="me-3"/>Back To Login</button>
                        </div>

                        {forgetPass && !showOtp && !resetPassword ? <button type="button" onClick={handleSendOtp} className="w-100 btn loginBtn btn-primary">
                          {sending ? "Sending ..." : "Send Otp"}
                        </button> : null}

                        {showOtp ? <button type="button" onClick={handleCheckOtp} className="w-100 btn loginBtn btn-primary">
                          {sending ? "Checking ..." : "Submit"}
                        </button> : null}

                        {resetPassword ? <button type="button" onClick={handleResetPassword} className="w-100 btn loginBtn btn-primary">
                          {sending ? "Submitting ..." : "Submit"}
                        </button> : null}
                      </form>
                    </div>
                  </div>




                </div>}
                <p>
                    Don't have an account? <Link to="/signUp">Sign up</Link>
                  </p>

            </div>
          </div>
        </div>
      </div>
    </main>
    )}
    </React.Fragment>
  );
};

export default LoginPage;
