import React from "react";
import { Modal, ModalBody } from "reactstrap";
import imageUrl from "../assets/images/gift.jpg"
const priceRanges = [
    { label: "Under 100", value: 100, endValue: 0 },
    { label: "Under 200", value: 200, endValue: 100 },
    { label: "Under 300", value: 300, endValue: 200 },
    { label: "Under 400", value: 400, endValue: 300 },
    { label: "Under 500", value: 500, endValue: 400 },
    { label: "Under 600", value: 600, endValue: 500 },
    { label: "Under 700", value: 700, endValue: 600 },
    { label: "Under 800", value: 800, endValue: 700 },
    { label: "Under 900", value: 900, endValue: 800 },
    { label: "Under 1000", value: 1000, endValue: 900 },
    { label: "Under 1250", value: 1250, endValue: 1200 },
    { label: "Under 1500", value: 1500, endValue: 1250 },
    { label: "Under 1750", value: 1750, endValue: 1500 },
    { label: "Under 2000", value: 2000, endValue: 1750 },
    { label: "Above 2250", value: 2250, endValue: 2000 },
    { label: "Under 2500", value: 2500, endValue: 2250 },
    { label: "Under 2750", value: 2750, endValue: 2500 },
    { label: "Under 3000", value: 3000, endValue: 2750 },
    { label: "Under 3500", value: 3500, endValue: 4000 },
    { label: "Under 4000", value: 4000, endValue: 3000 },
    { label: "Under 4500", value: 4500, endValue: 4000 },
    { label: "Under 5000", value: 5000, endValue: 4500 },
    { label: "Under 5500", value: 5500, endValue: 5000 },
    { label: "Under 6000", value: 6000, endValue: 5500 },
    { label: "Under 6500", value: 6500, endValue: 6000 },
    { label: "Under 7000", value: 7000, endValue: 6500 },
    { label: "Under 7500", value: 7500, endValue: 7000 },
    { label: "Under 8000", value: 8000, endValue: 7500 },
    { label: "Under 8500", value: 8500, endValue: 8000 },
    { label: "Under 9000", value: 9000, endValue: 8500 },
    { label: "Under 10,000", value: 10000, endValue: 9000 },
    { label: "Above 10,000", value: ">10000", endValue: 10000 }
];

const ProductPriceModal = ({ isOpen, toggle }) => {
    // Replace with actual image path

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalBody className="col-md-12">
                <div className="popular-city grid grid-cols-2 gap-4">
                    <div className="row">
                    {priceRanges.map((price, index) => (
                        <div key={index} className="col-md-6 col-lg-2 col-large-10">
                            <a href="#" class="popular-city-name category-ellipse">
                                <div class="city-image category-media">
                                    <img src={imageUrl} className="w-24 h-24 object-cover" />
                                </div>

                                <p>{price.label}</p>
                            </a>
                            {/* <img src={imageUrl} alt="Product" className="w-24 h-24 object-cover" />
                            <span className="mt-2 text-sm font-semibold">{price.label}</span> */}
                        </div>
                    ))}
                    </div>
                    
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ProductPriceModal;
