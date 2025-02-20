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
import CreateCatalogBtn from "../component/CreateCatalogBtn"
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import { useFilter } from "../component/VerifyEmail";
import { toast, ToastContainer } from "react-toastify";
import { Puff } from "react-loader-spinner";

function valuetext(value) {
  return `${value}°C`;
}

const ProductList = (categoryName) => {
  const {
    FilterLogic,
    textToFind,
    filterRange,
    filterCategory,
    filterSubCategory,
    filterCategoryName,
    setFilterCategoryName,
    filterSubCategoryName,
    setFilterSubCategoryName,
    filterRangeName,
    setFilterRangeName,
    startFilter,
  } = useFilter();
  const [products, setProducts] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [value, setValue] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [expanded, setExpanded] = useState(false); // Track which accordion is expanded
  const [isCategoryFilter, setIsCategoryFilter] = useState(false)
  // Function to handle accordion change
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [isFirstEffectComplete, setIsFirstEffectComplete] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  useEffect(() => {
    const runSequentially = async () => {
      try {
        setIsLoading(true)
        await handleClean();
        await fetchFilters();
        await fetchData();


        if (filterRange != 0 || filterRange != "0") {
          await handleFilterRange();
        } else if (textToFind != "") {
          setActiveBrandIndices([]);

          await fetchBySearch();
        }
        setIsLoading(false);

        setIsFirstEffectComplete(true);
      } catch (error) {
        console.error("Error in the sequence:", error);
      }
    };

    runSequentially();
  }, [filterRange || textToFind]);

  useEffect(() => {
    HandleFilterCategory();
  }, [isFirstEffectComplete, maxVal, filterCategory]);

  useEffect(() => {
    handleFilterSubCategory();
  }, [isFirstEffectComplete, filterSubCategory]);

  const HandleFilterCategory = async () => {
    if (isFirstEffectComplete && filterCategory) {
      return handleSubmit(
        {
          activeBrandIndices: [],
          activeCategoriesIndices: [filterCategory],
          activeSubCategoriesIndices: [],
          value: [minVal, maxVal],
        },
        true
      );
    }
  };

  const handleFilterSubCategory = async () => {
    if (isFirstEffectComplete && filterSubCategory) {
      return handleSubmit(
        {
          activeBrandIndices: [],
          activeCategoriesIndices: [],
          activeSubCategoriesIndices: [filterSubCategory],
          value: [minVal, maxVal],
        },
        true
      );
    }
  };

  const fetchBySearch = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/list-by-params/product-details-from-frontend`,
        { match: textToFind }
      );
      if (res.status === 200) {
        setIsLoading(false);
        setProducts(res.data);
        res.data.forEach((item) => {
          handleClick("brands", item.brandName._id); // Pass true to indicate deselect
          handleClick("subcategories", item.subCategoryName._id); // Pass true to indicate deselect
          handleClick("categories", item.categoryName._id); // Pass true to indicate deselect
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterRange = async () => {
    // await handleClean()
    setActiveBrandIndices([]);
    if (filterRange === "All") return;

    if (filterRange === ">10000") {
      setProducts([]);
      toast.warning("No Product In This Price range");
      return;
    }
    const numericFilterRange = Number(filterRange);

    setValue([startFilter, numericFilterRange]);
    handleSubmit({
      activeBrandIndices: [],
      activeCategoriesIndices: [],
      activeSubCategoriesIndices: [],
      value: [startFilter, numericFilterRange], // Ensure value is correctly passed as numbers
    });
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/list/product-details-for-product-list`
      );

      setProducts(res.data);
      setAllProduct(res.data);
      // setIsLoading(false)
    } catch (Error) {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (values, check, e) => {
    setIsLoading(true);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/list/get-filtered-products`,
      values
    );
    console.log("-----------", e)

    if (res.data.products.length > 0) {
      setIsLoading(false);
      setValue([res.data.products[0].minPrice, res.data.products[0].maxPrice]);

      setProducts(res.data.products[0].products);

      // Accumulate unique indices for brands, categories, and subcategories
      const brandSet = new Set();
      const categorySet = new Set();
      const subCategorySet = new Set();

      res.data.products[0].products.forEach((item) => {
        if (check) {
          brandSet.add(item.brandName._id);
          categorySet.add(item.categoryName._id);
          subCategorySet.add(item.subCategoryName._id);
        } else {
          const brandMatch = values.activeBrandIndices.includes(
            item.brandName._id
          );
          const subCategoryMatch = values.activeSubCategoriesIndices.includes(
            item.subCategoryName._id
          );
          const categoryMatch = values.activeCategoriesIndices.includes(
            item.categoryName._id
          );

          if (!brandMatch) brandSet.add(item.brandName._id);
          if (!subCategoryMatch) subCategorySet.add(item.subCategoryName._id);
          if (!categoryMatch) categorySet.add(item.categoryName._id);
        }
      });
      // if(e && e==="categories")
      // {
      //   console.log(Array.from(brandSet))
      //   setBrands(Array.from(brandSet))
      //   setSubcategories(Array.from(subCategorySet))
      // }
      setActiveBrandIndices(Array.from(brandSet));
      setActiveCategoriesIndices(Array.from(categorySet));
      setActiveSubCategoriesIndices(Array.from(subCategorySet));
    } else {
      setIsLoading(false);
      setProducts([]);
      setValue([0, 0]);

    }
  };

  const fetchFilters = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/list/get-filters`
    );
    setFilters(res.data[0]);
    setSubcategories(res.data[0].subCategories);
    setCategories(res.data[0].categories);
    setBrands(res.data[0].brands);
    const minPrice = Math.min(...res.data[0].uniquePrices);
    const maxPrice = Math.max(...res.data[0].uniquePrices);
    setMaxVal(maxPrice);
    setMinVal(minPrice);
    setValue([minPrice, maxPrice]);

    setIsLoading(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [show, setShow] = useState(false);
  const [activeCategoriesIndices, setActiveCategoriesIndices] = useState([]);
  const [activeSubCategoriesIndices, setActiveSubCategoriesIndices] = useState(
    []
  );
  const [activeBrandIndices, setActiveBrandIndices] = useState([]);
  const handleClick = (e, index, byClick) => {

    console.log("--------------------------------")
    let updatedCatIndices = [];
    let updatedSubCatIndices = [];
    let updatedBrandIndices = [];
    if (e === "categories") {
      setIsCategoryFilter(true)
      updatedCatIndices = activeCategoriesIndices.includes(index)
        ? activeCategoriesIndices.filter((i) => i !== index)
        : [...activeCategoriesIndices, index];
      setActiveCategoriesIndices(updatedCatIndices);
    } else if (e === "subcategories") {
      setIsCategoryFilter(false)
      updatedSubCatIndices = activeSubCategoriesIndices.includes(index)
        ? activeSubCategoriesIndices.filter((i) => i !== index)
        : [...activeSubCategoriesIndices, index];
      setActiveSubCategoriesIndices(updatedSubCatIndices);
    } else if (e === "brands") {
      setIsCategoryFilter(false)
      updatedBrandIndices = activeBrandIndices.includes(index)
        ? activeBrandIndices.filter((i) => i !== index)
        : [...activeBrandIndices, index];
      setActiveBrandIndices(updatedBrandIndices);
    }

    if (byClick === true) {
      setFilterCategoryName('')
      setFilterSubCategoryName('')
      setFilterRangeName('')
      handleSubmit(
        {
          activeBrandIndices: updatedBrandIndices,
          activeCategoriesIndices: updatedCatIndices,
          activeSubCategoriesIndices: updatedSubCatIndices,
          value,
        },
        true, e
      );
    }
  };

  const handleSortChange = (e) => {
    if (e.target.value === "AZ") {
      const sortedProducts = [...products].sort((a, b) => {
        return a.productName.localeCompare(b.productName);
      });

      setProducts(sortedProducts);
    }
    if (e.target.value === "ZA") {
      const sortedProducts = [...products].sort((a, b) => {
        return b.productName.localeCompare(a.productName);
      });

      setProducts(sortedProducts);
    }
    if (e.target.value === "lowHigh") {
      const sortedProducts = [...products].sort(
        (a, b) => a.newPrice - b.newPrice
      );

      setProducts(sortedProducts);
    }
    if (e.target.value === "highLow") {
      const sortedProducts = [...products].sort(
        (a, b) => b.newPrice - a.newPrice
      );

      setProducts(sortedProducts);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClean = async () => {
    setValue([minVal, maxVal]);
    setProducts(allProduct);
    setActiveCategoriesIndices([]);
    setActiveSubCategoriesIndices([]);
    setActiveBrandIndices([]);
  };
  useEffect(() => {
    const delay = 1000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Puff
            color="#a01e20"
            height={50}
            width={50}
            timeout={0}
          />
        </div>
      ) : (
        <div>
          <ToastContainer />
          <nav class="breadcrumb-nav mb-10">
            <div class="container">
              <ul class="breadcrumb">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="#">Product</a>
                </li>
                {filterCategoryName && <li>
                  <a href="#">{filterCategoryName}</a>
                </li>}
                {filterSubCategoryName && <li>
                  <a href="#">{filterSubCategoryName}</a>
                </li>}
                {filterRangeName && <li>
                  <a href="#">{filterRangeName}</a>
                </li>}
              </ul>
            </div>
          </nav>

          <div className="page-content mb-10">
            <div className="container">
              <Row className="shop-content row gutter-lg">
                <Col
                  xl={3}
                  lg={3}
                  md={12}
                  className="shop-sidebar sticky-sidebar-wrapper sidebar-fixed"
                >
                  <div className="sticky-sidebar">
                    <div class="filter-actions">
                      <label>Filter :</label>

                      <button
                        onClick={() => {
                          handleClean();
                          setFilterCategoryName('')
                          setFilterSubCategoryName('')
                          setFilterRangeName('')
                          setIsCategoryFilter(false)
                        }}
                        class="btn btn-dark btn-link filter-clean"
                      >
                        Clean All
                      </button>
                    </div>
                    {isMobile ? (
                      <div >
                        <div className="d-flex justify-content-start">
                          <div className="filterDiv" onClick={() => setShow(!show)}>
                            <FiFilter />
                          </div>
                        </div>
                        {show && (
                          <div>
                            <Typography>
                              <h3 className="widget collapsed  text-start price-range-border">
                                <span className="widget-title">Price Range</span>
                              </h3>
                            </Typography>
                            <Accordion>
                              <AccordionDetails>
                                <Box>
                                  <div className="d-flex align-item-center justify-content-between">
                                    <div className="maxMinDiv">
                                      <p className="mb-0-p " style={{ textAlign: "start" }}>
                                        Min
                                      </p>
                                      <div className="d-flex justify-content-center range-box">
                                        <p className="mb-0-p">{value[0]}</p>
                                      </div>
                                    </div>
                                    <div className="maxMinDiv">
                                      <p className="mb-0-p" style={{ textAlign: "start" }}>
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
                                  <button
                                    className="filter-btn"
                                    onClick={() => {
                                      setFilterCategoryName('')
                                      setFilterSubCategoryName('')
                                      setFilterRangeName('')
                                      handleSubmit({
                                        activeBrandIndices,
                                        activeCategoriesIndices,
                                        activeSubCategoriesIndices,
                                        value,
                                      }
                                        , true)
                                    }
                                    }
                                    type="button"
                                  >
                                    Apply Now
                                  </button>
                                </Box>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion
                              expanded={expanded === "brands"}
                              onChange={handleAccordionChange("brands")}
                              className="widget new border-0"
                            >
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
                                    {expanded === "brands" ? <FiMinus /> : <FiPlus />}{" "}

                                  </p>
                                }
                                aria-controls="panel3-content"
                                id="panel3-header"
                              >
                                <Typography>
                                  <h3 className="widget-title collapsed">
                                    <span> Brands</span>
                                  </h3>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <ul className="widget-body filter-items item-check brandCard">
                                  {brands.map((item, index) => (
                                    <li
                                      key={index}
                                      name="brands"
                                      className={
                                        activeBrandIndices.includes(item._id)
                                          ? "active"
                                          : "inactive"
                                      }
                                      onClick={(e) => handleClick("brands", item._id, true)}
                                    >
                                      <p className="p-0 text-left mb-1">
                                        {item.brandName}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion
                              expanded={expanded === "subCategories"}
                              onChange={handleAccordionChange("subCategories")}
                              className="widget new border-0"
                            >
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
                                    {expanded === "subCategories" ? (
                                      <FiMinus />
                                    ) : (
                                      <FiPlus />
                                    )}{" "}

                                  </p>
                                }
                                aria-controls="panel2-content"
                                id="panel2-header"
                              >
                                <Typography>
                                  <h3 className="widget-title collapsed">
                                    <span> Sub Categories</span>
                                  </h3>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <ul className="widget-body filter-items item-check brandCard">
                                  {subCategories.map((item, index) => (
                                    <li
                                      key={index}
                                      name="subcategories"
                                      className={
                                        activeSubCategoriesIndices.includes(item._id)
                                          ? "active"
                                          : "inactive"
                                      }
                                      onClick={(e) =>
                                        handleClick("subcategories", item._id, true)
                                      }
                                    >
                                      <p className="p-0 text-left mb-1">
                                        {item.subCategoryName}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion
                              expanded={expanded === "categories"}
                              onChange={handleAccordionChange("categories")}
                              className="widget new border-0"
                            >
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
                                    {expanded === "categories" ? <FiMinus /> : <FiPlus />}{" "}

                                  </p>
                                }
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                <Typography>
                                  <h3 className="widget-title collapsed">
                                    <span>All Categories</span>
                                  </h3>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <ul className="widget-body filter-items item-check brandCard">
                                  {categories.map((item, index) => (
                                    <li
                                      key={index}
                                      id="categories"
                                      className={
                                        activeCategoriesIndices.includes(item._id)
                                          ? "active"
                                          : "inactive"
                                      }
                                      onClick={(e) => {
                                        console.log("megha")
                                        handleClick("categories", item._id, true)
                                      }}
                                    >
                                      <p className="p-0 text-left mb-1">
                                        {item.categoryName}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionDetails>
                            </Accordion>






                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <Typography>
                          <h3 className="widget collapsed  text-start price-range-border">
                            <span className="widget-title">Price Range</span>
                          </h3>
                        </Typography>
                        <Accordion>
                          <AccordionDetails>
                            <Box>
                              <div className="d-flex align-item-center justify-content-between">
                                <div className="maxMinDiv">
                                  <p className="mb-0-p " style={{ textAlign: "start" }}>
                                    Min
                                  </p>
                                  <div className="d-flex justify-content-center range-box">
                                    <p className="mb-0-p">{value[0]}</p>
                                  </div>
                                </div>
                                <div className="maxMinDiv">
                                  <p className="mb-0-p" style={{ textAlign: "start" }}>
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
                              <button
                                className="filter-btn"
                                onClick={() =>
                                  handleSubmit({
                                    activeBrandIndices,
                                    activeCategoriesIndices,
                                    activeSubCategoriesIndices,
                                    value,
                                  }
                                    , true)
                                }
                                type="button"
                              >
                                Apply Now
                              </button>
                            </Box>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion
                          expanded={expanded === "brands"}
                          onChange={handleAccordionChange("brands")}
                          className="widget new border-0"
                        >
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
                                {expanded === "brands" ? <FiMinus /> : <FiPlus />}{" "}

                              </p>
                            }
                            aria-controls="panel3-content"
                            id="panel3-header"
                          >
                            <Typography>
                              <h3 className="widget-title collapsed">
                                <span> Brands</span>
                              </h3>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <ul className="widget-body filter-items item-check brandCard">
                              {brands
                                ?.filter((item) => !isCategoryFilter || activeBrandIndices.includes(item._id)) // Only include active brands if isCategoryFilter is true
                                .map((item, index) => (
                                  <li
                                    key={index}
                                    name="brands"
                                    className={
                                      activeBrandIndices.includes(item._id) ? "active" : "inactive"
                                    }
                                    onClick={(e) => handleClick("brands", item._id, true)}
                                  >
                                    <p className="p-0 text-left mb-1">{item.brandName}</p>
                                  </li>
                                ))}

                            </ul>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion
                          expanded={expanded === "subCategories"}
                          onChange={handleAccordionChange("subCategories")}
                          className="widget new border-0"
                        >
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
                                {expanded === "subCategories" ? (
                                  <FiMinus />
                                ) : (
                                  <FiPlus />
                                )}{" "}

                              </p>
                            }
                            aria-controls="panel2-content"
                            id="panel2-header"
                          >
                            <Typography>
                              <h3 className="widget-title collapsed">
                                <span> Sub Categories</span>
                              </h3>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <ul className="widget-body filter-items item-check brandCard">
                              {subCategories
                                ?.filter((item) => !isCategoryFilter || activeSubCategoriesIndices.includes(item._id)) // Filter based on isCategoryFilter
                                .map((item, index) => (
                                  <li
                                    key={index}
                                    name="subcategories"
                                    className={
                                      activeSubCategoriesIndices.includes(item._id) ? "active" : "inactive"
                                    }
                                    onClick={(e) => handleClick("subcategories", item._id, true)}
                                  >
                                    <p className="p-0 text-left mb-1">{item.subCategoryName}</p>
                                  </li>
                                ))}

                            </ul>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion
                          expanded={expanded === "categories"}
                          onChange={handleAccordionChange("categories")}
                          className="widget new border-0"
                        >
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
                                {expanded === "categories" ? <FiMinus /> : <FiPlus />}{" "}

                              </p>
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                          >
                            <Typography>
                              <h3 className="widget-title collapsed">
                                <span>All Categories</span>
                              </h3>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <ul className="widget-body filter-items item-check brandCard">
                              {categories.map((item, index) => (
                                <li
                                  key={index}
                                  id="categories"
                                  className={
                                    activeCategoriesIndices.includes(item._id)
                                      ? "active"
                                      : "inactive"
                                  }
                                  onClick={(e) => handleClick("categories", item._id, true)}
                                >
                                  <p className="p-0 text-left mb-1">
                                    {item.categoryName}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </AccordionDetails>
                        </Accordion>






                      </div>
                    )}

                  </div>
                </Col>
                <Col xl={9} lg={9} md={12}>
                  <Row>
                    <div className="dis-flex-end sortBy">
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
                          <option value="" disabled>Select Sorting type</option>

                          <option value="lowHigh">Price (low to high)</option>
                          <option value="highLow">Price (high to low)</option>
                          <option value="AZ">Sort by A to Z</option>
                          <option value="ZA">Sort by Z to A</option>
                        </select>
                      </div>
                    </div>
                    {loading ? (
                      // Show loader when loading is true
                      <div className="loader">Loading...</div>
                    ) : products && products.length > 0 ? (
                      // If loading is false and products exist, display the product list
                      products.map((items, index) => (
                        <Col lg={3} md={4} xs={6} sm={6} key={index}>
                          <div className="item-card product-image-gap">
                            <img
                              src={`${process.env.REACT_APP_API_URL}/${items.productImage}`}
                              alt=""
                            />
                            <p className="product-name mb-0">
                              <Link to="#">{items.productName}</Link>
                            </p>
                            <p className="product-cat text-center m-1">
                              <Link to="#">{items.brandName.brandName}</Link>
                            </p>

                            <div className="product-single mt-2">
                              <div className="product-price">
                                <span
                                  style={{
                                    fontFamily: "Arial, Helvetica, sans-serif",
                                  }}
                                  className="me-2"
                                >
                                  ₹
                                </span>
                                {items.newPrice}

                                <br />
                              </div>
                            </div>

                            <ProductInquiry data={items} />
                          </div>
                        </Col>
                      ))
                    ) : (
                      !loading && (

                        <div className="noProductMainDiv">
                          <div className="noProductTitle">
                            "No Products in this Category"
                          </div>
                        </div>
                      )
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
            <CreateCatalogBtn />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
