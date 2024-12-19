import React from 'react';
import Carousel from 'react-multi-carousel'; // Import the react-multi-carousel component
import 'react-multi-carousel/lib/styles.css'; // Import the carousel styles

export const Client = ({data}) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1200 },
            items: 8
        },
        desktop: {
            breakpoint: { max: 1200, min: 992 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 992, min: 576 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 2
        }
    };

    return (
        <>
            <div className="title-link-wrapper title-underline title-post after-none mb-4">
                <h2 className="title font-secondary ls-normal mb-0">Our Valuable Clients</h2>
                <a href="/allclient" className="font-weight-bold font-size-normal mb-0">
                    View All Clients
                    <i className="w-icon-long-arrow-right"></i>
                </a>
            </div>
            <div>
                <div className="swiper-container swiper-theme brands-wrapper br-sm mb-10">
                    <Carousel 
                        responsive={responsive} 
                        infinite={true} 
                        autoPlay={true} 
                        autoPlaySpeed={4000}  // Faster autoplay speed
                        keyBoardControl={true}
                        transitionDuration={400}  // Faster transition between slides
                        customTransition="transform 1s ease-in-out"
                        arrows={false}
                    >
                        {data.map((imageName, index) => (
                            <div className="swiper-slide" key={index}>
                                <figure>
                                    <img 
                                        className="brand-image" 
                                        src={`${process.env.REACT_APP_API_URL}/${imageName.logo}`} 
                                        alt="Brand" 
                                    />
                                </figure>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    );
};
