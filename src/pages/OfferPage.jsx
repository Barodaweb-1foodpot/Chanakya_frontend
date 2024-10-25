import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import ImgOffer from "../assets/images/products/banner-1.jpg"
import { Puff } from 'react-loader-spinner';

const OfferPage = () => {
  const [isLoading, setIsLoading] = useState(true);

    const featuredBrands =  [
        {
            imgSrc: ImgOffer,
            title: "title1",
            discount:'40%'
        },
        {
            imgSrc: ImgOffer,
            title: "title1",
            discount:'40%'
        },
        {
            imgSrc: ImgOffer,
            title: "title1",
            discount:'40%'
        },
        {
            imgSrc: ImgOffer,
            title: "title1",
            discount:'40%'
        },
        {
            imgSrc: ImgOffer,
            title: "title1",
            discount:'40%'
        }
    ]
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
        <Container>
        <nav class="breadcrumb-nav mb-10">
        <div class="container">
          <ul class="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">All Offer</a>
            </li>
          </ul>
        </div>
      </nav>
        <Row>
        <div className="swiper-container swiper-theme post-wrapper pb-2 pb-lg-0 mb-5 ">
          <div className="swiper-wrapper row cols-lg-4 cols-md-3 cols-sm-2 cols-1">
            {featuredBrands.map((brand, index) => (
              <div
                key={index}
                className="swiper-slide post text-center overlay-zoom"
              >
                <figure className="post-media br-sm">
                  
                    <img
                      src={brand.imgSrc}
                    //   style={{ backgroundColor: brand.backgroundColor }}
                      alt={brand.title}
                    />
                 
                </figure>
                <div className="post-details">
                  <div className="post-meta">{brand.discount}</div>
                  <h4 className="post-title" title={brand.title}>
                    <div href="#">{brand.title}</div>
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-pagination mt-2"></div>
        </div>
      </Row>
        </Container>
        </div>
        )}
    </React.Fragment>
  )
}

export default OfferPage