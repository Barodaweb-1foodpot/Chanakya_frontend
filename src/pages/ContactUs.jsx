import React from "react";
import { Col, Row } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactUs = () => {
  // Define the form validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email_1: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contact: Yup.string()
      .matches(/^\d{10}$/, "Contact must be a 10-digit number")
      .required("Contact number is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  // Use Formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      username: "",
      email_1: "",
      contact: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission (you can replace this with an actual API call)
      console.log("Form Data:", values);
    },
  });
  return (
    <React.Fragment>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Contact Us</li>
          </ul>
        </div>
      </nav>
      <div className="page-content contact-us mt-10">
        <div className="container">
          <section className="content-title-section mb-10">
            <h3 className="title title-center mb-3">Contact Information</h3>
            <p className="text-center">Ask how we can help you,</p>
          </section>
          {/* End of Contact Title Section */}
          <section className="contact-information-section mb-10">
            <div
              className="swiper-container swiper-theme swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
              data-swiper-options="{
                      'spaceBetween': 20,
                      'slidesPerView': 1,
                      'breakpoints': {
                          '480': {
                              'slidesPerView': 2
                          },
                          '768': {
                              'slidesPerView': 3
                          },
                          '992': {
                              'slidesPerView': 3
                          }
                      }
                  }"
            >
              <Row
                className="swiper-wrapper "
                id="swiper-wrapper-dfcb13b365c5037b"
                aria-live="polite"
              >
                <Col
                  lg={4}
                  className="swiper-slide icon-box text-center icon-box-primary swiper-slide-active"
                  //   role="group"
                  //   aria-label="1 / 3"
                  //   style={{ width: 400, marginRight: 20 }}
                >
                  <span className="icon-box-icon icon-email">
                    <i className="w-icon-envelop-closed" />
                  </span>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title">E-mail Address</h4>
                    <p>info@thedirectdeals.com</p>
                  </div>
                </Col>
                <Col
                  lg={4}
                  className="swiper-slide icon-box text-center icon-box-primary swiper-slide-next"
                  //   role="group"
                  //   aria-label="2 / 3"
                  //   style={{ width: 400, marginRight: 20 }}
                >
                  <span className="icon-box-icon icon-headphone">
                    <i className="w-icon-headphone" />
                  </span>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title">Phone Number</h4>
                    <p>+91(1800)888-8888</p>
                  </div>
                </Col>
                <Col
                  lg={4}
                  className="swiper-slide icon-box text-center icon-box-primary"
                  //   role="group"
                  //   aria-label="3 / 3"
                  //   style={{ width: 400, marginRight: 20 }}
                >
                  <span className="icon-box-icon icon-map-marker">
                    <i className="w-icon-map-marker" />
                  </span>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title">Address</h4>
                    <p>Barodaweb, Vadodara, Gujarat 390005.</p>
                  </div>
                </Col>
                {/*<div class="swiper-slide icon-box text-center icon-box-primary">
                          <span class="icon-box-icon icon-fax">
                              <i class="w-icon-fax"></i>
                          </span>
                          <div class="icon-box-content">
                              <h4 class="icon-box-title">Fax</h4>
                              <p>1-800-570-7777</p>
                          </div>
                      </div>*/}
              </Row>
              <span
                className="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              />
            </div>
          </section>
          {/* End of Contact Information section */}
          <hr className="divider mb-10 pb-1" />
          <section className="contact-section" style={{ textAlign: "start" }}>
            <Row className=" gutter-lg pb-3">
              <Col lg={12} className=" mb-8">
                <h4 className="title mb-3">Send Us a Message</h4>
                <form
                  className="form contact-us-form"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="row">
                    {/* Username Field */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="username">Your Name</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Your Name"
                          className="form-control"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <div className="error-message">
                            {formik.errors.username}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email_1">Email</label>
                        <input
                          type="email"
                          id="email_1"
                          name="email_1"
                          placeholder="example@gmail.com"
                          className="form-control"
                          value={formik.values.email_1}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email_1 && formik.errors.email_1 ? (
                          <div className="error-message">
                            {formik.errors.email_1}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Contact Field */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="contact">Contact No.</label>
                        <input
                          type="text"
                          id="contact"
                          name="contact"
                          placeholder="1234567890"
                          className="form-control"
                          value={formik.values.contact}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.contact && formik.errors.contact ? (
                          <div className="error-message">
                            {formik.errors.contact}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                          value={formik.values.subject}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.subject && formik.errors.subject ? (
                          <div className="error-message">
                            {formik.errors.subject}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          cols={30}
                          rows={5}
                          placeholder="Write a message here..."
                          className="form-control"
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.message && formik.errors.message ? (
                          <div className="error-message">
                            {formik.errors.message}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-dark btn-rounded"
                        >
                          Submit Now
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </Col>
            </Row>
            <Row>
          <Col lg={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1552.7460911891988!2d73.16773810324464!3d22.310089765367238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8badcdec2fb%3A0x5ebb62f324cbe16d!2sBarodaweb!5e0!3m2!1sen!2sin!4v1557922654156!5m2!1sen!2sin"
              width="100%"
              height={312}
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen
            />
          </Col>

          <Col lg={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1552.7460911891988!2d73.16773810324464!3d22.310089765367238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8badcdec2fb%3A0x5ebb62f324cbe16d!2sBarodaweb!5e0!3m2!1sen!2sin!4v1557922654156!5m2!1sen!2sin"
              width="100%"
              height={312}
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen
            />
          </Col>
        </Row>
          </section>
          {/* End of Contact Section */}
        </div>
        {/* Google Maps - Go to the bottom of the page to change settings and map location. */}
        

        {/* End Map Section */}
      </div>
    </React.Fragment>
  );
};

export default ContactUs;
