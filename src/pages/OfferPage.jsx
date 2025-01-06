import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import ImgOffer from "../assets/images/products/banner-1.jpg"
import { Puff } from 'react-loader-spinner';
import axios from 'axios';

const OfferPage = () => {
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => { 
    const delay = 1000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
    fetchOffer()
  }, []);
  const [offerData, setOfferData] = useState([])

  const fetchOffer = async () => {
    try {
      const res =await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/listActive/OfferMaster`
      ) 
      setOfferData(res.data);
    }
    catch (error) {
      console.log(error)
    }
  }
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
            <Row className='px-5'>
              <div className="post-wrapper pb-2 pb-lg-0 mb-5 ">
                <div className="swiper-wrapper row cols-lg-4 cols-md-3 cols-sm-2 cols-1">
                  {offerData && offerData.map((offer, index) => (
                    <div
                      key={index}
                      className="swiper-slide post text-center overlay-zoom"
                    >
                      <figure className="post-media br-sm">

                        <img
                          src={`${process.env.REACT_APP_API_URL}/${offer.logo}`}
                          style={{ backgroundColor: offer.backgroundColor }}
                          alt={offer.title}
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

                <div className="swiper-pagination mt-2"></div>
              </div>
            </Row>
         
        </div>
      )}
    </React.Fragment>
  )
}

export default OfferPage