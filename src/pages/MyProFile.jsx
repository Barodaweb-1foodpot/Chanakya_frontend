import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountSidbarDashboard from "../component/AccountSidbarDashboard";
import { Col, Row } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEmail } from "../component/VerifyEmail";
import { Password } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const MyProFile = () => {
  // Validation Schema
  const { EmailVerify, userData } = useEmail();
  const [cart, setCart] = useState([])
  const [orderStatus, setOrderStatus] = useState(false);  // To control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);  // For modal visibility control
  const [orderResult, setOrderResult] = useState(null);    // Track success or failure

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contactNo: Yup.number()
      .required("Contact number is required")
      .typeError("Must be a number"),
    cur_password: Yup.string().required("Current password is required"),



  });



  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contactNo: "",
    cur_password: "",
    new_password: "",
    conf_password: "",
    companyAddress:""
  });
  useEffect(() => {
    EmailVerify(); // Triggers the email verification
  }, []);

  // New useEffect to call setVal once userData is populated
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setVal(); // Call setVal only after userData has data
    }
  }, [userData]); // Dependency on userData

  const setVal = () => {

    // Verify email and update form with user data


    // Set the initial values based on the userData response
    setInitialValues({
      firstname: userData.Name || "",
      lastname: userData.lastname || "", // Add actual values if available
      email: userData.Email || "",
      contactNo: userData.Mobile || "",
      cur_password: userData.Password || "",
      conf_password:"",
      new_password:"",
      companyAddress:userData.companyAddress || ""
    });

    setCart(userData.cart)

  };



  const handleSubmit = async (values) => {
    // console.log(values)
    if (values.conf_password != values.new_password) {
      toast.error("New Password and Confirm Password Should Match")
      return
    }
    // console.log("Form Submitted with values: ", values);
    const data = {
      Name: values.firstname,
      lastname: values.lastname, // Add actual values if available
      Email: values.email,
      Mobile: values.contactNo,
      Password: values.conf_password != "" ? values.conf_password : values.cur_password,
      companyAddress:values.companyAddress
    }
    console.log(data)
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/update/UserMasterDetails/${userData._id}`, data)
      // console.log(res)
      if (res.data.isOk) {
        console.log(res)
        toast.success("Profile Updated Successfully")
        EmailVerify()
        // setOrderData(res.data)
        // setOrderStatus(true);  // Set orderStatus to success
        // setOrderResult("success");
      } else {
        toast.error("Something Went Wrong")
        // setOrderStatus(false); // Set orderStatus to failed
        // setOrderResult("failed");
      }
      // setIsModalOpen(true);  // Open the modal after the result is available
    }
    catch (error) {
      console.log(error)
      // toast.error(error)
    }

  };

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showCnfPassword, setShowCnfPassword] = useState(false)

  return (
    <React.Fragment>
     

      <div className="tab-content mb-6">
      <ToastContainer />
        <div className="tab-pane active in" id="account-details">
          <div className="icon-box icon-box-side mb-6">
            <span className="icon-box-icon icon-account mr-2">
              <i className="w-icon-user" />
            </span>
            <div className="icon-box-content">
              <h4
                className="icon-box-title mb-0 ls-normal"
                style={{ fontSize: "2rem" }}
              >
                My Profile
              </h4>
            </div>
          </div>
          <div className="profile-info">
            <h4 className="title title-password ls-25 font-weight-bold">
              Account Information
            </h4>
            <hr />
            <Formik
              enableReinitialize={true} // Enable form to reinitialize when new initialValues are set
              initialValues={initialValues} // Use the dynamic initialValues from the state
              validationSchema={validationSchema}
              onSubmit={handleSubmit} // Hooking up handleSubmit function here
            >
              {({ isSubmitting }) => (
                <Form className="form account-details-form">
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="firstname">First name *</label>
                        <Field
                          type="text"
                          id="firstname"
                          name="firstname"
                          className="form-control form-control-md"
                        />
                        <ErrorMessage
                          name="firstname"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="lastname">Last name *</label>
                        <Field
                          type="text"
                          id="lastname"
                          name="lastname"
                          className="form-control form-control-md"
                        />
                        <ErrorMessage
                          name="lastname"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="email">Email address *</label>
                        <Field
                          disabled
                          type="email"
                          id="email"
                          name="email"
                          className="form-control form-control-md"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="contactNo">Contact Number *</label>
                        <Field
                          type="text"
                          id="contactNo"
                          name="contactNo"
                          className="form-control form-control-md"
                        />
                        <ErrorMessage
                          name="contactNo"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="email">Address </label>
                        <Field
                          // disabled
                          type="text"
                          id="companyAddress"
                          name="companyAddress"
                          className="form-control form-control-md"
                        />
                        
                      </div>
                    </Col>
                    
                  </Row>

                  {/* Password Fields */}

                  <h4 className="title title-password ls-25 font-weight-bold mt-5">
                    Change Password
                  </h4>
                  <hr />

                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="cur-password">Current Password *</label>
                        <Field
                          disabled
                          type="password"
                          id="cur_password"
                          name="cur_password"
                          className="form-control form-control-md"
                        />
                        <ErrorMessage
                          name="cur_password"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="new-password">New Password 
                          <button 
                          className="ms-3 button-none"
                          type="button"
                           onClick={()=>setShowNewPassword(!showNewPassword)}
                            > 
                            {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>

                        </label>
                        <Field
                          type={showNewPassword? "text" :'password'}
                          id="new-password"
                          name="new_password"
                          className="form-control form-control-md"
                        />
                        <ErrorMessage
                          name="new_password"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="conf-password">Confirm New Password 
                        <button 
                          className="ms-3 button-none"
                          type="button"
                           onClick={()=>setShowCnfPassword(!showCnfPassword)}
                            > 
                            {showCnfPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </label>
                        <Field
                         type={showCnfPassword? "text" :'password'}
                          id="conf-password"
                          name="conf_password"
                          className="form-control form-control-md"
                        />
                        <ErrorMessage
                          name="conf_password"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </Col>
                  </Row>

                  <button
                    type="submit"
                    className="btn btn-dark btn-rounded btn-sm mb-4"
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </button>
                </Form>
              )}
            </Formik>

          </div>
        </div>
      </div>

    </React.Fragment>
  );
};

export default MyProFile;
