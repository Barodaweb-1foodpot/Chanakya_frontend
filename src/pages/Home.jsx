import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Row, Col, Container } from "reactstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marquee from "react-fast-marquee";
import { Client } from "../component/Client";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateCatalogBtn from "../component/CreateCatalogBtn";
import { useFilter } from "../component/VerifyEmail";
import { Puff } from "react-loader-spinner";
import ProductPriceModal from "./priceModal";
// Define the brand images

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { handleFilterCategory, handleFilterSubCategory } = useFilter()
  const [brandData, setBrandData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [offerData, setOfferData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const [brandData, clientData, categoryData, offerData] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/api/auth/list/BrandMaster`),
        axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/list/ClientMaster`
        ),
        axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/list/CategoryMaster`
        ),
        axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/listActive/OfferMaster`
        ),
      ]);
      setBrandData(brandData.data);
      setClientData(clientData.data);

      setCategoryData(categoryData.data);
      setOfferData(offerData.data)
      setIsLoading(false)
    };
    fetchData();
    combineData();
  }, []);
  // useEffect(() => {

  const [combinedDatas, setCombinedData] = useState([]);
  const combineData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/list/getGroupedSubCategory`
    );

    console.log(res.data.data);
    setCombinedData(res.data.data);
  };

  return (
    <Container className="pb-2">
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
          <Row>

            <Col xl={2} lg="3" sm="12" xs="12"
              className=" widget widget-products"
              style={{ borderRight: "1px solid #eee" }}
            >
              <div className="title-link-wrapper mb-2">
                <Link to={`/brand/no`} className="m-0 d-flex justify-content-between w-100 align-items-center">
                  <h4
                    className="title title-link font-weight-bold"
                    style={{ fontSize: 15 }}
                  >
                    Brands We Have

                  </h4>

                </Link>
              </div>
              {!isMobile && (
                <marquee
                  direction="up"
                  height={250}
                  scrolldelay={200}
                  className="marque-box"
                >
                  <Row>
                    {brandData.map((img, index) => (
                      <Col lg={12} md={2} className="bnradLogoCol" key={index}>
                        <div className="brand-item">
                          <Link to={`/brand/${img._id}`}>
                            <img
                              src={`${process.env.REACT_APP_API_URL}/${img.logo}`}
                              className="mb-2"
                              alt="Brand"
                              style={{ width: "170px", border: '1px solid #ccc' }}
                            />
                          </Link>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </marquee>
              )}

              {isMobile && (
                <div>
                  <Marquee className="marque-box" spacing={50} scrolldelay={200}>
                    {brandData.map((img, index) => (
                      <div key={index} className="brand-item" style={{ display: "inline-block", }}>
                        <Link to={`/brand/${img._id}`}>
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${img.logo}`}
                            className="mb-2"
                            alt="Brand"
                            style={{ width: "180px", padding: "15px" }}
                          />
                        </Link>
                      </div>
                    ))}
                  </Marquee>
                </div>
              )}



            </Col>

            <Col xl={10} lg="9">

              <Row className="category-wrapper cols-12 cols-lg-7 cols-md-2 cols-sm cols-xl-8 pt-4 align-items-center">

                <div
                  xs="6"
                  sm="6"
                  md="4"
                  lg="4"
                  xl="3"
                  className="category category-ellipse large-sm-col col-6 text-center mb-5"
                >
                  <Link to="#"
                  //  onClick={() => setModalOpen(true)}
                  >
                    <div className="icon-box icon-colored-circle"  // Open modal on click
                    >
                      <span className="icon-box-icon mb-0 text-white">
                        <i className="w-icon-hamburger"></i>
                      </span>
                    </div>
                    <div className="category-content">
                      <h4 className="category-name categories category-content-title">All Products</h4>
                    </div>
                  </Link>
                </div>

                {categoryData.slice(0, 15).map((category, index) =>
                  index === 15 ? (
                    <div
                      key={index}
                      xs="6"
                      sm="6"
                      md="4"
                      lg="4"
                      xl="3"
                      className="category category-ellipse large-sm-col col-6 text-center mb-5"
                    >
                      <Link to="/category">
                        <div className="icon-box icon-colored-circle">
                          <span className="icon-box-icon mb-0 text-white">
                            <i className="w-icon-hamburger"></i>
                          </span>
                        </div>
                        <div className="category-content">
                          <h4 className="category-name categories category-content-title">All Categories</h4>
                        </div>
                      </Link>
                    </div>
                  ) :

                    (
                      <Col
                        key={index}
                        xs="6"
                        //   sm="6"
                        md="4"
                        lg="4"
                        xl="3"
                        className="category category-ellipse mb-5 col-sm large-sm-col"
                      >
                        <div className="category-media">
                          <Link to="/product-list" onClick={(e) => { handleFilterCategory(category._id, category.categoryName) }}>
                            <img
                              src={`https://server.chanakyacorporate.com/${category.logo}`}
                              alt={category.categoryName}
                              width="190"
                              height="190"
                            />
                          </Link>
                        </div>
                        <div className="category-content">
                          <h4 className="category-name">
                            <a href="#">{category.categoryName}</a>
                          </h4>
                        </div>
                      </Col>
                    )
                )}
              </Row>
            </Col>
          </Row>
          <Client data={clientData} />
          <Row>
            <div className="all-category-product">
              <div className="row category-wrapper cols-lg-3 cols-sm-2  mt-5">
                {combinedDatas.map((category, index) => (
                  <div className="category-wrap mb-4" key={index}>
                    <div className="category category-group-image br-sm">
                      <div className="category-content">
                        <h4 className="category-name">
                          <Link to='product-list' onClick={(e) => { handleFilterCategory(category._id, category.categoryDetails?.categoryName) }}>{category?.categoryDetails?.categoryName}</Link>
                        </h4>
                        <ul className="category-list">
                          {category.subCategoryDetails.map(
                            (subProduct, subIndex) => (
                              <li key={subIndex}>
                                <Link to="product-list" onClick={(e) => { handleFilterSubCategory(subProduct._id, subProduct.subCategoryName) }}>{subProduct.subCategoryName}</Link>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <figure className="category-media">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${category?.categoryDetails?.logoBackground || category?.categoryDetails?.logo}`}
                          alt={category?.categoryDetails?.categoryName}
                          width="190"
                          height="215"
                        />
                      </figure>

                    </div>
                  </div>
                ))}
              </div>
              <CreateCatalogBtn />
            </div>
          </Row>
          <Row>
            <div class="title-link-wrapper title-underline title-post after-none mb-4 ">
              <h2 class="title font-secondary ls-normal mb-0">Featured Offer</h2>
              <Link to="/offer" class="font-weight-bold font-size-normal mb-0">
                View All Offer
                <i class="w-icon-long-arrow-right"></i>
              </Link>

            </div>
          </Row>
          <Row>
            <div className="post-wrapper pb-2 pb-lg-0 mb-5">
              <div className="swiper-wrapper row cols-lg-5 cols-md-3 cols-sm-2 cols-1">
                {offerData && offerData.map((offer, index) => (
                  <div
                    key={index}
                    lg={3} md={4} sm={6} xs={6}
                    className="swiper-slide post text-center overlay-zoom"
                  >
                    <figure className="post-media br-sm">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${offer.logo}`}
                        style={{ backgroundColor: offer.backgroundColor, borderRadius: '15px' }}
                        alt={offer.title}
                        className="border-0 img-fluid"
                      />
                    </figure>
                    <div className="post-details">
                      <div className="post-meta">{offer.title}</div>
                      <h4 className="post-title" title={offer.desc}>
                        <span>{offer.desc}</span>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Row>
          <div className="icon-box-wrapper br-sm mt-0 mb-10 ">
            <Row>
              <Col lg={3} md={3} xs={6} className="">
                <div className="icon-box icon-box-side text-dark">
                  <span className="icon-box-icon icon-shipping">
                    <i className="w-icon-truck"></i>
                  </span>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title font-weight-bolder">
                      Dial B2B service
                    </h4>
                    <p className="text-default">
                      Get Suppliers info on <br /> Phone / SMS / Email / Whatsapp
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={3} xs={6} className="">
                <div className="icon-box icon-box-side text-dark">
                  <span className="icon-box-icon icon-payment">
                    <i className="w-icon-bag"></i>
                  </span>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title font-weight-bolder">
                      Secure Payment
                    </h4>
                    <p className="text-default">We ensure secure payment</p>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={3} xs={6}>
                <div className="icon-box icon-box-side text-dark icon-box-money">
                  <span className="icon-box-icon icon-money">
                    <i className="w-icon-chat"></i>
                  </span>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title font-weight-bolder">Need help</h4>
                    <p className="text-default">
                      Browse Help Topics and <br /> Self-Service Links
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={3} xs={6}>
                <div className="icon-box icon-box-side text-dark icon-box-chat mt-0">
                  <span className="icon-box-icon icon-chat">
                    <i className="w-icon-call"></i>
                  </span>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title font-weight-bolder">
                      Customer Support
                    </h4>
                    <p className="text-default">Call or email us 24/7</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

        </div>
      )}
      <ProductPriceModal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} />
    </Container>
  );
};

export default Home;
