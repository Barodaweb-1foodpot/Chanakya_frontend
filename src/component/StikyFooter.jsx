import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StickyFooter = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        <Link to="#" className="sticky-link">
          <i className="w-icon-account" />
          <p>Account</p>
        </Link>
        <div className="cart-dropdown dir-up">
          <Link to="#" className="sticky-link">
            <i className="w-icon-cart" />
            <p>Cart</p>
          </Link>
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
