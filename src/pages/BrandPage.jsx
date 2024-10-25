import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import Img1 from "../assets/images/brands/category/2.png"
import { FaFilePdf } from "react-icons/fa";
import axios from 'axios';
import { Button } from 'reactstrap';
import { Puff } from 'react-loader-spinner';

const BrandPage = () => {
  // State for toggling accordion sections
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams()

  useEffect(() => {
    console.log(id)
    fetchData(id)
  }, [id])


  const [brandData, setBrandData] = useState([])
  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/list/BrandMaster`
    ).then((res) => {
      setBrandData(res.data)
      console.log(res.data)
      setIsLoading(false)
    })

  }, [])

  const [brandDetails, setBrandDetails] = useState({})
  const fetchData = async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/get/BrandMasterDetails/${id}`
    );

    console.log(res.data)
    setBrandDetails(res.data)
  }

  // Toggle functions
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleExport = () => setIsExportOpen(!isExportOpen);
  return (
    <React.Fragment>
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
      <nav class="breadcrumb-nav mb-10">
        <div class="container">
          <ul class="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="#">Brand</Link>
            </li>
            <li>{brandDetails.brandName}</li>
          </ul>
        </div>
      </nav>
      <div className="page-content mb-10" style={{ textAlign: "start" }}>
        <div className="container">
          {/* Start of Shop Content */}
          <div className="shop-content row gutter-lg">
            {/* Start of Sidebar, Shop Sidebar */}
            <aside className="sidebar shop-sidebar sticky-sidebar-wrapper sidebar-fixed">
              {/* Start of Sidebar Overlay */}
              <div className="sidebar-overlay" />
              <Link className="sidebar-close" to="#">
                <i className="close-icon" />
              </Link>

              {/* Start of Sidebar Content */}
              <div className="sidebar-content scrollable">
                {/* Start of Sticky Sidebar */}
                <div className="sticky-sidebar">


                  {/* Start of Collapsible widget */}
                  <div className="widget widget-collapsible">
                    <h3
                      className="widget-title"
                      onClick={toggleCategory}
                      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span>All Brand's</span>
                      <span>{isCategoryOpen ? <FaMinus /> : <FaPlus />}</span>
                    </h3>
                    {/* Toggle visibility based on isCategoryOpen state */}
                    {isCategoryOpen && (
                      <ul className="widget-body brandUl filter-items search-ul">
                        {brandData && brandData.map((item, index) => (
                          <li><Button
                            key={index}
                            className='button-none'
                            onClick={(e) => { fetchData(item._id) }}
                          >
                            {item.brandName}
                          </Button></li>
                        ))}


                      </ul>
                    )}
                  </div>
                  {/* End of Collapsible Widget */}

                  {/* Start of Collapsible Widget */}

                  {/* End of Collapsible Widget */}
                </div>
                {/* End of Sticky Sidebar */}
              </div>
              {/* End of Sidebar Content */}
            </aside>
            {/* End of Shop Sidebar */}
            {/* Start of Main Content */}
            <div className="main-content">
              {/* <nav className="toolbox sticky-toolbox sticky-content fix-top">
                <div className="toolbox-left"></div>
                <div className="toolbox-right">
                  <div className="toolbox-item toolbox-show select-box">
                    <label>Sort By :</label>
                    <select name="orderby" className="form-control">
                      <option value="default" selected="selected">
                        Default sorting
                      </option>
                      <option value="popularity">Sort by A to Z</option>
                      <option value="rating">Sort by Z to A</option>
                    </select>
                  </div>
                </div>
              </nav> */}
              {brandDetails &&
                <div className="product-wrapper row brand-categories">

                  <h2>
                    {brandDetails.brandName}
                  </h2>
                  <div className="row mt-4">
                    <div className="col-md-12">
                    {brandDetails.brandBrochure && brandDetails.brandBrochure.length > 0 && (
                        <>
                          <table className="table table-bordered table-tacb">
                            <thead>
                              <tr>
                                <th>Category</th>
                                <th>Title</th>
                                <th>
                                  Download <FaFilePdf />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {brandDetails.brandBrochure.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.categoryDetails?.categoryName || "N/A"}</td>
                                  <td>{item.title || "N/A"}</td>
                                  <td>
                                    <button
                                      className="btn p-3 btn-primary"
                                      onClick={() => window.open(`${process.env.REACT_APP_API_URL}/${item.linkdoc}`, "_blank")}
                                    >
                                      Download Brochure PDF
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </>
                      )}
                    </div>

                  </div>
                </div>}

            </div>
            {/* End of Main Content */}
          </div>
          {/* End of Shop Content */}
        </div>
      </div>
      </div>
       )}
    </React.Fragment>
  );
};

export default BrandPage;
