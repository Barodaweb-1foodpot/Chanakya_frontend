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

  // Function to toggle accordion panels
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Function to handle visibility of counters
  const onVisibilityChange = (isVisible, key) => {
    if (isVisible) {
      setViewed((prevViewed) => ({ ...prevViewed, [key]: true }));
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
                        About Us Chankaya
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
                <h2 className="title text-left">
                      Vision, Mission & Core Values
                    </h2>
                  <Col md={4} className="pr-lg-8 mb-8">
                    <div className="aboutusVisonDiv">
                      <div className="visonIcon">
                  <FaEye />
                  </div>
                  <div className="visonTitle">
                    Vison
                  </div>
                  <div>
                    Text will be comming soon...Text will be comming soon...
                  </div>
                    </div>
                   
                  </Col>
                  <Col md={4} className="pr-lg-8 mb-8">
                    <div className="aboutusVisonDiv">
                      <div className="visonIcon">
                  <TbTargetArrow />
                  </div>
                  <div className="visonTitle">
                  Mission 
                  </div>
                  <div>
                    Text will be comming soon...Text will be comming soon...
                  </div>
                    </div>
                   
                  </Col>
                  <Col md={4} className="pr-lg-8 mb-8">
                    <div className="aboutusVisonDiv">
                      <div className="visonIcon">
                  <PiHandCoinsBold />
                  </div>
                  <div className="visonTitle">
                  Values 
                  </div>
                  <div>
                    Text will be comming soon...Text will be comming soon...
                  </div>
                    </div>
                   
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
                                <CountUp start={0} end={1000} duration={2} />
                              </span>
                              <sup>+</sup>
                            </>
                          )}
                          <h4 className="title title-center">
                            Number Of Product
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
                                <CountUp start={0} end={20} duration={2} />
                              </span>
                              <span className="yearSpan">Year</span>
                              <sup>+
                              </sup>
                            </>
                          )}
                          <h4 className="title title-center">
                            Year Of Experience
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
                                <CountUp start={0} end={20} duration={2} />
                              </span>
                              <span>k</span>
                              <sup>+</sup>
                            </>
                          )}
                          <h4 className="title title-center">Satisfied Client</h4>
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
