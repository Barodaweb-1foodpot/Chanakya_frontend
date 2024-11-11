import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import AboutImg from "../assets/images/chanakayaAboutImg.avif";
import { Puff } from "react-loader-spinner";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [viewed, setViewed] = useState({
    branch: false,
    distributor: false,
    dealer: false,
  });

  // Function to toggle accordion panels
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Function to handle visibility of counters
  const onVisibilityChange = (isVisible, key) => {
    if (isVisible && !viewed[key]) {
      setViewed((prevViewed) => ({ ...prevViewed, [key]: true }));
    } else if (!isVisible && viewed[key]) {
      setViewed((prevViewed) => ({ ...prevViewed, [key]: false }));
    }
  };

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
                      <h4 className="title text-left">
                        About The Direct Deals
                      </h4>
                      <p className="mb-6">
                        Text will be coming soon...Text will be coming
                        soon...Text will be coming soon...Text will be coming
                        soon...Text will be coming soon...Text will be coming
                        soon...Text will be coming soon...Text will be coming
                        soon...Text will be coming soon...
                      </p>
                    </Col>
                  </Row>
                </div>
              </section>

              <section className="customer-service pt-10 mb-7">
                <Row className="align-items-center">
                  <Col md={6} className="pr-lg-8 mb-8">
                    <h2 className="title text-left">
                      Vision, Mission & Core Values
                    </h2>
                    <div className="accordion accordion-simple accordion-plus">
                      {/* Vision Accordion */}
                      <div className="card border-no">
                        <div className="card-header">
                          <Link
                            to="#collapse3-1"
                            className={
                              activeIndex === 1 ? "collapse" : "expand"
                            }
                            onClick={() => toggleAccordion(1)}
                          >
                            Vision
                          </Link>
                        </div>
                        <div
                          className={`card-body ${
                            activeIndex === 1 ? "expanded" : "collapsed"
                          }`}
                          id="collapse3-1"
                        >
                          <p className="mb-0 descriptionVison">
                            Text will be coming soon...
                          </p>
                        </div>
                      </div>

                      {/* Mission Accordion */}
                      <div className="card descriptionVison">
                        <div className="card-header">
                          <Link
                            to="#collapse3-2"
                            className={
                              activeIndex === 2 ? "collapse" : "expand"
                            }
                            onClick={() => toggleAccordion(2)}
                          >
                            Mission
                          </Link>
                        </div>
                        <div
                          className={`card-body ${
                            activeIndex === 2 ? "expanded" : "collapsed"
                          }`}
                          id="collapse3-2"
                        >
                          <p className="mb-0 descriptionVison">
                            Text will be coming soon...
                          </p>
                        </div>
                      </div>

                      {/* Core Values Accordion */}
                      <div className="card">
                        <div className="card-header descriptionVison">
                          <Link
                            to="#collapse3-3"
                            className={
                              activeIndex === 3 ? "collapse" : "expand"
                            }
                            onClick={() => toggleAccordion(3)}
                          >
                            Core Values
                          </Link>
                        </div>
                        <div
                          className={`card-body ${
                            activeIndex === 3 ? "expanded" : "collapsed"
                          }`}
                          id="collapse3-3"
                        >
                          <p className="mb-0 descriptionVison">
                            Text will be coming soon...
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-8">
                    <figure className="br-lg">
                      <img
                        src={AboutImg}
                        alt="Banner"
                        style={{ backgroundColor: "#CECECC" }}
                      />
                    </figure>
                  </Col>
                </Row>
              </section>

              <section className="count-section mb-10 pb-5">
                <div className="swiper-container swiper-theme">
                  <div className="swiper-wrapper row cols-lg-3 cols-md-2 cols-1">
                    {/* Products For Sale Counter */}
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
                                <CountUp start={0} end={15} duration={2} />
                              </span>
                              <span>M+</span>
                            </>
                          )}
                          <h4 className="title title-center">
                            Products For Sale
                          </h4>
                          <p>Text will be coming soon...</p>
                        </div>
                      </VisibilitySensor>
                    </div>

                    {/* Community Earnings Counter */}
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
                                ₹<CountUp start={0} end={25} duration={2} />
                              </span>
                              <span>B+</span>
                            </>
                          )}
                          <h4 className="title title-center">
                            Community Earnings
                          </h4>
                          <p>Text will be coming soon...</p>
                        </div>
                      </VisibilitySensor>
                    </div>

                    {/* Growing Buyers Counter */}
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
                                <CountUp start={0} end={100} duration={2} />
                              </span>
                              <span>M+</span>
                            </>
                          )}
                          <h4 className="title title-center">Growing Buyers</h4>
                          <p>Text will be coming soon...</p>
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
