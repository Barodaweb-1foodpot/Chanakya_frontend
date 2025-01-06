import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Puff } from "react-loader-spinner";
import { Container } from "react-bootstrap";

const ContactUs = () => { 
  const [isLoading, setIsLoading] = useState(true);

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
 
  const formik = useFormik({
    initialValues: {
      username: "",
      email_1: "",
      contact: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {  
      try {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/auth/create/ContactUsInquiry`,
            values
          )
          .then((res) => { 
            if (res.data.isOk) {
              toast.success(res.data.message);
              resetForm();
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => { 
    const delay = 1000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []);

  return (
    <React.Fragment>
      {isLoading ? ( 
        <div className="loader-container">
          <Puff
            color="#a01e20"
            height={50}
            width={50}
            timeout={0}  
          />
        </div>
      ) : (
        <div>
          <ToastContainer />
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
                     
                    >
                      <span className="icon-box-icon icon-map-marker">
                        <i className="w-icon-map-marker" />
                      </span>
                      <div className="icon-box-content">
                        <h4 className="icon-box-title">Address</h4>
                        <p>Barodaweb, Vadodara, Gujarat 390005.</p>
                      </div>
                    </Col>
                     
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
              <section
                className="contact-section"
                style={{ textAlign: "start" }}
              >
                <Container>
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
                              {formik.touched.username &&
                              formik.errors.username ? (
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
                              {formik.touched.email_1 &&
                              formik.errors.email_1 ? (
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
                              {formik.touched.contact &&
                              formik.errors.contact ? (
                                <div className="error-message">
                                  {formik.errors.contact}
                                </div>
                              ) : null}
                            </div>
                          </div>
 
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
                              {formik.touched.subject &&
                              formik.errors.subject ? (
                                <div className="error-message">
                                  {formik.errors.subject}
                                </div>
                              ) : null}
                            </div>
                          </div>
 
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
                              {formik.touched.message &&
                              formik.errors.message ? (
                                <div className="error-message">
                                  {formik.errors.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
 
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
                </Container>
                <Row>
                  <Col lg={12}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0890609438275!2d73.16161267529286!3d22.31247127967784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc9d99db37051%3A0xe39ca9ccd3bc17ac!2sChanakya%20The%20Bag%20Studio%20-%20All%20Type%20Of%20Bag%20Shop%2C%20Gift%20Article%20Shop%2C%20Rain%20Wear%20Shop%2C%20Bag%20Shop%20In%20Vadodara!5e0!3m2!1sen!2sin!4v1734681266785!5m2!1sen!2sin"
                      width="100%"
                      height="450"
                      
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </Col>

                 
                </Row>
              </section>
              
            </div>
          
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ContactUs;
