import React, { useEffect, useState } from "react";
import { Col, Row, Pagination } from "react-bootstrap";
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
import CreateCatalogBtn from "../component/CreateCatalogBtn";
import { FiPlus, FiMinus, FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useFilter } from "../component/VerifyEmail";
import { toast, ToastContainer } from "react-toastify";
import { Puff } from "react-loader-spinner";

function valuetext(value) {
  return ${value}°C;
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

  const [expanded, setExpanded] = useState(false);
  const [isCategoryFilter, setIsCategoryFilter] = useState(false);
  const [per_page, setPerPage] = useState(24);
  const [count, setCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // Calculate totalPages based on the count returned from the API
  const totalPages = Math.ceil(count / per_page);

  // Update page number and trigger data fetch
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setPageNo(pageNumber);
  };

  // Function to handle accordion changes
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [isFirstEffectComplete, setIsFirstEffectComplete] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const runSequentially = async () => {
      try {
        setIsLoading(true);
        await handleClean();
        await fetchFilters();
        await fetchData(); // Initial data fetch

        if (filterRange !== 0 && filterRange !== "0") {
          await handleFilterRange();
        } else if (textToFind !== "") {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRange, textToFind]);

  useEffect(() => {
    if (isFirstEffectComplete) {
      HandleFilterCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstEffectComplete, maxVal, filterCategory]);

  useEffect(() => {
    if (isFirstEffectComplete) {
      handleFilterSubCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstEffectComplete, filterSubCategory]);

  // Effect to fetch new data when pageNo changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

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
        ${process.env.REACT_APP_API_URL}/api/auth/list-by-params/product-details-from-frontend,
        {
          match: textToFind,
        }
      );
      if (res.status === 200) {
        setIsLoading(false);
        setProducts(res.data);
        res.data.forEach((item) => {
          handleClick("brands", item.brandName._id);
          handleClick("subcategories", item.subCategoryName._id);
          handleClick("categories", item.categoryName._id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterRange = async () => {
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
      value: [startFilter, numericFilterRange],
    });
  };

  // Modified fetchData to include skip and update total count
  const fetchData = async () => {
    try {
      const skip = (pageNo - 1) * per_page;
      setIsLoading(true);
      const res = await axios.post(
        ${process.env.REACT_APP_API_URL}/api/auth/list/product-details-for-product-list,
        { skip, per_page }
      );
      console.log(res);
      setProducts(res.data.data);
      setAllProduct(res.data.data);
      // Assume the API response contains totalCount representing all available products
      setCount(res.data.totalCount);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (values, check, e) => {
    setIsLoading(true);
    const skip = (pageNo - 1) * per_page;
    values = { ...values, skip, per_page };
    const res = await axios.post(
      ${process.env.REACT_APP_API_URL}/api/auth/list/get-filtered-products,
      values
    );
    console.log("-----------", e);
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
      ${process.env.REACT_APP_API_URL}/api/auth/list/get-filters
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
  const [activeSubCategoriesIndices, setActiveSubCategoriesIndices] = useState([]);
  const [activeBrandIndices, setActiveBrandIndices] = useState([]);

  const handleClick = (e, index, byClick) => {
    let updatedCatIndices = [];
    let updatedSubCatIndices = [];
    let updatedBrandIndices = [];
    if (e === "categories") {
      setIsCategoryFilter(true);
      updatedCatIndices = activeCategoriesIndices.includes(index)
        ? activeCategoriesIndices.filter((i) => i !== index)
        : [...activeCategoriesIndices, index];
      setActiveCategoriesIndices(updatedCatIndices);
    } else if (e === "subcategories") {
      setIsCategoryFilter(false);
      updatedSubCatIndices = activeSubCategoriesIndices.includes(index)
        ? activeSubCategoriesIndices.filter((i) => i !== index)
        : [...activeSubCategoriesIndices, index];
      setActiveSubCategoriesIndices(updatedSubCatIndices);
    } else if (e === "brands") {
      setIsCategoryFilter(false);
      updatedBrandIndices = activeBrandIndices.includes(index)
        ? activeBrandIndices.filter((i) => i !== index)
        : [...activeBrandIndices, index];
      setActiveBrandIndices(updatedBrandIndices);
    }
    if (byClick === true) {
      setFilterCategoryName('');
      setFilterSubCategoryName('');
      setFilterRangeName('');
      handleSubmit(
        {
          activeBrandIndices: updatedBrandIndices,
          activeCategoriesIndices: updatedCatIndices,
          activeSubCategoriesIndices: updatedSubCatIndices,
          value,
        },
        true,
        e
      );
    }
  };

  const handleSortChange = (e) => {
    if (e.target.value === "AZ") {
      const sortedProducts = [...products].sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
      setProducts(sortedProducts);
    }
    if (e.target.value === "ZA") {
      const sortedProducts = [...products].sort((a, b) =>
        b.productName.localeCompare(a.productName)
      );
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
          <Puff color="#a01e20" height={50} width={50} timeout={0} />
        </div>
      ) : (
        <div>
          <ToastContainer />
          <nav className="breadcrumb-nav mb-10">
            <div className="container">
              <ul className="breadcrumb">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="#">Product</a>
                </li>
                {filterCategoryName && (
                  <li>
                    <a href="#">{filterCategoryName}</a>
                  </li>
                )}
                {filterSubCategoryName && (
                  <li>
                    <a href="#">{filterSubCategoryName}</a>
                  </li>
                )}
                {filterRangeName && (
                  <li>
                    <a href="#">{filterRangeName}</a>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          <div className="page-content mb-10">
            <div className="container">
              <Row className="shop-content row gutter-lg">
                <Col xl={3} lg={3} md={12} className="shop-sidebar sticky-sidebar-wrapper sidebar-fixed">
                  {/* Sidebar and filter UI components */}
                </Col>
                <Col xl={9} lg={9} md={12}>
                  <Row>
                    <div className="dis-flex-end sortBy">
                      <ProductInquiry />
                      <div className="toolbox-item toolbox-show select-box" style={{ width: "215px" }}>
                        <label>Sort By :</label>
                        <select name="orderby" className="form-control" onChange={handleSortChange}>
                          <option value="" disabled>
                            Select Sorting type
                          </option>
                          <option value="lowHigh">Price (low to high)</option>
                          <option value="highLow">Price (high to low)</option>
                          <option value="AZ">Sort by A to Z</option>
                          <option value="ZA">Sort by Z to A</option>
                        </select>
                      </div>
                    </div>
                    {loading ? (
                      <div className="loader">Loading...</div>
                    ) : products && products.length > 0 ? (
                      products.map((item, index) => (
                        <Col lg={3} md={4} xs={6} sm={6} key={index}>
                          <div className="item-card product-image-gap">
                            <img src={${process.env.REACT_APP_API_URL}/${item.productImage}} alt="" />
                            <p className="product-name mb-0">
                              <Link to="#">{item.productName}</Link>
                            </p>
                            <p className="product-cat text-center m-1">
                              <Link to="#">{item.brandName.brandName}</Link>
                            </p>
                            <div className="product-single mt-2">
                              <div className="product-price">
                                <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="me-2">
                                  ₹
                                </span>
                                {item.newPrice}
                              </div>
                            </div>
                            <ProductInquiry data={item} />
                          </div>
                        </Col>
                      ))
                    ) : (
                      !loading && (
                        <div className="noProductMainDiv">
                          <div className="noProductTitle">"No Products in this Category"</div>
                        </div>
                      )
                    )}
                  </Row>
                  <Pagination>
                    <Pagination.First className="productListPrevBtn" onClick={() => handlePageChange(1)} />
                    <Pagination.Prev
                      className="productListPrevBtn"
                      onClick={() => handlePageChange(activePage > 1 ? activePage - 1 : activePage)}
                    />
                    {Array.from({ length: totalPages }, (_, index) => (
                      <Pagination.Item
                        style={{ border: "1px solid #ccc" }}
                        key={index + 1}
                        active={index + 1 === activePage}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      className="productListPrevBtn"
                      onClick={() => handlePageChange(activePage < totalPages ? activePage + 1 : activePage)}
                    />
                    <Pagination.Last className="productListPrevBtn" onClick={() => handlePageChange(totalPages)} />
                  </Pagination>
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