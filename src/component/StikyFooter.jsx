import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useEmail, useFilter } from "./VerifyEmail";
import { RxCross2 } from "react-icons/rx";
const StickyFooter = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const user= localStorage.getItem("user");

  const { EmailVerify, userData, setUserData } = useEmail();
  const { setSearchText, setFilterRange } = useFilter()




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


  const [isOpen, setIsOpen] = useState(false); // Track dropdown open/close state
 


  // Handle the change event when user selects an option


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

  

  const chechLogin =()=>{
    if(user)
    {
      navigate("/myAccount");
      // redirect("/createCatalog")
    }
    else{
     
      toast.warning("Please Login to assess Catalogue")
      setTimeout(() => {
        navigate("/login");
      }, 3000)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(true);
      } else {
        // Scrolling up
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <React.Fragment>
      <div className={`sticky-footer sticky-content fix-bottom ${isVisible ? "visible" : "hidden"}`}>
        <Link to="/" className="sticky-link active">
          <i className="w-icon-home" />
          <p>Home</p>
        </Link>
        <Link to="/product-list" className="sticky-link">
          <i className="w-icon-category" />
          <p>Shop</p>
        </Link>
        <div to="#" onClick={chechLogin} style={{cursor:"pointer"}} className="sticky-link">
          <i className="w-icon-account" />
          <p>Account</p>
        </div>
        <div className="cart-dropdown dir-up">
          {/* <Link to="#" className="sticky-link">
            <i className="w-icon-cart" />
            <p>Cart</p>
          </Link> */}
           <div
              className={`dropdown cart-dropdown cart-offcanvas mr-0 mr-lg-2 sticky-link ${isOpen ? "opened" : ""
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
                  {/* <span className="cart-count text-white">
                    {userData && userData.cart ? userData.cart.length : "0"}
                  </span> */}
                </i>
                
                <p>Cart</p>
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
        {/* <div className="header-search hs-toggle dir-up">
          <Link to="#" className="search-toggle sticky-link">
            <i className="w-icon-search" />
            <p>Search</p>
          </Link>
          <form action="#" className="input-wrapper">
            <input
              type="text"
              className="form-control"
              name="search"
              autoComplete="off"
              placeholder="Search"
              required
            />
            <button className="btn btn-search bg-white" type="submit">
              <i className="w-icon-search" />
            </button>
          </form>
        </div> */}
      </div>
      <style jsx>{`
        .sticky-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: white;
          z-index: 9999;
          transition: transform 0.3s ease-in-out;
        }
        .sticky-footer.hidden {
          transform: translateY(100%);
        }
        .sticky-footer.visible {
          transform: translateY(0);
        }
      `}</style>
    </React.Fragment>
  );
};

export default StickyFooter;
