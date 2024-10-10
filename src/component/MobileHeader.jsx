import React, { useState } from "react";
import { Offcanvas, Navbar, Nav } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileHeader = () => {
  const [show, setShow] = useState(false); // State to toggle the offcanvas

  const handleClose = () => setShow(false); // Close the offcanvas
  const handleShow = () => setShow(true);   // Show the offcanvas

  return (
    <div>
      {/* Navbar for mobile header */}
      <Navbar className="mobile-menu-toggle " expand={false}>
        <Navbar.Toggle aria-controls="offcanvas-navbar" onClick={handleShow}>
          <FaBars style={{ fontSize: "24px", color: "#000" }} />
        </Navbar.Toggle>
      
      </Navbar>

      {/* Offcanvas (sidebar) for mobile menu */}
      <Offcanvas className="mobileHaderBody" show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
        <form action="#" className="input-wrapper">
        <div>
        <input type="text" className="form-control" name="search" autoComplete="off" placeholder="Search" required />
  <button className="btn btn-search searchBtn" type="button">
    <i className="w-icon-search" />
  </button>
        </div>
  
</form>
        </Offcanvas.Header>
        <Offcanvas.Body>
   
<div className="tab">
  <ul className="nav nav-tabs" role="tablist">
    {/* <li class="nav-item">
                  <a href="#main-menu" class="nav-link active">Main Menu</a>
              </li> */}
    <li className="nav-item">
      <a href="#categories" className="nav-link">Categories</a>
    </li>
  </ul>
</div>
<div className="tab-pane active" id="categories">
  <ul className="mobile-menu">
    {/* <li>
                      <a href="#">
                          Namkeen
                      </a>
                      <ul>
                          <li>
                              <a href="#">Lilo Chevado</a>
                          </li>
                          <li>
                              <a href="#">Cheese Bhakharwadi</a>
                          </li>
                          <li>
                              <a href="#">Bhujia</a>
                          </li>
                          <li>
                              <a href="#">Aloo Bhujia</a>
                          </li>
                          <li>
                              <a href="#">Salted Peanut</a>
                          </li>

                      </ul>
                  </li>

                  <li>
                      <a href="#">
                          Ready To Eat
                      </a>
                      <ul>
                          <li>
                              <a href="#">Dal & Curries</a>
                          </li>
                          <li>
                              <a href="#">Instant Upma</a>
                          </li>
                          <li>
                              <a href="#">Instant Idli Mix</a>
                          </li>
                          <li>
                              <a href="#">Instant Poha</a>
                          </li>
                          <li>
                              <a href="#">Vegetable Pulao</a>
                          </li>

                      </ul>
                  </li>

                  <li>
                      <a href="#">
                          Spices
                      </a>
                      <ul>
                          <li>
                              <a href="#">Angelica </a>
                          </li>
                          <li>
                              <a href="#">Anise </a>
                          </li>
                          <li>
                              <a href="#">Asafoetida </a>
                          </li>
                          <li>
                              <a href="#">Bay Leaf </a>
                          </li>
                          <li>
                              <a href="#">Basil </a>
                          </li>

                      </ul>
                  </li> */}
    <li>
      <a href="#">
        Travelling Bags
      </a>
    </li>
    <li>
      <a href="#">
        Student Bags
      </a>
    </li>
    <li>
      <a href="#">
        Kids Bags
      </a>
    </li>
    <li>
      <a href="#">
        Camera Bags
      </a>
    </li>
    <li>
      <a href="#">
        Men Essentials
      </a>
    </li>
    <li>
      <a href="#">
        Women Essentials
      </a>
    </li>
    <li>
      <a href="#">
        Winter Wear
      </a>
    </li>
    <li>
      <a href="#">
        Monsoon Wear
      </a>
    </li>
    <li>
      <a href="#">
        Sports Wear
      </a>
    </li>
    <li>
      <a href="#">
        Gift Articles
      </a>
    </li>
    <li>
      <a href="#">
        Thermoware
      </a>
    </li>
    <li>
      <a href="#">
        Home Appliances
      </a>
    </li>
    <li>
      <a href="#">
        Glassware
      </a>
    </li>
    <li>
      <a href="#">
        Corporate Gifts
      </a>
    </li>
    <li>
      <a href="#">
        Helmet
      </a>
    </li>
    <li>
      <a href="#" className="font-weight-bold  text-uppercase ls-25">
        View All Categories<i className="w-icon-angle-right" />
      </a>
    </li>
  </ul>
</div>

        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default MobileHeader;
