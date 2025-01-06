import React from "react";
import { Link } from "react-router-dom";
import AccountSidbarDashboard from "../component/AccountSidbarDashboard";
import { Col, Row } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MyAddress = () => { 
  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email_1: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contactnumber: Yup.number()
      .required("Contact number is required")
      .typeError("Must be a number"),
    streetAddress: Yup.string().required("Street Address is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State/Province is required"),
    city: Yup.string().required("City is required"),
    postalcode: Yup.number()
      .required("Zip/Postal Code is required")
      .typeError("Must be a number"),
  });
  return (
    <React.Fragment>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>My account</li>
            <li>My Addresses</li>
          </ul>
        </div>
      </nav>
      <div className="page-content pt-6 pb-2 my-account">
        <div className="container">
          <div className="tab tab-vertical row gutter-lg">
            <AccountSidbarDashboard />
            <div className="tab-content mb-6">
              <div className="tab-pane active in" id="account-addresses">
                <div className="icon-box icon-box-side mb-1">
                  <span className="icon-box-icon icon-map-marker">
                    <i className="w-icon-map-marker" />
                  </span>
                  <div className="icon-box-content">
                    <h4
                      className="icon-box-title mb-0 ls-normal"
                      style={{ fontSize: "2rem" }}
                    >
                      Addresses
                    </h4>
                  </div>
                </div>
                <p className="text-center">
                  The following addresses will be used on the checkout page by
                  default.
                </p>
                <Row className=" address-info mr-0 ml-0">
                  <Col lg={6} md={12} sm={12} className=" col-sm-12 mb-6">
                    <div className="ecommerce-address billing-address pr-lg-8">
                      <h4 className="title title-underline ls-25 font-weight-bold">
                        Address <span className="badge">Deafult</span>
                      </h4>
                      <address className="mb-4">
                        <table className="address-table">
                          <tbody>
                            <tr>
                              <th>Name :</th>
                              <td>Rushil Patel</td>
                            </tr>
                            <tr>
                              <th>Email :</th>
                              <td>rushil@barodaweb.net</td>
                            </tr>
                            <tr>
                              <th>Contact No. :</th>
                              <td>+91 9824281021</td>
                            </tr>
                            <tr>
                              <th>Address :</th>
                              <td>
                                Darpan Apartment, 305, Next To Express Hotel,
                                Alkapuri
                              </td>
                            </tr>
                            <tr>
                              <th>City :</th>
                              <td>Vadodara</td>
                            </tr>
                            <tr>
                              <th>State :</th>
                              <td>Gujarat</td>
                            </tr>
                            <tr>
                              <th>Postcode :</th>
                              <td>390005</td>
                            </tr>
                          </tbody>
                        </table>
                      </address>
                      <Link
                        to="#"
                        className="btn btn-link btn-underline btn-icon-right editBtn"
                      >
                        Edit your billing address
                        <i className="w-icon-long-arrow-right" />
                      </Link>
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={12} className=" col-sm-12 mb-6">
                    <div className="ecommerce-address shipping-address pr-lg-8">
                      <h4 className="title title-underline ls-25 font-weight-bold">
                        Address <span className="badge">Secondary</span>
                      </h4>
                      <address className="mb-4">
                        <table className="address-table">
                          <tbody>
                            <tr>
                              <th>Name :</th>
                              <td>rushil Patel</td>
                            </tr>
                            <tr>
                              <th>Email :</th>
                              <td>projects@barodaweb.net</td>
                            </tr>
                            <tr>
                              <th>Contact No. :</th>
                              <td>+91 9824281021</td>
                            </tr>
                            <tr>
                              <th>Address :</th>
                              <td>
                                Darpan Apartment, 305, Next To Express Hotel,
                                Alkapuri
                              </td>
                            </tr>
                            <tr>
                              <th>City :</th>
                              <td>Vadodara</td>
                            </tr>
                            <tr>
                              <th>State :</th>
                              <td>Gujarat</td>
                            </tr>
                            <tr>
                              <th>Postcode :</th>
                              <td>390005</td>
                            </tr>
                          </tbody>
                        </table>
                      </address>
                      <Link
                        to="#"
                        className="btn btn-link btn-underline btn-icon-right editBtn"
                      >
                        Edit your shipping address
                        <i className="w-icon-long-arrow-right" />
                      </Link>
                    </div>
                  </Col>
                  <hr />
                  <div>
                    <h4 className="title title-password ls-25 font-weight-bold pb-0">
                      Account Information
                    </h4>
                    <hr />
                    <Formik
                      initialValues={{
                        firstname: "",
                        lastname: "",
                        email_1: "",
                        contactnumber: "",
                        streetAddress: "",
                        country: "india",
                        state: "gujarat",
                        city: "",
                        postalcode: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values) => {
                        // Handle form submission
                        console.log(values);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form className="form account-details-form">
                          <div className="row">
                            <div className="col-md-6">
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
                            </div>
                            <div className="col-md-6">
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
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="email_1">Email address *</label>
                                <Field
                                  type="email"
                                  id="email_1"
                                  name="email_1"
                                  className="form-control form-control-md"
                                />
                                <ErrorMessage
                                  name="email_1"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="contactnumber">
                                  Contact Number *
                                </label>
                                <Field
                                  type="text"
                                  id="contactnumber"
                                  name="contactnumber"
                                  className="form-control form-control-md"
                                />
                                <ErrorMessage
                                  name="contactnumber"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            </div>
                          </div>

                          <h4 className="title title-password ls-25 font-weight-bold mt-5 pb-0">
                            Address
                          </h4>
                          <hr />
                          <div className="form-group">
                            <label htmlFor="streetAddress">
                              Street Address *
                            </label>
                            <Field
                              as="textarea"
                              id="streetAddress"
                              name="streetAddress"
                              rows={3}
                              className="form-control"
                            />
                            <ErrorMessage
                              name="streetAddress"
                              component="div"
                              className="error-message"
                            />
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group mb-10">
                                <label htmlFor="country">Country *</label>
                                <Field
                                  as="select"
                                  name="country"
                                  className="form-control"
                                  id="country"
                                >
                                  <option value="india">India</option>
                                  <option value="usa">USA</option>
                                  <option value="uk">UK</option>
                                  <option value="germany">Germany</option>
                                  <option value="france">France</option>
                                  <option value="dubai">Dubai</option>
                                </Field>
                                <ErrorMessage
                                  name="country"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group mb-10">
                                <label htmlFor="state">State/Province *</label>
                                <Field
                                  as="select"
                                  name="state"
                                  className="form-control"
                                  id="state"
                                >
                                  <option value="gujarat">Gujarat</option>
                                  <option value="maharashtra">
                                    Maharashtra
                                  </option>
                                  <option value="rajasthan">Rajasthan</option>
                                  <option value="madhya pradesh">
                                    Madhya Pradesh
                                  </option>
                                  <option value="uttar pradesh">
                                    Uttar Pradesh
                                  </option>
                                  <option value="delhi">Delhi</option>
                                </Field>
                                <ErrorMessage
                                  name="state"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group mb-10">
                                <label htmlFor="city">City *</label>
                                <Field
                                  type="text"
                                  id="city"
                                  name="city"
                                  className="form-control form-control-md"
                                />
                                <ErrorMessage
                                  name="city"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group mb-10">
                                <label htmlFor="postalcode">
                                  Zip/Postal Code *
                                </label>
                                <Field
                                  type="text"
                                  id="postalcode"
                                  name="postalcode"
                                  className="form-control form-control-md"
                                />
                                <ErrorMessage
                                  name="postalcode"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-dark btn-rounded btn-sm mb-4"
                            disabled={isSubmitting}
                          >
                            Save Address
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyAddress;
