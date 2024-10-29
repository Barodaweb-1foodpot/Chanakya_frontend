import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import logo from "../assets/images/home/logo.png";
import product from "../assets/images/cart/product-2.jpg";
import { varifyUser } from "../Functions/UserLogin";
import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { Email } from "@mui/icons-material";
import { useEmail } from "./VerifyEmail";
import { RxCross2 } from "react-icons/rx";
import MobileHeader from "./MobileHeader";
import { useFilter } from "./VerifyEmail";


const Header = (data) => {
  const { EmailVerify, userData, setUserData } = useEmail();
  const { FilterLogic, searchText, handleKeyDown, setSearchText, handleSearchClick, handleInputChange, setFilterRange } = useFilter()
  const navigate = useNavigate();


  const [show, setShow] = useState(false);
  // const [userData, setUserData] = useState({});
  const [CategoryData, setCategoryData] = useState([]);
  const fetchData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/list/CategoryMaster`
    );
    setCategoryData(res.data);
    console.log(res);
  };
  useEffect(() => {
    setFilterRange(0)
    setSearchText("")
    fetchData();
  }, []);
  const [token, setToken] = useState("");
  const [Name, setName] = useState("");

  const [isOpen, setIsOpen] = useState(false); // Track dropdown open/close state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Alphabet",
      details: "Safaribags S2",
      quantity: 1,
      imgSrc: "../assets/images/cart/product-1.jpg",
    },
    {
      id: 2,
      name: "Rugby Ball",
      details: "Safaribags S11",
      quantity: 2,
      imgSrc: "../assets/images/cart/product-2.jpg",
    },
  ]);
  const [selectedOption, setSelectedOption] = useState("");

  // Handle the change event when user selects an option
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleRemoveItem = async (productId) => {
    try {
      // Assuming user ID is stored in local storage or passed down as a prop
      const userId = localStorage.getItem('user');
      console.log(productId)
      // Call the API to remove the item from the user's cart
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/remove/user-cart-item`, {
        userId,
        productId
      });

      // Update the local state after successful removal
      if (response.data.success) {
        // Filter out the removed product from the local cart state
        const updatedCart = userData.cart.filter(item => item.productName._id !== productId);
        setUserData(prev => ({ ...prev, cart: updatedCart }));
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const cartTotalQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the dropdown state
  };

  const Email = localStorage.getItem("user");
  useEffect(() => {
    console.log(Email);
    EmailVerify()
  }, [Email]);
  const [totalQuantity, setTotalQuantity] = useState("");

  useEffect(() => {
    if (userData && userData.cart) {
      // Sum the quantity in cart array
      const total = userData.cart.reduce((acc, item) => acc + item.quantity, 0);
      setTotalQuantity(total);
    }
  }, [userData]);
  // const EmailVerify =()=>{
  //   if (Email) {
  //     varifyUser(Email)
  //       .then((response) => {
  //         console.log(response);
  //         const user = response.data; // Access the user data from response
  //         setUserData(user); // Do something with the user data
  //       })
  //       .catch((error) => {
  //         console.error("Error in user verification process:", error);
  //       });
  //   } else {
  //     console.log("No token found");
  //   }
  // }
  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");
    toast.success("Account Logged out Successfully")
    // Optionally, you can also clear all localStorage data if needed:
    // localStorage.clear();

    // Redirect to the login page ("/")
    // window.location.href = "/";
    EmailVerify();

  };
  const prices = [
    { label: "All Price", value: "All" },
    { label: "Under 100", value: 100 },
    { label: "Under 200", value: 200 },
    { label: "Under 500", value: 500 },
    { label: "Under 700", value: 700 },
    { label: "Under 1000", value: 1000 },
    { label: "Under 2000", value: 2000 },
    { label: "Under 5000", value: 5000 },
    { label: "Above 5000", value: ">5000" }
  ];



  return (
    <header className="header">
      {/* <ToastContainer/> */}
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <p className="welcome-msg">Welcome to Chanakya Corporate</p>
          </div>
          <div className="header-right">
            {userData && userData.Email ? (
              <>

                <Dropdown>
                  <Dropdown.Toggle className="dropdownHader welcome-msg" id="dropdown-basic">
                    <span>Welcome, {userData.Name}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdownHaderMenu">
                    <Dropdown.Item href="/myAccount">My Account</Dropdown.Item>
                    <Dropdown.Item >
                      <button className="logoutBtn" onClick={handleLogout}>Logout</button>
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
                {/* <Link to="/" className="d-lg-show">
                    My Account

                  </Link> */}
              </>
            ) : (
              <>
                <Link to="/Login" className="d-lg-show login sign-in">
                  <i className="w-icon-account"></i> Sign In
                </Link>
                <span className="delimiter d-lg-show">/</span>
                <Link to="/SignUp" className="ml-0 d-lg-show login register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* End of Header Top */}
      <div className="header-middle border-no">
        <div className="container">
          <div className="header-left mr-md-4">

            <MobileHeader />
            <Link to="/" className="logo">
              <img src={logo} alt="logo" />
            </Link>
            <form
              method="get"
              action="#"
              className="input-wrapper header-search hs-expanded hs-round d-none d-md-flex"
            >
              <div className="select-box bg-white">
                <select id="category"
                  name="category"
                  onChange={(e) => {
                    FilterLogic(e.target.value)
                    navigate('/product-list')
                  }}>
                  {prices.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                className="form-control bg-white pt-0 pb-0"
                name="search"
                id="search"
                value={searchText && searchText}
                onChange={(e) => {
                  handleInputChange(e.target.value)
                }} // Updating searchText on change
                onKeyDown={handleKeyDown} // Listening for Enter key press
                placeholder="What are you looking for..."
                required
              />
              <button className="btn btn-search" type="button" onClick={handleSearchClick}>
                <i className="w-icon-search"></i>
              </button>
            </form>
          </div>
          <div className="header-right ml-4">
            <div className="header-call d-xs-show d-lg-flex align-items-center">
              <Link to="tel:#" className="w-icon-call"></Link>
              <div className="call-info d-lg-show">
                <h4 className="chat font-size-md text-normal ls-normal text-white mb-0">
                  <Link
                    to="mailto:info@chanakya.com"
                    className="text-capitalize  font-weight-normal"
                    style={{ color: "#a01e20" }}
                  >
                    Live Chat
                  </Link>
                  <span className="text-light orTitle font-weight-normal">
                    or :
                  </span>
                </h4>
                <a
                  href="tel:#"
                  className="phone-number font-weight-bolder ls-50"
                >
                  +919974017725
                </a>
              </div>
            </div>

            <div
              className={`dropdown cart-dropdown cart-offcanvas mr-0 mr-lg-2 ${isOpen ? "opened" : ""
                }`}
            >
              <div
                className={`cart-overlay ${isOpen ? "active" : ""}`}
                onClick={toggleDropdown}
              ></div>
              <a
                // href="#"
                className="cart-toggle label-down link"
                onClick={toggleDropdown}
              >
                <i className="w-icon-cart">
                  <span className="cart-count text-white">
                    {userData && userData.cart ? userData.cart.length : "0"}
                  </span>
                </i>
                <span className="cart-label">Cart</span>
              </a>
              {isOpen && (
                <div className="dropdown-box opened">
                  <div className="cart-header">
                    <span>Shopping Cart</span>
                    <a href="#" onClick={toggleDropdown}>
                      <span style={{ fontSize: "15px" }}> Close</span>{" "}
                      <i className="w-icon-long-arrow-right"></i>
                    </a>
                  </div>
                  <div className="products">
                    {userData && userData.cart.length > 0 ? (
                      userData.cart.map((item, index) => (
                        item.productName && (
                          <div className="product product-cart" key={item._id}>
                            <div className="product-detail">
                              <p className="text-start product-name mb-0">
                                {item.productName.productName}
                              </p>

                              <div className="price-box">
                                <span className="product-quantity">{item.quantity}</span>
                                <span className="product-price">QTY</span>
                              </div>
                            </div>
                            <figure className="product-media">
                              <a href="#">
                                <img
                                  src={`${process.env.REACT_APP_API_URL}/${item.productName.productImage}`}
                                  alt={item.productName.productName}
                                  width="84"
                                  height="94"
                                />
                              </a>
                            </figure>
                            <button
                              className="btn btn-link btn-close"
                              onClick={() => handleRemoveItem(item.productName._id)}
                            >
                              <RxCross2 className=" m-0 cross" />
                            </button>
                          </div>
                        )
                      ))
                    ) : (
                      <div>
                        <Link to="/product-list"
                          onClick={toggleDropdown}
                        
                        className="btn btn-primary btn-rounded">
                          Explore our products
                        </Link>
                      </div>
                    )}
                  </div>

                  {userData && userData.cart.length !== 0 &&
                    <div>
                      <div className="cart-total">
                        <label>Subtotal:</label>
                        <span className="price">{totalQuantity} QTY</span>
                      </div>
                      <div className="cart-action">
                        <Link
                          to="/cart"
                          onClick={toggleDropdown}
                          className="btn btn-dark btn-outline btn-rounded"
                        >
                          View Cart
                        </Link>
                        <Link to='checkout' 
                          onClick={toggleDropdown}

                         className="btn btn-primary btn-rounded">
                          Checkout
                        </Link>
                      </div>
                    </div>
                  }

                </div>
              )}
              {/* End of Dropdown Box */}
            </div>
          </div>
        </div>
      </div>
      {/* End of Header Middle */}
    </header>
  );
};

export default Header;
