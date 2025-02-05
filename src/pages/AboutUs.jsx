import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import AboutImg from "../assets/images/chanakayaAboutImg.avif";
import { Puff } from "react-loader-spinner";
import { Card } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { PiHandCoinsBold } from "react-icons/pi";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [viewed, setViewed] = useState({
    branch: false,
    distributor: false,
    dealer: false,
  });

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const onVisibilityChange = (isVisible, key) => {
    if (isVisible) {
      setViewed((prevViewed) => ({ ...prevViewed, [key]: true }));
    }
  };

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
          <Puff color="#a01e20" height={50} width={50} timeout={0} />
        </div>
      ) : (
        <div>
          <nav className="breadcrumb-nav">
            <div className="container">
              <ul className="breadcrumb">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>About Us</li>
              </ul>
            </div>
          </nav>

          <div className="page-content about-us mt-10">
            <div className="container">
              <section
                className="boost-section pt-10 pb-10"
                style={{ textAlign: "start" }}
              >
                <div className="container mt-10 mb-9">
                  <Row className=" align-items-center mb-10">
                    <Col md={6} className=" mb-8">
                      <figure className="br-lg">
                        <img
                          src={AboutImg}
                          alt="Banner"
                          width="100%"
                          style={{ backgroundColor: "#9E9DA2" }}
                        />
                      </figure>
                    </Col>
                    <Col md={6} className=" pl-lg-8 mb-8">
                      <h4 className="title text-left">About Us Chankaya</h4>
                      <p className="mb-6">
                        At Chanakya Corporate, we take pride in being a trusted
                        name in the corporate gifting and luggage & accessories
                        industry, serving businesses across Vadodara and India.
                        With a thoughtfully curated selection of products, we
                        offer high-quality, personalized solutions that help
                        businesses strengthen their relationships with clients,
                        partners, and employees.
                      </p>
                      <p className="mb-6">
                        Whether you are looking for premium corporate gifts,
                        promotional items, or stylish and durable luggage &
                        accessories, Chanakya Corporate is your one-stop
                        destination. Our commitment to delivering value-packed
                        solutions ensures that every gifting experience is
                        meaningful and memorable.
                      </p>
                    </Col>
                  </Row>
                </div>
              </section>

              <section className="customer-service pt-10 mb-7">
                <Row className="align-items-stretch">
                  <Col md={4} className="visonCol pr-lg-8 mb-8 d-flex">
                    <div className="aboutusVisonDiv d-flex flex-column flex-grow-1">
                      <div className="visonIcon">
                        <FaEye />
                      </div>
                      <div className="visonTitle">Vision</div>
                      <div className="flex-grow-1">
                        To be the most trusted and innovative provider of
                        corporate gifting and luggage & accessories, fostering
                        lasting relationships and impactful impressions through
                        exceptional quality and service.
                      </div>
                    </div>
                  </Col>

                  <Col md={4} className="visonCol pr-lg-8 mb-8 d-flex">
                    <div className="aboutusVisonDiv d-flex flex-column flex-grow-1">
                      <div className="visonIcon">
                        <TbTargetArrow />
                      </div>
                      <div className="visonTitle">Mission</div>
                      <div className="flex-grow-1">
                        To empower businesses with exceptional corporate gifting
                        and luggage & accessories solutions. We strive to build
                        long-lasting relationships by offering personalized
                        service, innovative products, and a commitment to
                        sustainability.
                        <br />
                        <span className="valuesTitle">Community Earnings</span>
                      We support community development, skill-building programs,
                      and sustainability initiatives with every purchase.
                      <br />
                      <span className="valuesTitle">Growing Buyers</span>
                      Trusted by businesses for innovative and affordable
                      gifting and luggage solutions.
                      <br />
                      <span className="valuesTitle">Products for Sale</span>
                      Discover our wide range of quality products for every
                      need.
                      </div>
                    </div>
                  </Col>

                  <Col md={4} className="visonCol pr-lg-8 mb-8 d-flex">
                    <div className="aboutusVisonDiv d-flex flex-column flex-grow-1">
                      <div className="visonIcon">
                        <PiHandCoinsBold />
                      </div>
                      <div className="visonTitle">Values</div>
                      <div className="flex-grow-1">
                        <span className="valuesTitle">
                          Client-Centric Approach:
                        </span>{" "}
                        Provide customized solutions for corporate gifting and
                        luggage needs.
                        <br />
                        <span className="valuesTitle">
                          Product Excellence:
                        </span>{" "}
                        Innovate and offer high-quality, functional, and stylish
                        products.
                        <br />
                        <span className="valuesTitle">
                          Service Excellence:
                        </span>{" "}
                        Deliver timely and professional services for a great
                        client experience.
                      </div>
                    </div>
                  </Col>
                </Row>
              </section>

              <section className="count-section mb-10 pb-5">
                <div className="swiper-container swiper-theme">
                  <div className="swiper-wrapper row cols-lg-3 cols-md-2 cols-1">
                    <div className="swiper-slide counter-wrap">
                      <VisibilitySensor
                        onChange={(isVisible) =>
                          onVisibilityChange(isVisible, "branch")
                        }
                        delayedCall
                      >
                        <div className="counter text-center">
                          {viewed.branch && (
                            <>
                              <span>
                                <CountUp start={0} end={1000} duration={2} />
                              </span>
                              <sup>+</sup>
                            </>
                          )}
                          <h4 className="title title-center">
                            Number Of Product
                          </h4>
                          <p>
                            A diverse range of over 1,000 high-quality products
                            to meet all your needs.
                          </p>
                        </div>
                      </VisibilitySensor>
                    </div>

                    <div className="swiper-slide counter-wrap">
                      <VisibilitySensor
                        onChange={(isVisible) =>
                          onVisibilityChange(isVisible, "distributor")
                        }
                        delayedCall
                      >
                        <div className="counter text-center">
                          {viewed.distributor && (
                            <>
                              <span>
                                <CountUp start={0} end={20} duration={2} />
                              </span>
                              <span className="yearSpan">Year</span>
                              <sup>+</sup>
                            </>
                          )}
                          <h4 className="title title-center">
                            Year Of Experience
                          </h4>
                          <p>
                            With more than 20 years in the industry, we bring
                            expertise and reliability to every project
                          </p>
                        </div>
                      </VisibilitySensor>
                    </div>

                    <div className="swiper-slide counter-wrap">
                      <VisibilitySensor
                        onChange={(isVisible) =>
                          onVisibilityChange(isVisible, "dealer")
                        }
                        delayedCall
                      >
                        <div className="counter text-center">
                          {viewed.dealer && (
                            <>
                              <span>
                                <CountUp start={0} end={20} duration={2} />
                              </span>
                              <span>k</span>
                              <sup>+</sup>
                            </>
                          )}
                          <h4 className="title title-center">
                            Satisfied Client
                          </h4>
                          <p>
                            Over 20,000 satisfied clients trust us for
                            delivering exceptional solutions and services.
                          </p>
                        </div>
                      </VisibilitySensor>
                    </div>
                  </div>

                  <div className="swiper-pagination" />
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AboutUs;
