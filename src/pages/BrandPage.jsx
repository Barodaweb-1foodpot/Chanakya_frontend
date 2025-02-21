import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import Img1 from "../assets/images/brands/category/2.png"
import { FaFilePdf } from "react-icons/fa";
import axios from 'axios';
import { Button } from 'reactstrap';
import { Puff } from 'react-loader-spinner';

const BrandPage = () => { 
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isExportOpen, setIsExportOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams()

  useEffect(() => { 
    if (id != "no") { 
      fetchData(id)
      setBrandDetails({})
    }
  }, [id])

  const [brandData, setBrandData] = useState([])
  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/list/BrandMaster`
    ).then((res) => {
      setBrandData(res.data) 
      setIsLoading(false)
    })

  }, [])

  const [brandDetails, setBrandDetails] = useState({})
  const fetchData = async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/get/BrandMasterDetails/${id}`
    );
 
    setBrandDetails(res.data)
  }
 
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleExport = () => setIsExportOpen(!isExportOpen);
  return (
    <React.Fragment>
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
          <nav class="breadcrumb-nav mb-10">
            <div class="container">
              <ul class="breadcrumb">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={`/brand/no`}>Brand</Link>
                </li>
                <li>{brandDetails.brandName}</li>
              </ul>
            </div>
          </nav>
          <div className="page-content mb-10" style={{ textAlign: "start" }}>
            <div className="container"> 
              <div className="shop-content row gutter-lg"> 
                <aside className="sidebar shop-sidebar sticky-sidebar-wrapper sidebar-fixed"> 
                  <div className="sidebar-overlay" />
                  <Link className="sidebar-close" to="#">
                    <i className="close-icon" />
                  </Link>
 
                  <div className="sidebar-content scrollable"> 
                    <div className="sticky-sidebar">
 
                      <div className="widget widget-collapsible">
                        <h3
                          className="widget-title"
                          onClick={toggleCategory}
                          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                          <span>All Brand's</span>
                          <span>{isCategoryOpen ? <FaMinus /> : <FaPlus />}</span>
                        </h3> 
                        {isCategoryOpen && (
                          <ul className="widget-body brandUl filter-items search-ul">
                            {brandData && brandData.map((item, index) => (
                              <li><Link
                                key={index}
                                className='button-none'
                                to={`/brand/${item._id}`}
                              >
                                {item.brandName}
                              </Link></li>
                            ))}


                          </ul>
                        )}
                      </div>

                    </div>
                  </div>
                </aside>
                <div className="main-content">

                  {brandDetails &&
                    <div className="product-wrapper row brand-categories text-center">

                      <h2>
                        {brandDetails.brandName}
                      </h2>
                      <div className="row mt-4">
                        <div className="col-md-12"> 
                          {brandDetails.brandBrochure && brandDetails.brandBrochure.length > 0 ? (
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
                                      <td>
                                        {item.categoryDetails &&
                                          item.categoryDetails.map((items, index) => (
                                            <p className="m-0" key={index}>
                                              {items.categoryName},
                                            </p>
                                          ))}
                                      </td>
                                      <td>{item.title || "N/A"}</td>
                                      <td>
                                        <button
                                          className="btn p-3 btn-primary"
                                          onClick={() =>
                                            window.open(
                                              `${process.env.REACT_APP_API_URL}/${item.linkdoc}`,
                                              "_blank"
                                            )
                                          }
                                        >
                                          Download Brochure PDF
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </>
                          ) : id !== "no" ? (
                            <div>
                              <p style={{ border: "1px dashed lightgrey" }} className="p-5">
                                No Brochures in this selected brand
                              </p>
                            </div>
                          ) : (
                            <>
                              <div className="post-wrapper pb-2 pb-lg-0 mb-5 ">
                                <div className="swiper-wrapper row cols-lg-6 cols-md-3 cols-sm-2 cols-1">
                                  {brandData && brandData.map((brandData, index) => (

                                    <Link key={index} to={`/brand/${brandData._id}`}>
                                      <div className="swiper-slide post text-center overlay-zoom" >
                                        <figure className="post-media br-sm">

                                          <img
                                            src={`${process.env.REACT_APP_API_URL}/${brandData.logo}`}
                                            style={{ backgroundColor: brandData.backgroundColor }}
                                            alt={brandData.brandName}
                                          />

                                        </figure>
                                        <div className="post-details">
                                          <div className="post-meta">{brandData.brandName}</div>

                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div></>
                          )}

                        </div>

                      </div>
                    </div>}

                </div>
              
              </div>
           
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BrandPage;
