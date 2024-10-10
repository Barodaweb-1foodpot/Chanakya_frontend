import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import FilterSec from "../component/FilterSec";
import img1 from "../assets/images/home/products/p-01.jpg";
import "../assets/css/productlist.css";
import ProductCard from "../component/ProductCard";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ProductInquiry from "../component/ProductInquiry";

function valuetext(value) {
  return `${value}°C`;
}

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [value, setValue] = useState([]);

  const [filters, setFilters] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/list/product-details`
    );

    console.log(res);
    setProducts(res.data);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/list/get-filtered-products`,
      values
    );
    if (res.data.products.length > 0) {
      console.log(res.data.products[0]);
      setProducts(res.data.products[0].products);
      setBrands(res.data.products[0].uniqueBrandDetails);
    } else {
      setProducts([]);
    }
  };

  const fetchFilters = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/list/get-filters`
    );
    console.log(res.data[0]);
    setFilters(res.data[0]);
    setSubcategories(res.data[0].subCategories);
    setCategories(res.data[0].categories);
    setBrands(res.data[0].brands);
    const minPrice = Math.min(...res.data[0].uniquePrices);
    const maxPrice = Math.max(...res.data[0].uniquePrices);
    setMaxVal(maxPrice);
    setMinVal(minPrice);
    setValue([minPrice, maxPrice]);

    console.log(`Min price: ${minPrice}`); // Min price: 111
    console.log(`Max price: ${maxPrice}`); // Max price: 1999
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [activeCategoriesIndices, setActiveCategoriesIndices] = useState([]);
  const [activeSubCategoriesIndices, setActiveSubCategoriesIndices] = useState(
    []
  );
  const [activeBrandIndices, setActiveBrandIndices] = useState([]);
  const handleClick = (e, index) => {
    console.log(e);
    if (e === "categories") {
      setActiveCategoriesIndices((prevIndices) => {
        if (prevIndices.includes(index)) {
          return prevIndices.filter((i) => i !== index);
        } else {
          return [...prevIndices, index];
        }
      });
    } else if (e === "subcategories") {
      setActiveSubCategoriesIndices((prevIndices) => {
        if (prevIndices.includes(index)) {
          return prevIndices.filter((i) => i !== index);
        } else {
          return [...prevIndices, index];
        }
      });
    } else if (e === "brands") {
      setActiveBrandIndices((prevIndices) => {
        if (prevIndices.includes(index)) {
          return prevIndices.filter((i) => i !== index);
        } else {
          return [...prevIndices, index];
        }
      });
    }
  };

  const handleSortChange = (e) => {
    console.log(e.target);
    if (e.target.value === "AZ") {
      // Assuming products is an array of objects with productName field
      const sortedProducts = [...products].sort((a, b) => {
        return a.productName.localeCompare(b.productName); // Sorts alphabetically (A-Z)
      });

      setProducts(sortedProducts); // Assuming setProducts is the state updater function
    }
    if (e.target.value === "ZA") {
      // Assuming products is an array of objects with productName field
      const sortedProducts = [...products].sort((a, b) => {
        return b.productName.localeCompare(a.productName); // Sorts alphabetically (A-Z)
      });

      setProducts(sortedProducts); // Assuming setProducts is the state updater function
    }
    if (e.target.value === "newPrice") {
      // Assuming products is an array of objects with a price field
      const sortedProducts = [...products].sort(
        (a, b) => a.newPrice - b.newPrice
      ); // Sorts by price (low to high)

      setProducts(sortedProducts); // Assuming setProducts is the state updater function
    }
  };

  return (
    <>
      <nav class="breadcrumb-nav mb-10">
        <div class="container">
          <ul class="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">Product</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="page-content mb-10">
        <div className="container">
          <Row className="shop-content row gutter-lg">
            <Col
              xl={2}
              lg={3}
              md={12}
              className="shop-sidebar sticky-sidebar-wrapper sidebar-fixed"
            >
              <div className="sticky-sidebar">
                <div class="filter-actions">
                  <label>Filter :</label>
                  <a href="#" class="btn btn-dark btn-link filter-clean">
                    Clean All
                  </a>
                </div>

                <div>
                  <Accordion className="widget new border-0">
                    <AccordionSummary
                      expandIcon={
                        <p
                          style={{
                            marginBottom: "0px",
                            fontSize: "24px",
                            fontWeight: "bolder",
                            color: "rgb(58, 58, 58)",
                          }}
                        >
                          <ArrowDownwardIcon />
                        </p>
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>
                        <p
                          className="widget-title"
                          style={{
                            marginBottom: "0px",
                            fontSize: "18px",
                            fontWeight: "bolder",
                            color: "rgb(58, 58, 58)",
                          }}
                        >
                          Categories
                        </p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul class="widget-body filter-items item-check brandCard">
                        {categories.map((item, index) => {
                          return (
                            <li
                              key={index}
                              id="categories"
                              className={
                                activeCategoriesIndices.includes(item._id)
                                  ? "active"
                                  : "inactive"
                              }
                              onClick={(e) =>
                                handleClick("categories", item._id)
                              }
                            >
                              <p className="p-0 text-left mb-1">
                                {item.categoryName}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="widget new border-0">
                    <AccordionSummary
                      expandIcon={
                        <p
                          style={{
                            marginBottom: "0px",
                            fontSize: "24px",
                            fontWeight: "bolder",
                            color: "rgb(58, 58, 58)",
                          }}
                        >
                          <ArrowDownwardIcon />
                        </p>
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>
                        <p
                          className="widget-title"
                          style={{
                            marginBottom: "0px",
                            fontSize: "18px",
                            fontWeight: "bolder",
                            color: "rgb(58, 58, 58)",
                          }}
                        >
                          Sub Categories
                        </p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul class="widget-body filter-items item-check brandCard">
                        {subCategories.map((item, index) => {
                          return (
                            <li
                              key={index}
                              name="subcategories"
                              className={
                                activeSubCategoriesIndices.includes(item._id)
                                  ? "active"
                                  : "inactive"
                              }
                              onClick={(e) =>
                                handleClick("subcategories", item._id)
                              }
                            >
                              <p className="p-0 text-left mb-1">
                                {item.subCategoryName}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="widget new border-0">
                    <AccordionSummary
                      expandIcon={
                        <p
                          style={{
                            marginBottom: "0px",
                            fontSize: "24px",
                            fontWeight: "bolder",
                            color: "rgb(58, 58, 58)",
                          }}
                        >
                          <ArrowDownwardIcon />
                        </p>
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>
                        <p
                          className="widget-title"
                          style={{
                            marginBottom: "0px",
                            fontSize: "18px",
                            fontWeight: "bolder",
                            color: "rgb(58, 58, 58)",
                          }}
                        >
                          Brands
                        </p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul class="widget-body filter-items item-check brandCard">
                        {brands.map((item, index) => {
                          return (
                            <li
                              key={index}
                              name="brands"
                              className={
                                activeBrandIndices.includes(item._id)
                                  ? "active"
                                  : "inactive"
                              }
                              onClick={(e) => handleClick("brands", item._id)}
                            >
                              <p className="p-0 text-left mb-1">
                                {item.brandName}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionDetails>
                      <Box>
                        <div className="d-flex align-item-center justify-content-between">
                          <div>
                            <p
                              className="mb-0-p "
                              style={{ textAlign: "start" }}
                            >
                              Min
                            </p>
                            <div className="d-flex justify-content-center range-box">
                              <p className="mb-0-p">{value[0]}</p>
                            </div>
                          </div>

                          <div>
                            <p
                              className="mb-0-p"
                              style={{ textAlign: "start" }}
                            >
                              Max
                            </p>
                            <div className="d-flex justify-content-center range-box">
                              <p className="mb-0-p">{value[1]}</p>
                            </div>
                          </div>
                        </div>

                        <Slider
                          getAriaLabel={() => "Temperature range"}
                          min={minVal}
                          max={maxVal}
                          value={value}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                          sx={{
                            color: "#1976d2",
                            "& .MuiSlider-thumb": {
                              backgroundColor: "#a01e20",
                            },
                            "& .MuiSlider-track": {
                              backgroundColor: "#a01e20",
                              border: "1px solid #a01e20",
                            },
                            "& .MuiSlider-rail": {
                              backgroundColor: "#a01e20",
                            },
                          }}
                        />
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <button
                    className="filter-btn"
                    onClick={() =>
                      handleSubmit({
                        activeBrandIndices,
                        activeCategoriesIndices,
                        activeSubCategoriesIndices,
                        value,
                      })
                    }
                    type="button"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </Col>
            <Col xl={10} lg={9} md={12}>
              <Row>
                <div className="dis-flex-end">
                  <ProductInquiry />
                  <div
                    class="toolbox-item toolbox-show select-box"
                    style={{ width: "215px" }}
                  >
                    <label>Sort By :</label>
                    <select
                      name="orderby"
                      class="form-control"
                      onChange={handleSortChange}
                    >
                      <option value="newPrice" selected="selected">
                        price
                      </option>
                      <option value="AZ">Sort by A to Z</option>
                      <option value="ZA">Sort by Z to A</option>
                    </select>
                  </div>
                </div>
                {products.length > 0
                  ? products.map((items, index) => {
                      return (
                        <Col lg={3} md={4} sm={6} key={index}>
                          <div className="item-card">
                            <img
                              src={`${process.env.REACT_APP_API_URL}/${items.productImage}`}
                              alt=""
                            />
                            <p>{items.productName}</p>
                            <p>{items.brandName.brandName}</p>
                            {/* <div className='item-card-hov'>
                            <i className="w-icon-cart"></i>
                            <p>Add To Inquiry</p>
                          </div> */}
                            <ProductInquiry  data ={items}/>
                          </div>
                        </Col>
                      );
                    })
                  : "No Products in this filter"}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ProductList;
