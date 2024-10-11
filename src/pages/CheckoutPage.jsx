import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEmail } from "../component/VerifyEmail";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import axios from "axios";
import OrderCompletion from "./Order-Complete";

// Validation schema using Yup
const CheckoutSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  designation: Yup.string().required("Designation is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  companyEmail: Yup.string()
    .email("Invalid company email")
    .required("Company email is required"),
  contactNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact No. must be 10 digits")
    .required("Contact No. is required"),
  companyContactNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Company Contact No. must be 10 digits")
    .required("Company Contact No. is required"),
  companyAddress: Yup.string().required("Company Address is required"),
  remark: Yup.string().required("Remark is required"),
  date: Yup.date().required("Date is required"),
});



const CheckoutPage = () => {

  const { EmailVerify, userData } = useEmail();
  const [cart, setCart] = useState([])
  const [orderStatus, setOrderStatus] = useState(false);  // To control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);  // For modal visibility control
  const [orderResult, setOrderResult] = useState(null);    // Track success or failure

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const [initialValues, setInitialValues] = useState({
    companyName: "",
    designation: "",
    firstname: "",
    lastname: "",
    email: "",
    companyEmail: "",
    contactNo: "",
    companyContactNo: "",
    companyAddress: "",
    remark: "",
    date: "",
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
      companyName: userData.companyName || "", // Add actual values if available
      designation: userData.designation || "", // Add actual values if available
      firstname: userData.Name || "",
      lastname: userData.lastname || "", // Add actual values if available
      email: userData.Email || "",
      companyEmail: userData.companyEmail || "", // Add actual values if available
      contactNo: userData.Mobile || "",
      companyContactNo: userData.companyContactNo || "", // Add actual values if available
      companyAddress: userData.companyAddress || "", // Add actual values if available
      remark: "", // Add actual values if available
      date: "", // Add actual values if available
    });

    setCart(userData.cart)

  };
  const [orderData, setOrderData] = useState({})
  // handleSubmit function to log form values
  const handleSubmit = async (values) => {
    console.log("Form Submitted with values: ", values);
    const data = {
      companyName: values.companyName, // Add actual values if available
      designation: values.designation, // Add actual values if available
      Name: values.firstname,
      lastname: values.lastname, // Add actual values if available
      Email: values.email,
      companyEmail: values.companyEmail, // Add actual values if available
      Mobile: values.contactNo,
      companyContactNo: values.companyContactNo, // Add actual values if available
      companyAddress: values.companyAddress, // Add actual values if available
      remark: values.remark, // Add actual values if available
      date: values.date, // Add actual values if available
      cartNew: userData.cart,
      cart: []
    }
    console.log(data)
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/update/UserMasterDetails-order/${userData._id}`, data)
      console.log(res)
      if (res.data.isOk) {
        setOrderData(res.data)
        setOrderStatus(true);  // Set orderStatus to success
        setOrderResult("success");
      } else {
        setOrderStatus(false); // Set orderStatus to failed
        setOrderResult("failed");
      }
      setIsModalOpen(true);  // Open the modal after the result is available
    }
    catch (error) {
      console.log(error)
      // toast.error(error)
    }

  };


  const calculateSubtotal = (item) => {
    // console.log(item)
    return item.productName.newPrice * item.quantity
  };
  const calculateTotal = () => {
    // Check if userData exists and has a cart array
    return userData && userData.cart
      ? userData.cart.reduce((total, item) => total + calculateSubtotal(item), 0)
      : 0;  // Return 0 if there's no cart or userData
  };


  
  return (
    <main className="main login-page">
      {/* Start of Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb shop-breadcrumb bb-no pt-2 pb-2">
            <li>
              <Link to="/cart">Shopping Cart</Link>
            </li>
            <li className="active">
              <Link to="#">Checkout</Link>
            </li>
            
          </ul>
        </div>
      </nav>
      {/* End of Breadcrumb */}

      {/* Start of PageContent */}
      <div className="page-content pt-10 pb-0">
        <div className="container">
          <Formik
            enableReinitialize={true} // Ensures form updates when initialValues change
            initialValues={initialValues}
            validationSchema={CheckoutSchema}
            onSubmit={handleSubmit} // Hooking up handleSubmit function here
          >
            {({ isSubmitting }) => (
              <Form className="form checkout-form">
                <div className="row mb-9">
                  <div className="col-lg-7 pr-lg-4 mb-4">
                    <h3 className="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0">
                      Billing Details
                    </h3>
                    <div className="row gutter-sm">
                      {/* Input fields */}
                      <div className="col-xs-6">
                        <div className="form-group">
                          <label htmlFor="companyName" className="d-flex">
                            Company name <span>*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control form-control-md"
                            name="companyName"
                          />
                          <ErrorMessage
                            name="companyName"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-xs-6">
                        <div className="form-group">
                          <label htmlFor="designation" className="d-flex">
                            Designation <span>*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control form-control-md"
                            name="designation"
                          />
                          <ErrorMessage
                            name="designation"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-xs-6">
                        <div className="form-group">
                          <label htmlFor="firstname" className="d-flex">
                            First name <span>*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control form-control-md"
                            name="firstname"
                          />
                          <ErrorMessage
                            name="firstname"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-xs-6">
                        <div className="form-group">
                          <label htmlFor="lastname" className="d-flex">
                            Last name <span>*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control form-control-md"
                            name="lastname"
                          />
                          <ErrorMessage
                            name="lastname"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-xs-6">
                        <div className="form-group">
                          <label htmlFor="email" className="d-flex">
                            Email Address <span>*</span>
                          </label>
                          <Field
                            type="email"
                            className="form-control form-control-md"
                            name="email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-xs-6">
                        <div className="form-group">
                          <label htmlFor="companyEmail" className="d-flex">
                            Company Email Address <span>*</span>
                          </label>
                          <Field
                            type="email"
                            className="form-control form-control-md"
                            name="companyEmail"
                          />
                          <ErrorMessage
                            name="companyEmail"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-xs-6">
                        <div className="form-group">
                          <label htmlFor="contactNo" className="d-flex">
                            Contact No. <span>*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control form-control-md"
                            name="contactNo"
                          />
                          <ErrorMessage
                            name="contactNo"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-xs-6">
                        <div className="form-group">
                          <label htmlFor="companyContactNo" className="d-flex">
                            Company Contact No. <span>*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control form-control-md"
                            name="companyContactNo"
                          />
                          <ErrorMessage
                            name="companyContactNo"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-xs-6">
                        <div className="form-group">
                          <label htmlFor="date" className="d-flex">
                            Estimated Date <span>*</span>
                          </label>
                          <Field
                            type="date"
                            className="form-control form-control-md"
                            name="date"
                          />
                          <ErrorMessage
                            name="date"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-xs-6">
                        <div className="form-group">
                          <label htmlFor="companyAddress" className="d-flex">
                            Company Address <span>*</span>
                          </label>
                          <Field
                            as="textarea"
                            className="form-control mb-0"
                            id="companyAddress"
                            name="companyAddress"
                            cols="30"
                            rows="4"
                            placeholder="Company Address"
                          />
                          <ErrorMessage
                            name="companyAddress"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-xs-12">
                        <div className="form-group">
                          <label htmlFor="remark" className="d-flex">
                            Remark <span>*</span>
                          </label>
                          <Field
                            as="textarea"
                            className="form-control mb-0"
                            id="remark"
                            name="remark"
                            cols="30"
                            rows="4"
                            placeholder="Additional Information"
                          />
                          <ErrorMessage
                            name="remark"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5 mb-4 sticky-sidebar-wrapper">
                    <div className="order-summary-wrapper sticky-sidebar sticky-right-bar">
                      <h3 className="title text-uppercase ls-10">
                        Your Order
                      </h3>
                      <div className="order-summary">
                        <table className="order-table">
                          <thead>
                            <tr>
                              <th>
                                <b>Product Details</b>
                              </th>
                              <th>
                                <b>QTY</b>
                              </th>
                              <th>
                                <b>Price</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart && cart.length > 0 &&
                              cart.map((item) => (
                                <tr className="bb-no" key={item.productName._id}>
                                  <td className="product-name d-flex">
                                    {item.productName.productName}
                                  </td>
                                  <td>
                                    <span className="product-quantity">{item.quantity}</span>
                                  </td>
                                  <td className="product-total">{calculateSubtotal(item)}</td>
                                </tr>

                              ))
                            }

                            <tr className="cart-subtotal bb-no">
                              <td className="d-flex">
                                <b>Total</b>
                              </td>
                              <td></td>
                              <td>
                                <b>{calculateTotal()}</b>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="form-group place-order pt-6">
                          <button
                            type="submit"
                            className="btn btn-dark btn-block btn-rounded"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Placing Order..." : "Place Order"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Modal isOpen={isModalOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>
          Order {orderResult === "success" ? "Success" : "Failed"}
        </ModalHeader>
        <ModalBody>
          <OrderCompletion orderStatus={orderResult} orderData={orderData}/>
        </ModalBody>
      </Modal>
      {/* End of PageContent */}
    </main>
  );
};

export default CheckoutPage;
