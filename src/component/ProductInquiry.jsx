import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { ImCross } from "react-icons/im";
import ProductImg from "../assets/images/products/default/1-1.jpg";
import Logo from "../assets/images/products/brand/brand-1.jpg";
import Counter from "./Counter";
import { toast, ToastContainer } from "react-toastify";
import { useEmail } from "./VerifyEmail";
import { BsBagCheck } from "react-icons/bs";

const ProductInquiry = ({ data }) => {
  const { EmailVerify } = useEmail();
  const [count, setCount] = useState(1);
  const [modalShow, setModalShow] = React.useState(false);
  const handleClose = () => setModalShow(false);
  const user = localStorage.getItem("user");
  const [notLogin, setNotLogin] = useState(false);
  const checkLogin = async () => {
    if (user) {
      setNotLogin(false);

      try { 
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/update/user-cart`,
          {
            userId: user, 
            productId: data._id,  
            quantity: count,  
          }
        ); 
        if (res.data.isOk) {  
          toast.success("Product added to cart successfully");
          setModalShow(false);
          setCount(1);
          EmailVerify();
        } else {
          setModalShow(false);
          setCount(1);
          toast.error("Something went wrong");
        } 
      } catch (error) {
        console.error("Error updating cart", error);
      }
    } else {
      setNotLogin(true);
    }
  };

  return (
    <React.Fragment>
      <div className="item-card-hov" onClick={() => setModalShow(true)}>
        <i className="w-icon-cart"></i>
        <p>Add To Inquiry</p>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      > 
        <div className="crossBtn" onClick={handleClose}>
          <ImCross />
        </div>
        <Modal.Body className="inquiryModalBoday">
          {data && (
            <Row className="modalRow">
              <Col lg={4}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/${data.productImage}`}
                  alt="product"
                />
              </Col>
              <Col lg={8}>
                <h2 className="product-title">{data.productName}</h2>
                <div>
                  <div className="catagoryDiv">
                    <img
                      className="brandLogo"
                      src={`${process.env.REACT_APP_API_URL}/${data.brandName.logo}`}
                      alt="logo"
                    />
                     <div>
                    <div className="product-categories">
                      <span >Category :</span>
                      {data.categoryName.categoryName}
                    </div>
                  
                    <div className=" product-categories">
                      <span>SKU:</span>
                      {data.SKU}
                    </div>
                    </div>
                  </div>
                </div>
                <div className="catagoryDiv">

                  <div className="product-single ">
                   
                    <div className="product-price">
                      <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="me-2">
                        ₹
                      </span>
                      {data.newPrice}
                      <small className="text-primary">
                        (For Retail Price)
                      </small>{" "}
                      <br />
                      <small
                        className="text-primary d-block mt-3"
                        style={{
                          whiteSpace: "break-spaces",
                          fontWeight: 500,
                          lineHeight: "initial",
                        }}
                      >
                        *Remark: For corporate pricing, please select the quantity
                        and submit an inquiry to receive the best price.
                      </small>
                    </div>
                  </div>
                </div>
               
                <hr className="hrTag" />
                {data.isAvailable === false ?
                 <Row>
                 <Col lg={4}>
                   <div className="mainDivCounter">
                     <div> {count}</div>
                     <div className="d-flex gap-3">
                     <div
                        onClick={() => setCount(count > 1 ? count - 1 : 1)}
                     >
                       <button className="quantity-minus increntBtn w-icon-minus" />

                     </div>
                     <div
                       className="increntBtn quantity-plus"
                       onClick={() => setCount(count + 1)}
                     >
                       {/* <AiFillPlusCircle /> */}
                       <button className=" increntBtn quantity-plus w-icon-plus" />

                     </div>
                     </div>

                     {/* Button to decrement the counter */}
                   </div>
                 </Col>
                 <Col lg={8}>
                   <button
                     className="addInquiry"
                     type="button"
                     onClick={checkLogin}
                   >
                     <BsBagCheck /> Add To Inquiry
                   </button>
                 </Col>
               </Row> : 
                <Row>
               
                <Col lg={12}>
                  <button
                    className="addInquiry"
                    type="button"
                  >
                    Out of Stock
                  </button>
                </Col>
              </Row>
                }
               
                <Row className="mt-4">
                  {notLogin && (
                    <h5 className="remarkDescription">
                      Please Login before adding to cart{" "}
                      <span>
                        <Link to="/login" className="text-black">
                          Click here to Login
                        </Link>
                      </span>
                    </h5>
                  )}
                </Row>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
      {/* <ToastContainer position="top-right" autoClose={2000} /> */}
    </React.Fragment>
  );
};

export default ProductInquiry;
