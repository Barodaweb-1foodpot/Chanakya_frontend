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

import { FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useFilter } from "../component/VerifyEmail";
import { toast, ToastContainer } from "react-toastify";
import { Puff } from "react-loader-spinner";



function valuetext(value) {
  return `${value}°C`;
}

const ProductList = () => {
  const { FilterLogic, textToFind, filterRange, filterCategory, filterSubCategory } = useFilter()
  const [products, setProducts] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [value, setValue] = useState([]);
  const [allProduct, setAllProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [loading, setLoading] = useState(false)

  const [expanded, setExpanded] = useState(false); // Track which accordion is expanded

  // Function to handle accordion change
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [isFirstEffectComplete, setIsFirstEffectComplete] = useState(false);


  useEffect(() => {

    const runSequentially = async () => {
      try {
        // First, call fetchFilters

        // Finally, call handleFilterRange after fetchData is done
        await handleClean()
        await fetchFilters();

        // Then, call fetchData after fetchFilters is done
        await fetchData();

        console.log("mmm")
        // setLoading(true)

        if (filterRange != 0 || filterRange != '0') {
          await handleFilterRange()
        }

        else if (textToFind != '') {
          setActiveBrandIndices([])

          await fetchBySearch()
        }
        console.log("lll")
        setLoading(false)

        setIsFirstEffectComplete(true);
      } catch (error) {
        console.error("Error in the sequence:", error);
      }
    };

    runSequentially();
  }, [filterRange || textToFind]); // If you want this to rerun on filterRange changes


  useEffect(() => {
    // This effect runs only if the first effect has completed
    HandleFilterCategory()
  }, [isFirstEffectComplete, maxVal, filterCategory]); // Depend on isFirstEffectComplete, maxVal, and filterCategory

  useEffect(() => {
    // This effect runs only if the first effect has completed
    handleFilterSubCategory()
  }, [isFirstEffectComplete, filterSubCategory]); // Depend on isFirstEffectComplete, maxVal, and filterCategory

  const HandleFilterCategory = async () => {
    if (isFirstEffectComplete && filterCategory) {
      console.log(maxVal)
      return handleSubmit({
        activeBrandIndices: [],
        activeCategoriesIndices: [filterCategory],
        activeSubCategoriesIndices: [],
        value: [minVal, maxVal], // Ensure value is correctly passed as numbers
      }, true);
    }
  }

  const handleFilterSubCategory = async () => {
    if (isFirstEffectComplete && filterSubCategory) {
      console.log(maxVal)
      return handleSubmit({
        activeBrandIndices: [],
        activeCategoriesIndices: [],
        activeSubCategoriesIndices: [filterSubCategory],
        value: [minVal, maxVal], // Ensure value is correctly passed as numbers
      }, true);
    }
  }


  const fetchBySearch = async () => {
    try {
      setLoading(true)
      const res = await axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/auth/list-by-params/product-details-from-frontend`,
          { match: textToFind }
        )
      console.log(res)
      if (res.status === 200) {
        setLoading(false)
        setProducts(res.data);
        console.log(activeBrandIndices)
        res.data.forEach((item) => {

          handleClick("brands", item.brandName._id); // Pass true to indicate deselect
          handleClick("subcategories", item.subCategoryName._id); // Pass true to indicate deselect
          handleClick("categories", item.categoryName._id); // Pass true to indicate deselect

        });
        // res.data.map((item) => {
        //   handleClick("brands", item.brandName)
        //   handleClick("subcategories", item.subCategoryName)
        //   handleClick("categories", item.categoryName)
        // })

      }
    }
    catch (error) {
      console.log(error)
    }

  }


  const handleFilterRange = async () => {
    // await handleClean()
    setActiveBrandIndices([])
    if (filterRange === "All") return

    if (filterRange === ">5000") {
      console.log("maxVal", maxVal)
      setProducts([])
      toast.warning("No Product In This Price range")
      return
    }
    const numericFilterRange = Number(filterRange);
    console.log("filterRange", [minVal, numericFilterRange]);

    setValue([minVal, numericFilterRange]);
    handleSubmit({
      activeBrandIndices: [],
      activeCategoriesIndices: [],
      activeSubCategoriesIndices: [],
      value: [minVal, numericFilterRange], // Ensure value is correctly passed as numbers
    });
  };


  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/list/product-details`
      );


      console.log(res);
      setProducts(res.data);
      setAllProduct(res.data)
      // setLoading(false)
    }
    catch (Error) {
      console.log(Error)
      setLoading(false)
    }

  };

  const handleSubmit = async (values, check) => {
    console.log(values);
    setLoading(true)
    console.log(activeBrandIndices)
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/list/get-filtered-products`,
      values
    );
    console.log(res.data.products)
    if (res.data.products.length > 0) {
      setLoading(false)
      // console.log(res.data.products[0]);
      setProducts(res.data.products[0].products);
      console.log(res.data.products[0].products)
      // setBrands(res.data.products[0].uniqueBrandDetails);
      res.data.products[0].products.forEach((item) => {
        // Check if the item brand, subcategory, and category are active

        console.log(values)
        if (check) {
          handleClick("brands", item.brandName._id);
          handleClick("subcategories", item.subCategoryName._id)
          handleClick("categories", item.categoryName._id);
          return
        }
        else {
          const brandMatch = values.activeBrandIndices.length > 0 && values.activeBrandIndices.includes(item.brandName._id);
          const subCategoryMatch = values.activeSubCategoriesIndices.includes(item.subCategoryName._id);
          const categoryMatch = values.activeCategoriesIndices.includes(item.categoryName._id);
          // If they do not match, handle the click to deselect
          if (!brandMatch) {
            handleClick("brands", item.brandName._id); // Pass true to indicate deselect
          }
          if (!subCategoryMatch) {
            handleClick("subcategories", item.subCategoryName._id); // Pass true to indicate deselect
          }
          if (!categoryMatch) {
            handleClick("categories", item.categoryName._id); // Pass true to indicate deselect
          }
        }
      });

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
    console.log(filterRange)
    setLoading(true)

  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(newValue)
  };

  const [activeCategoriesIndices, setActiveCategoriesIndices] = useState([]);
  const [activeSubCategoriesIndices, setActiveSubCategoriesIndices] = useState([]);
  const [activeBrandIndices, setActiveBrandIndices] = useState([]);
  const handleClick = (e, index) => {
    // console.log(index);
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
    if (e.target.value === "lowHigh") {
      // Assuming products is an array of objects with a price field
      const sortedProducts = [...products].sort(
        (a, b) => a.newPrice - b.newPrice
      ); // Sorts by price (low to high)

      setProducts(sortedProducts); // Assuming setProducts is the state updater function
    }
    if (e.target.value === "highLow") {
      // Assuming products is an array of objects with a price field
      const sortedProducts = [...products].sort(
        (a, b) => b.newPrice - a.newPrice
      ); // Sorts by price (low to high)

      setProducts(sortedProducts); // Assuming setProducts is the state updater function
    }
  };

  const handleClean = async () => {
    console.log("object")
    setValue([minVal, maxVal]);
    setProducts(allProduct)
    setActiveCategoriesIndices([])
    setActiveSubCategoriesIndices([])
    setActiveBrandIndices([])
  }
  useEffect(() => {
    // Simulate a delay of 2 seconds (adjust as needed)
    const delay = 1000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []);

  return (
    <>
         {isLoading ? (
        // Loader component while loading
        <div className="loader-container">
          <Puff
            color="#a01e20"
            height={50}
            width={50}
            timeout={0} // 0 means no timeout, loader will be displayed until setIsLoading(false) is called
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
                  <button onClick={() => { handleClean() }} class="btn btn-dark btn-link filter-clean">
                    Clean All
                  </button>
                </div>

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
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  {/* Brands Accordion */}
                  <Accordion
                    expanded={expanded === "brands"} // Open only if expanded is set to "brands"
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
                          {/* Toggle plus and minus */}
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
                            onClick={(e) => handleClick("brands", item._id)}
                          >
                            <p className="p-0 text-left mb-1">
                              {item.brandName}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                  {/* Sub Categories Accordion */}
                  <Accordion
                    expanded={expanded === "subCategories"} // Open only if expanded is set to "subCategories"
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
                          {/* Toggle plus and minus */}
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
                              handleClick("subcategories", item._id)
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
                    expanded={expanded === "categories"} // Open only if expanded is set to "categories"
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
                          {/* Toggle plus and minus */}
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
                            onClick={(e) => handleClick("categories", item._id)}
                          >
                            <p className="p-0 text-left mb-1">
                              {item.categoryName}
                            </p>
                          </li>
                        ))}
                      </ul>
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
                      <option value="lowHigh" >
                        Price (low to high)
                      </option>
                      <option value="highLow" >
                        Price (high to low)
                      </option>
                      <option value="AZ">Sort by A to Z</option>
                      <option value="ZA">Sort by Z to A</option>
                    </select>
                  </div>
                </div>
                {loading ? (
                  // Show loader when loading is true
                  <div className="loader">Loading...</div>
                ) : products && products.length > 0  ? (
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
                        <p className="product-cat text-center mt-2">
                          <Link to="#">{items.brandName.brandName}</Link>
                        </p>
                        {/* <div className='item-card-hov'>
          <i className="w-icon-cart"></i>
          <p>Add To Inquiry</p>
        </div> */}
                        <ProductInquiry data={items} />
                      </div>
                    </Col>
                  ))
                ) : !loading &&
                  // If no products exist, show "No Products in this filter"
                  <div className="noProductMainDiv">
                    <div className="noProductTitle">
                      "No Products in this filter"
                    </div>
                  </div>
                }

              </Row>
            </Col>
          </Row>
        </div>
      </div>
      </div>
       )}
    </>
  );
};

export default ProductList;
