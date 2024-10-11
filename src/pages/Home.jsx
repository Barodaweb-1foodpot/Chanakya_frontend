import React, {useState, useEffect} from 'react';
import Slider from "react-slick";
import { Row, Col, Container } from 'reactstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marquee from "react-fast-marquee";
import { Client } from '../component/Client';
import { Link } from 'react-router-dom'; 
import axios from "axios";
import CreateCatalogBtn from '../component/CreateCatalogBtn';

// Define the brand images
 

 

const Home = () => {
    // Slider settings for the vertical brand slider

    const featuredBrands = [
        {
            imgSrc: require('../assets/images/home/featured-brands/fb_01.jpg'),
            backgroundColor: '#b8bfc4',
            discount: 'Upto 15% OFF',
            title: 'Buy 100 QTY of any Skybags products',
        },
        {
            imgSrc: require('../assets/images/home/featured-brands/fb_02.jpg'),
            backgroundColor: '#596066',
            discount: 'Sale Upto 50% OFF +',
            title: 'Buy 1000 Product',
        },
        {
            imgSrc: require('../assets/images/home/featured-brands/fb_03.jpg'),
            backgroundColor: '#596066',
            discount: 'Upto 50% OFF +',
            title: "Buy 100 QTY of I'm caffeine",
        },
        {
            imgSrc: require('../assets/images/home/featured-brands/fb_04.jpg'),
            backgroundColor: '#596066',
            discount: 'Upto 45% OFF +',
            title: 'Order on September 2024',
        },
        {
            imgSrc: require('../assets/images/home/featured-brands/fb_05.jpg'),
            backgroundColor: '#596066',
            discount: 'Upto 50% OFF +',
            title: 'Buy 200 Get 10 free',
        },
    ];

    const [brandData, setBrandData] = useState([])
    const [clientData, setClientData ] = useState([])
    const [categoryData, setCategoryData ] = useState([])
    const [subCategoryData, setSubCategoryData ] = useState([])
    useEffect (()=>{
        const fetchData=async()=>{
            const [brandData, clientData , categoryData ] = await Promise.all([
                axios.get(
                  `${process.env.REACT_APP_API_URL}/api/auth/list/BrandMaster`
                ),
                axios.get(
                  `${process.env.REACT_APP_API_URL}/api/auth/list/ClientMaster`
                ),
                axios.get(
                    `${process.env.REACT_APP_API_URL}/api/auth/list/CategoryMaster`
                  ),
                  
              ]);
              console.log(clientData)
              setBrandData(brandData.data)
              setClientData(clientData.data)
            //   setSubCategoryData(subCategory.data)
              setCategoryData(categoryData.data)

        }
        fetchData()
        combineData()
    },[])

    const [combinedDatas, setCombinedData] = useState([])
    const combineData =async()=>{
       const res= await axios.get(
            `${process.env.REACT_APP_API_URL}/api/auth/list/getGroupedSubCategory`
          )

          console.log(res.data.data)
          setCombinedData(res.data.data)
        
    }

    return (
        <Container className="pb-2">
          
            <Row>
                {/* Left vertical slider for brands */}
                <Col lg="2" className="widget widget-products" style={{ borderRight: '1px solid #eee' }}>
                    <div className="title-link-wrapper mb-2">
                        <h4 className="title title-link font-weight-bold" style={{ fontSize: '15px' }}>Brands We Have</h4>
                    </div>
                    <div className="vertical-marquee" >
                        <Marquee gradient={false}  direction="up"  speed={10}>
                            {brandData.map((img, index) => (
                                <div key={index} className="brand-item">
                                    <Link to={`/brand/${img._id}`}>
                                        <img src={`${process.env.REACT_APP_API_URL}/${img.logo}`} className="mb-2" alt="Brand" style={{width:'150px'}}/>
                                    </Link>
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </Col>

                {/* Right side category grid */}
                <Col lg="10">
                    <Row className="category-wrapper cols-12 cols-lg-7 cols-xl-8 pt-4 align-items-center">
                        {categoryData.map((category, index) => (
                            index === 15 ? (
                                <div key={index} xs="12" md="6" lg="4" xl="3" className="category category-ellipse text-center">
                                     <Link to ='/category'><div className="icon-box icon-colored-circle">
                                        <span className="icon-box-icon mb-0 text-white">
                                            <i className="w-icon-hamburger"></i>
                                        </span>
                                    </div>
                                    <div className="category-content">
                                        <h4 className="category-name">
                                           All Categories
                                        </h4>
                                    </div>
                                    </Link>
                                </div>
                            ) : (
                                <div key={index} xs="12" md="6" lg="4" xl="3" className="category category-ellipse mb-5">
                                    <div className="category-media">
                                        <Link to ='/product-list'>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/${category.logo}`}
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
                                </div>
                            )
                        ))}



                    </Row>
                </Col>
            </Row>
            <Client data={clientData}/>
            <Row>
            <div className="all-category-product">
            <div className="row category-wrapper cols-lg-3 cols-sm-2  mt-5">
                {combinedDatas.map((category, index) => (
                    <div className="category-wrap mb-4" key={index}>
                        <div className="category category-group-image br-sm">
                            <div className="category-content">
                                <h4 className="category-name">
                                    <a href="#">{category?.categoryDetails?.categoryName}</a>
                                </h4>
                                <ul className="category-list">
                                    {category.subCategoryDetails.map((subProduct, subIndex) => (
                                        <li key={subIndex}>
                                            <a href="#">{subProduct.subCategoryName}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a href="#">
                                <figure className="category-media">
                                    <img src={`${process.env.REACT_APP_API_URL}/${category?.categoryDetails?.logo}`} alt={category?.categoryDetails?.categoryName} width="190" height="215" />
                                </figure>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <CreateCatalogBtn />
            {/* End of Category Wrapper */}
        </div>
            </Row>
            <Row>
            <div class="title-link-wrapper title-underline title-post after-none mb-4 ">
                    <h2 class="title font-secondary ls-normal mb-0">Featured Offer</h2>
                    <Link to="#" class="font-weight-bold font-size-normal mb-0">
                        View All Offer
                        <i class="w-icon-long-arrow-right"></i>
                    </Link>
                </div>

            </Row>

            <Row>
            <div className="swiper-container swiper-theme post-wrapper pb-2 pb-lg-0 mb-5 ">
           
                <div className="swiper-wrapper row cols-lg-4 cols-md-3 cols-sm-2 cols-1">
                    {featuredBrands.map((brand, index) => (
                        <div key={index} className="swiper-slide post text-center overlay-zoom">
                            <figure className="post-media br-sm">
                                <a href="#">
                                    <img src={brand.imgSrc} style={{ backgroundColor: brand.backgroundColor }} alt={brand.title} />
                                </a>
                            </figure>
                            <div className="post-details">
                                <div className="post-meta">{brand.discount}</div>
                                <h4 className="post-title" title={brand.title}>
                                    <a href="#">{brand.title}</a>
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            
            <div className="swiper-pagination mt-2"></div>
        </div>
            </Row>
            <Row>
            <div className="icon-box-wrapper br-sm mt-0 mb-10 ">
            <div className="row cols-md-4 cols-sm-3 cols-1">
                <div className="icon-box icon-box-side text-dark">
                    <span className="icon-box-icon icon-shipping">
                        <i className="w-icon-truck"></i>
                    </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title font-weight-bolder">Dial B2B service</h4>
                        <p className="text-default">
                            Get Suppliers info on <br /> Phone / SMS / Email / Whatsapp
                        </p>
                    </div>
                </div>
                <div className="icon-box icon-box-side text-dark">
                    <span className="icon-box-icon icon-payment">
                        <i className="w-icon-bag"></i>
                    </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title font-weight-bolder">Secure Payment</h4>
                        <p className="text-default">We ensure secure payment</p>
                    </div>
                </div>
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
                <div className="icon-box icon-box-side text-dark icon-box-chat mt-0">
                    <span className="icon-box-icon icon-chat">
                        <i className="w-icon-call"></i>
                    </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title font-weight-bolder">Customer Support</h4>
                        <p className="text-default">Call or email us 24/7</p>
                    </div>
                </div>
            </div>
        </div>
            </Row>
        </Container>
    );
};

export default Home;
