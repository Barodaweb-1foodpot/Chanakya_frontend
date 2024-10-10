import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import CountUp from 'react-countup';
import AboutImg from "../assets/images/aboutUsImg.jpg"

const AboutUs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

  // Function to toggle accordion panels
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <React.Fragment>
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
  <section className="boost-section pt-10 pb-10" style={{textAlign:"start"}}>
    <div className="container mt-10 mb-9">
      <Row className=" align-items-center mb-10">
        <Col onMouseDown={6} className=" mb-8">
          <figure className="br-lg">
            <img src={AboutImg} alt="Banner" width="100%"  style={{backgroundColor: '#9E9DA2'}} />
          </figure>
        </Col>
        <Col md={6}  className=" pl-lg-8 mb-8">
          <h4 className="title text-left">
            About The Direct Deals
          </h4>
          <p className="mb-6">
            Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
          </p>
          <p className="mb-6">
            Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
          </p>

        </Col>
      </Row>
      
    </div>
  </section>
  <section className="customer-service pt-10 mb-7">
      <Row className=" align-items-center">
        <Col md={6} className=" pr-lg-8 mb-8">
          <h2 className="title text-left">Vision, Mission &amp; Core Values</h2>
          <div className="accordion accordion-simple accordion-plus">
            {/* Vision Accordion */}
            <div className="card border-no">
              <div className="card-header">
                <Link
                  to="#collapse3-1"
                  className={activeIndex === 1 ? 'collapse' : 'expand'}
                  onClick={() => toggleAccordion(1)}
                >
                  Vision
                </Link>
              </div>
              <div
                className={`card-body ${activeIndex === 1 ? 'expanded' : 'collapsed'}`}
                id="collapse3-1"
              >
                <p className="mb-0 descriptionVison">
                  Text will be coming soon...Text will be coming soon...
                </p>
              </div>
            </div>

            {/* Mission Accordion */}
            <div className="card descriptionVison">
              <div className="card-header">
                <Link
                  to="#collapse3-2"
                  className={activeIndex === 2 ? 'collapse' : 'expand'}
                  onClick={() => toggleAccordion(2)}
                >
                  Mission
                </Link>
              </div>
              <div
                className={`card-body ${activeIndex === 2 ? 'expanded' : 'collapsed'}`}
                id="collapse3-2"
              >
                <p className="mb-0 descriptionVison">
                  Text will be coming soon...Text will be coming soon...
                </p>
              </div>
            </div>

            {/* Core Values Accordion */}
            <div className="card">
              <div className="card-header descriptionVison">
                <Link
                  to="#collapse3-3"
                  className={activeIndex === 3 ? 'collapse' : 'expand'}
                  onClick={() => toggleAccordion(3)}
                >
                  Core Values
                </Link>
              </div>
              <div
                className={`card-body ${activeIndex === 3 ? 'expanded' : 'collapsed'}`}
                id="collapse3-3"
              >
                <ul className="list-style-none list-type-check">
                  <li>Text will be coming soon...</li>
                  <li>Text will be coming soon...</li>
                  <li>Text will be coming soon...</li>
                  <li>Text will be coming soon...</li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
        <div className="col-md-6 mb-8">
          <figure className="br-lg">
            <img
              src={AboutImg}
              alt="Banner"
             
              style={{ backgroundColor: '#CECECC' }}
            />
          </figure>
        </div>
      </Row>
    </section>
    <section className="count-section mb-10 pb-5">
      <div
        className="swiper-container swiper-theme"
        data-swiper-options="{
            'slidesPerView': 1,
            'breakpoints': {
                '768': {
                    'slidesPerView': 2
                },
                '992': {
                    'slidesPerView': 3
                }
            }
        }"
      >
        <div className="swiper-wrapper row cols-lg-3 cols-md-2 cols-1">
          
          {/* Products For Sale Counter */}
          <div className="swiper-slide counter-wrap">
            <div className="counter text-center">
              <span>
                <CountUp end={15} duration={2} />
              </span>
              <span>M+</span>
              <h4 className="title title-center">Products For Sale</h4>
              <p>
                Text will be coming soon...Text will be coming soon...
                <br />
                Text will be coming soon...
              </p>
            </div>
          </div>

          {/* Community Earnings Counter */}
          <div className="swiper-slide counter-wrap">
            <div className="counter text-center">
              <span>₹</span>
              <span>
                <CountUp end={25} duration={2} />
              </span>
              <span>B+</span>
              <h4 className="title title-center">Community Earnings</h4>
              <p>
                Text will be coming soon...Text will be coming soon...
                <br />
                Text will be coming soon...
              </p>
            </div>
          </div>

          {/* Growing Buyers Counter */}
          <div className="swiper-slide counter-wrap">
            <div className="counter text-center">
              <span>
                <CountUp end={100} duration={2} />
              </span>
              <span>M+</span>
              <h4 className="title title-center">Growing Buyers</h4>
              <p>
                Text will be coming soon...Text will be coming soon...
                <br />
                Text will be coming soon...
              </p>
            </div>
          </div>
        </div>

        <div className="swiper-pagination" />
      </div>
    </section>
  </div>
  
  
</div>

    </React.Fragment>
  );
};

export default AboutUs;
