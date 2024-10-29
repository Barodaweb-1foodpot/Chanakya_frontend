import React, { useEffect, useState } from "react";
import xq from "../assets/images/home/products/p-01.jpg"
import xq1 from "../assets/images/home/products/p-02.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

import { useEmail } from "../component/VerifyEmail";
import { RiDeleteBinLine } from "react-icons/ri";
const Cart = () => {
 


  const { EmailVerify, setUserData, userData } = useEmail();
  console.log(userData)
  useEffect(() => {
    EmailVerify()
  }, [])

  // Update quantity for a specific cart item
  // Update quantity for a specific cart item in userData
  const handleQuantityChange = (id, quantity) => {
    const updatedCart = userData.cart.map((item) =>
      item.productName._id === id
        ? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
        : item
    );

    setUserData({ ...userData, cart: updatedCart }); // Update the cart in userData
  };

  // Remove item from userData cart
  const handleRemoveItem = async(id) => {
    const updatedCart = userData.cart.filter(
      (item) => item.productName._id !== id
    );
   
    setUserData({ ...userData, cart: updatedCart }); // Update the cart in userData
  };


  // Calculate the subtotal for a single item
  const calculateSubtotal = (item) => {
    console.log(item)
    return item.productName.newPrice * item.quantity
  };

  // // Calculate the total for the entire cart

 
  const calculateTotal = () => {
    // Check if userData exists and has a cart array
    return userData && userData.cart
      ? userData.cart.reduce((total, item) => total + calculateSubtotal(item), 0)
      : 0;  // Return 0 if there's no cart or userData
  };

  const handleCheckout = async()=>{
    const user= localStorage.getItem('user')
      try{
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/update/UserMasterDetails/${user}`,userData )
      console.log(res)
      if(res.status===200)
      {
        window.location.href = '/checkout'; 
      }
      }
      catch(error)
      {
        console.log(error)
      }

  }

  const handleClear=()=>{
 
    setUserData({ ...userData, cart: [] }); // Update the cart in userData
  }

  return (
    <main className="main login-page">
      {/* Breadcrumb */}
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

      {/* Page Content */}
      <div className="page-content wishlist-page pt-8 pb-8">
        <div className="container">
          <div className="row justify-content-center">
            {/* Cart Items */}
            <div className="col-md-12 col-lg-9">
              <table className="shop-table cart-table">
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
                          <span className="productname" style={{ fontSize: "14px", fontWeight: "500" }}>{item.productName.productName}</span>
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
                          <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>₹</span>{" "}
                          {item.productName.newPrice}
                        </ins>
                      </td>
                      <td className="product-quantity text-center">
                        <div className="input-group">
                          <input
                            className="quantity form-control"
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.productName._id, parseInt(e.target.value))}
                          />
                          <button
                            className="quantity-plus w-icon-plus"
                            onClick={() => handleQuantityChange(item.productName._id, item.quantity + 1)}
                          ></button>
                          <button
                            className="quantity-minus w-icon-minus"
                            onClick={() => handleQuantityChange(item.productName._id, item.quantity - 1)}
                          ></button>
                        </div>
                      </td>
                      <td className="product-subtotal text-center">
                        <span className="amount">
                          <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>₹</span>{" "}
                          {calculateSubtotal(item)}
                        </span>
                      </td>
                      <td className="wishlist-action">
                        <div className="text-center">
                          <p>
                            <Link
                              to="#"
                              className="btn deleteBut btn-rounded btn-sm p-3 mt-2"
                              onClick={() => handleRemoveItem(item.productName._id)}
                            >
                              <RiDeleteBinLine style={{ strokeWidth: '0px' }} />
                            </Link>
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

              <div className="cart-action d-flex mt-6 mb-6">
                <Link
                  to="/product-list"
                  className="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto"
                >
                  <i className="w-icon-long-arrow-left"></i>Continue Shopping
                </Link>
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn btn-rounded btn-default btn-clear"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Summary */}
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
                    disabled={userData && !userData.cart.length>0}
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
  );
};

export default Cart;
