import React, { useEffect, useState } from "react";
import xq from "../assets/images/home/products/p-01.jpg"
import xq1 from "../assets/images/home/products/p-02.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

import { useEmail } from "../component/VerifyEmail";
import { RiDeleteBinLine } from "react-icons/ri";
import { Puff } from "react-loader-spinner";
import { Table } from "react-bootstrap";
const Cart = () => {



  const { EmailVerify, setUserData, userData } = useEmail();
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    EmailVerify()
  }, [])
  useEffect(() => { 
    const delay = 1000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []); 
  const handleQuantityChange = (id, quantity) => {
    const updatedCart = userData.cart.map((item) =>
      item.productName._id === id
        ? { ...item, quantity: Math.max(1, quantity) }  
        : item
    );

    setUserData({ ...userData, cart: updatedCart }); 
  };

 
  const handleRemoveItem = async (id) => {
    try { 
      const updatedCart = userData.cart.filter(
        (item) => item.productName._id !== id
      );
      setUserData({ ...userData, cart: updatedCart });
 
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/remove/user-cart-item`,
        { userId: localStorage.getItem("user"), productId: id }
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  const handleRemoveItemfunc = async (productId) => {
    try { 
      const userId = localStorage.getItem('user');  
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/remove/user-cart-item`, 
        userId,
        productId,
      );
 
      if (response.data.success) { 
        const updatedCart = userData.cart.filter(item => item.productName._id !== productId);
        setUserData(prev => ({ ...prev, cart: updatedCart }));
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
 
  const calculateSubtotal = (item) => { 
    return item.productName?.newPrice * item.quantity
  };
 
  const calculateTotal = () => { 
    return userData && userData.cart
      ? userData.cart.reduce((total, item) => total + calculateSubtotal(item), 0)
      : 0;   
  };

  const handleCheckout = async () => {
    const user = localStorage.getItem('user')
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/update/UserMasterDetails/${user}`, userData)
   
      if (res.status === 200) {
        window.location.href = '/checkout';
      }
    }
    catch (error) {
      console.log(error)
    }

  }

  const handleClear = async() => {

    setUserData({ ...userData, cart: [] });  
    const data = {cart:[]}
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/update/UserMasterDetails/${userData._id}`, data)
 
  }

  return (
    <React.Fragment>      {isLoading ? ( 
      <div className="loader-container">
        <Puff
          color="#a01e20"
          height={50}
          width={50}
          timeout={0} 
        />
      </div>
    ) : (
    <main className="main login-page"> 
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb shop-breadcrumb bb-no pt-2 pb-2">
            <li className="active">
              <Link to="#">Shopping Cart</Link>
            </li>
            <li>
              <Link to="#">Checkout</Link>
            </li>
            <li>
              <Link to="#">Order Complete</Link>
            </li>
          </ul>
        </div>
      </nav>
 
      <div className="page-content wishlist-page pt-8 pb-8">
        <div className="container">
          <div className="row justify-content-center"> 
            <div className="col-md-12 col-lg-9">
              <Table responsive className="shop-table cart-table">
                <thead>
                  <tr>
                    <th
                      className="product-name text-center"
                      style={{ width: "10%" }}
                    >
                      <span>Image</span>
                    </th>
                    <th style={{ width: "45%" }}>Product Description</th>
                    <th
                      className="product-price text-center"
                      style={{ width: "10%" }}
                    >
                      <span>Price</span>
                    </th>
                    <th
                      className="product-quantity text-center"
                      style={{ width: "15%" }}
                    >
                      <span>Quantity</span>
                    </th>
                    <th className="product-subtotal" style={{ width: "10%" }}>
                      <span>Subtotal</span>
                    </th>
                    <th
                      className="wishlist-action text-center"
                      style={{ width: "10%" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData && userData.cart.length > 0 && userData.cart.map((item) => (
                    item.productName ? (
                      <tr key={item.productName._id}>
                        <td className="product-thumbnail">
                          <div className="p-relative">
                            <Link to="#">
                              <figure>
                                <img
                                  src={`${process.env.REACT_APP_API_URL}/${item.productName.productImage}`}
                                  alt="product"
                                  width="300"
                                  height="338"
                                />
                              </figure>
                            </Link>
                          </div>
                        </td>
                        <td className="product-name">
                          <Link to={`/brand/${item.brandName.brandName}`}>
                            <span className="productname" style={{ fontSize: "14px", fontWeight: "500" }}>
                              {item.productName.productName}
                            </span>
                            <ul className="product-desc row m-0 mb-1 pl-20">
                              <li className="col-md-12 p-0">
                                <strong>Brand :</strong> {item.brandName.brandName}
                              </li>
                              <li className="col-md-12 p-0">
                                <strong>Category :</strong> {item.categoryName.categoryName}
                              </li>
                              <li className="col-md-12 p-0">
                                <strong>Sub Category :</strong> {item.subCategoryName.subCategoryName}
                              </li>
                            </ul>
                          </Link>
                        </td>
                        <td className="product-price text-center">
                          <ins className="new-price">
                            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>₹</span> {item.productName.newPrice}
                          </ins>
                        </td>
                        <td className="product-quantity text-center">
                          <div className="input-group">
                            <input
                              className="quantity form-control"
                              type="number"
                              readOnly
                              onWheel={(e) => e.target.blur()} // Disable scrolling increment
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.productName._id, parseInt(e.target.value))}
                            />
                            <div className="d-flex gap-3" >
                            <button
                              className="quantity-plus increntBtn w-icon-plus"
                              onClick={() => handleQuantityChange(item.productName._id, item.quantity + 1)}
                            ></button>
                            <button
                              className="quantity-minus increntBtn w-icon-minus"
                              onClick={() => handleQuantityChange(item.productName._id, item.quantity - 1)}
                            ></button>
                            </div>
                          </div>
                        </td>
                        <td className="product-subtotal text-center">
                          <span className="amount">
                            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>₹</span> {calculateSubtotal(item)}
                          </span>
                        </td>
                       
                         <td className="wishlist-action">
                              <button
                                className="btn deleteBut btn-rounded btn-sm p-3"
                                onClick={() => handleRemoveItem(item.productName._id)}
                              >
                                <RiDeleteBinLine style={{ strokeWidth: "0px" }} />
                              </button>
                            </td>
                      </tr>
                    ) : null 
                  ))}

                </tbody>

              </Table>

              <div className="cart-action d-flex mt-6 mb-6">
                <Link
                  to="/product-list"
                  className="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto"
                >
                  <i className="w-icon-long-arrow-left"></i>Continue Shopping
                </Link>
                <div
                  type="button"
                  onClick={handleClear}
                  className=" clearCard btn-rounded btn-default btn-clear"
                >
                  Clear Cart
                </div>
              </div>
            </div>
 
            <div className="col-md-6 col-lg-3 sticky-sidebar-wrapper">
              <div className="sticky-sidebar">
                <div className="cart-summary mb-4">
                  <h3 className="cart-title d-flex text-uppercase">
                    Cart Totals
                  </h3>
                  <div className="cart-subtotal d-flex align-items-center justify-content-between">
                    <label className="ls-25">Subtotal</label>
                    <span>
                      <span
                        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                      >
                        ₹
                      </span>{" "}
                      {calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <hr className="divider" />
                  <div className="order-total d-flex justify-content-between align-items-center">
                    <label>Total</label>
                    <span className="ls-50">
                      <span
                        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                      >
                        ₹
                      </span>{" "}
                      {calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <button
                    disabled={userData && !userData.cart.length > 0}
                    onClick={handleCheckout}
                    className="btn btn-block btn-dark btn-icon-right btn-rounded btn-checkout mt-3 "
                  >
                    Proceed to checkout
                    <i className="w-icon-long-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    )}
    </React.Fragment>
  );
};

export default Cart;