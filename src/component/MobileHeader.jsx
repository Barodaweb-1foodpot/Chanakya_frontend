import React, { useState, useEffect } from "react";
import { Offcanvas, Navbar } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFilter } from "./VerifyEmail";
import axios from "axios";

const MobileHeader = () => {
  const [show, setShow] = useState(false); // State to toggle the offcanvas
  const { handleFilterCategory } = useFilter()
  const { FilterLogic, searchText, handleKeyDown, setSearchText, handleSearchClick, handleInputChange, setFilterRange } = useFilter()

  const handleClose = () => setShow(false); // Close the offcanvas
  const handleShow = () => setShow(true);   // Show the offcanvas
  const [CategoryData, setCategoryData] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(10); // Limit number of categories shown initially

  const fetchData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/list/CategoryMaster`
    )
    setCategoryData(res.data)
    console.log(res)
  };

  useEffect(() => {
    setFilterRange(0)
    setSearchText("")
    fetchData();
  }, []);

  // Handler to show more categories
  const handleViewMore = () => {
    setDisplayLimit(CategoryData.length); // Show all categories
  };

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
            <div className="mobileSearchDiv">
              <input 
                type="text" 
                className="form-control" 
                name="search"
                id="search"
                value={searchText && searchText}
                onChange={(e) => {
                  handleInputChange(e.target.value);
                }} // Updating searchText on change
                onKeyDown={(e) => {
                  handleKeyDown(e);
                  if (e.key === 'Enter') {
                    handleClose();
                  }
                }} // Listening for Enter key press
                autoComplete="off" 
                placeholder="Search" 
                required 
              />
              <button 
                className="btn btn-search searchBtn" 
                type="button" 
                onClick={() => {
                  handleSearchClick();
                  handleClose();
                }}>
                <i className="w-icon-search" />
              </button>
            </div>
          </form>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <div className="tab">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <Link to="/category" className="nav-link">Categories</Link>
              </li>
            </ul>
          </div>

          <div className="tab-pane active" id="categories">
            <ul className="mobile-menu">
              {CategoryData && CategoryData.length > 0 && CategoryData.slice(0, displayLimit).map((category, index) => (
                <li key={index}>
                  <Link to="/product-list" onClick={() => { handleFilterCategory(category._id) }}>
                    {category.categoryName}
                  </Link>
                </li>
              ))}
           
            
              <li>
                <a  href="/category" className="font-weight-bold text-uppercase ls-25">
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
