import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Puff } from "react-loader-spinner";

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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate a delay of 2 seconds (adjust as needed)
    const delay = 1000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []);

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
      {/* Start of Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb shop-breadcrumb bb-no pt-2 pb-2">
            <li>
              <Link to="#">Shopping Cart</Link>
            </li>
            <li className="active">
              <Link to="#">Checkout</Link>
            </li>
            <li>
              <Link to="#">Order Complete</Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* End of Breadcrumb */}

      {/* Start of PageContent */}
      <div className="page-content pt-10 pb-0">
        <div className="container">
          <Formik
            initialValues={{
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
            }}
            validationSchema={CheckoutSchema}
            onSubmit={(values) => {
              console.log("Form Values", values);
              // Handle form submission here
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form checkout-form">
                <div className="row mb-9">
                  <div className="col-lg-7 pr-lg-4 mb-4">
                    <h3 className="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0">
                      Billing Details
                    </h3>
                    <div className="row gutter-sm">
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
                            Date <span>*</span>
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
                          ></Field>
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
                            placeholder="Notes about your order"
                          ></Field>
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
                            <tr className="bb-no">
                              <td className="product-name d-flex">
                                Thorium Neo 8 Wheels 55 Cm Small Cabin Trolley
                                Bag Hard
                              </td>
                              <td>
                                <span className="product-quantity">10</span>
                              </td>
                              <td className="product-total">₹33,500.00</td>
                            </tr>
                            <tr className="bb-no">
                              <td className="product-name d-flex">
                                Safari Medium Trolley Bag
                              </td>
                              <td>
                                <span className="product-quantity">2</span>
                              </td>
                              <td className="product-total">₹6,900.00</td>
                            </tr>
                            <tr className="cart-subtotal bb-no">
                              <td className="d-flex">
                                <b>Total</b>
                              </td>
                              <td></td>
                              <td>
                                <b>₹40,400.00</b>
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
      {/* End of PageContent */}
    </main>
     )}
    </React.Fragment>
  );
};

export default CheckoutPage;
