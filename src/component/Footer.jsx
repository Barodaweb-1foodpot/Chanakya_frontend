import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import logo from '../assets/images/home/logo.png'

const Footer = () => {
    return (
        <footer className="footer" data-animation-options='{"name": "fadeIn"}'>
            <div className="footer-newsletter bg-primary">
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col xl="5" lg="6">
                            <div className="icon-box icon-box-side text-white">
                                <div className="icon-box-icon d-inline-flex">
                                    <i className="w-icon-envelop3"></i>
                                </div>
                                <div className="icon-box-content">
                                    <h4 className="icon-box-title text-white text-uppercase font-weight-bold">
                                        Subscribe To Our Newsletter
                                    </h4>
                                    <p className="text-white">
                                        Get all the latest information on Events, Sales, and Offers.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col xl="7" lg="6" md="9" className="mt-4 mt-lg-0">
                            <form action="#" method="get" className="input-wrapper input-wrapper-inline input-wrapper-rounded">
                                <input type="email" className="form-control mr-2 bg-white" name="email" id="email" placeholder="Your E-mail Address" />
                                <button className="btn btn-dark btn-rounded" type="button">
                                    Subscribe<i className="w-icon-long-arrow-right"></i>
                                </button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container>
                <div className="text-left footer-top">
                    <Row>
                        <Col lg="4" sm="6">
                            <div className="widget widget-about mt-0 mb-4">
                                <a href="#" className="logo-footer">
                                    <img src={logo} alt="logo-footer" width="180" height="45" />
                                </a>
                                <div className="widget-body">
                                    <p className=" widget-about-desc">
                                        Text will be coming soon...Text will be coming soon...Text will be coming soon...
                                        Text will be coming soon...Text will be coming soon...Text will be coming soon...
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg="3" sm="6">
                            <div className="widget">
                                <h4 className="widget-title">Get In Touch</h4>
                                <ul className="widget-body">
                                    <li>
                                        <p className="widget-about-title mb-0">Live Chat</p>
                                        <a href="mailto:info@chanakya.com" className="widget-about-call">info@chanakya.com</a>
                                    </li>
                                    <li>
                                        <hr />
                                    </li>
                                    <li>
                                        <p className="widget-about-title mb-0">Got Question? Call us 24/7</p>
                                        <a href="tel:9118008888888" className="widget-about-call">91-1800-888-8888</a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg="3" sm="6">
                            <div className="widget">
                                <h3 className="widget-title">Quick Link</h3>
                                <ul className="widget-body">
                                    <li><a href="/about-us">About Us</a></li>
                                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                                    {/* <li><a href="#">Terms & Conditions</a></li> */}
                                    <li><a href="/contactUs">Contact Us</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg="3" sm="6">
                            <div className="widget">
                                <h4 className="widget-title">Social Media</h4>
                                <div className="social-icons social-icons-colored">
                                    <a href="#" className="social-icon social-facebook w-icon-facebook"></a>
                                    <a href="#" className="social-icon social-twitter w-icon-twitter"></a>
                                    <a href="#" className="social-icon social-instagram w-icon-instagram"></a>
                                    <a href="#" className="social-icon social-youtube w-icon-youtube"></a>
                                    <a href="#" className="social-icon social-pinterest w-icon-pinterest"></a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div class="footer-bottom">
                    <div class="footer-left">
                        <p class="copyright">Copyright © 2024 Chanakya. All Rights Reserved.</p>
                    </div>
                    <div class="footer-right">
                        <p class="copyright">Design By : <a href="https://barodaweb.com/" target="_blank" class=""> Barodaweb The E-Catalogue Designer</a></p>
                         
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
