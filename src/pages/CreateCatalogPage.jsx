import React, { useEffect, useState } from "react";
import {
  Col, Container, Row, Label, Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { FaEye } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


import ProductImg from "../assets/images/categories/category-1.jpg";
import Form from "react-bootstrap/Form";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Puff } from "react-loader-spinner";

const CreateCatalogPage = () => {


  const initialValue = {
    category: "",
    subCategory: "",
    quantity: 0,
    startPrice: 0,
    endPrice: 0,
    // discount: "",
    estimatedDate: ''

  }
  const user = localStorage.getItem("user");

  const [values, setValues] = useState(initialValue)
  const { category, subCategory, quantity, startPrice, endPrice, estimatedDate } = values


  const [allcategory, setcategory] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [subCat, setSubCategory] = useState([])
  const [show, setShow] = useState(false)
  const [allproduct, setAllProducts] = useState([])
  const [showTest , setShowText] = useState("")

  const [checkedProducts, setCheckedProducts] = useState([]); // State to store checked product IDs
  const [selectAll, setSelectAll] = useState(false); // State for "Select All"
  const [viewModel, setViewModel] = useState(false)


  useEffect(() => {
    loadcategory();
  }, []);

  useEffect(() => {
    fetchUser()
  }, [user])

  const [userData, setUserData] = useState({})

  const fetchUser = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/get/UserMasterDetail/${user}`
    );
    console.log(res)
    setUserData(res.data)


  }

  const loadcategory = () => {
    axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/list/CategoryMaster`
    ).then((res) => setcategory(res.data));
  };



  const handleCategoryChange = (selectedOptions) => {
    const value = selectedOptions ? selectedOptions.value : "";
    console.log(selectedOptions.target.value)
    // console.log("ss", values.InternationalJobDescription);
    // if (selectedOptions.target.value === 'All') handleCatalogueChange(index, "category", '');
    // else handleCatalogueChange(index, "category", selectedOptions.target.value);
    if (selectedOptions.target.value === 'All') setValues({ ...values, "category": "" });
    else setValues({ ...values, "category": selectedOptions.target.value });
    fetchSubCategory(selectedOptions.target.value);

  };

  const fetchSubCategory = (_id) => {
    console.log(_id)
    if (_id != "All") {
      axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/listData/SubCategoryByCategory/${_id}`
      ).then((res) => {
        console.log(res.data)
        setSubCategory(res.data)
      })
    }
    else {
      axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/list/SubCategoryMaster`
      ).then((res) => {
        console.log(res.data)
        setSubCategory(res.data)
        // setAllCategory(false)
      })
    }
  };

  const handleSubCategoryChange = (selectedOptions) => {
    const value = selectedOptions ? selectedOptions.value : "";
    console.log(selectedOptions.target.value)
    // console.log("ss", values.InternationalJobDescription);
    if (selectedOptions.target.value === 'All') setValues({ ...values, "subCategory": "" });
    else setValues({ ...values, "subCategory": selectedOptions.target.value });
  };


  const handleView = () => {
    console.log(values)
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/getProducts`, values).then((res) => {
      console.log(res)
      if (res.status === 200) {
        setAllProducts(res.data.products)
        if(res.data.products.length===0) setShowText("No Products")
        // const customFileName = `ChanakyaCatalogue-${currentDate}.pdf`;

        // downloadFile(`${process.env.REACT_APP_API_URL}/uploads/Catalogue/${res.data.filename}`)
      }
    })
  }

  const downloadFile = async (url, name = "downloadedFile") => {
    const encodedUrl = encodeURI(url);
    // console.log(encodedUrl);

    fetch(encodedUrl, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const contentType = blob.type;
        const extension = contentType.split("/")[1] || "pdf"; // Default to pdf if no extension is detected
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", `${name}.${extension}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        toast.success("PDF downloaded Successfully")

        setCheckedProducts([])
        setAllProducts([])
        setSelectAll(false)
        setValues(initialValue)
        // setValues(initialValue)
      })
      .catch((e) => console.error("Download error:", e));
  };



  const handleCheckboxChange = (e, productId) => {
    if (e.target.checked) {
      // Add productId to the array if checked
      setCheckedProducts([...checkedProducts, productId]);
    } else {
      // Remove productId from the array if unchecked
      setCheckedProducts(checkedProducts.filter(id => id !== productId));
    }
  };

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked); // Set "Select All" state

    if (isChecked) {
      // If "Select All" is checked, add all product IDs to checkedProducts
      const allProductIds = allproduct.map(product => product._id);
      setCheckedProducts(allProductIds);
    } else {
      // If "Select All" is unchecked, clear the checkedProducts array
      setCheckedProducts([]);
    }
  };


  const handleCreateCatalogue = () => {
    if(estimatedDate === "")
    {
      toast.error("Please enter the estimated date you want order on")
      return
    }
    setLoading(true)
    console.log(checkedProducts)
    
    try {
      axios.post(`${process.env.REACT_APP_API_URL}/api/auth/downloadCatalogueFromFrontend`,{AllProduct: checkedProducts , discount:""}).then((res) => {
        console.log(res)
        if (res.status === 200) {
          toast.success(res.message)
          setLoading(false)
          
          // setDownloadable(true)
          downloadFile(`${process.env.REACT_APP_API_URL}/uploads/Catalogue/${res.data.filename}`)
          // setAllProducts(res.data.products)
          // const customFileName = `ChanakyaCatalogue-${currentDate}.pdf`;

          // downloadFile(`${process.env.REACT_APP_API_URL}/uploads/Catalogue/${res.data.filename}`)
          const data = { fileName: res.data.filename }
          deleteFile(data)
          catalogueInqiury()
          setViewModel(false)
        }
        else {
          setViewModel(false)
          setLoading(false)
          toast.error(res.message)
        }
      })
    }
    catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error)
    }
  }

  const catalogueInqiury = () => {
    const finalValues = {
      categoryName: category !== "" ? category : null,
      subCategoryName: subCategory !== "" ? subCategory : null,
      startPrice: startPrice,
      endPrice: endPrice,
      quantity: quantity,
      user: user ? user : null,
      productName: checkedProducts,
      estimatedDate: estimatedDate,
    };
    try {
      axios.post(`${process.env.REACT_APP_API_URL}/api/auth/create/catalogue-inqiury`, finalValues).then((res) => {
        console.log(res)

      })
    }
    catch (error) {
    
      console.log(error)
    }
  }

  const deleteFile = (data) => {
    try {
      axios.post(`${process.env.REACT_APP_API_URL}/api/auth/delete-catalogue`, data).then((res) => {
        console.log(res)

      })
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
         {/* {isLoading ? (
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
      <div> */}
      <ToastContainer />
      <Container>
        <Row className="justify-content-center mt-5 ">
          <Col lg={8} className="p-5 box">
        <Row className="pt-4 pb-4">
          <Col lg={4} md={4}>
            <Label>Product Category</Label>
            <Form.Select
              onChange={handleCategoryChange}
              value={category}

              className="selector "
              aria-label="Default select example"
            >
              <option value="All">All Category</option>
              {allcategory && allcategory.map((c) => {
                return (
                  <React.Fragment key={c._id}>
                    {c.IsActive && (
                      <option value={c._id}>
                        {c.categoryName}
                      </option>
                    )}
                  </React.Fragment>
                );
              })}
            </Form.Select>
          </Col>
          <Col lg={4} md={4}>
            <Label>Sub Product Category</Label>
            <Form.Select
              value={subCategory}
              onChange={handleSubCategoryChange}
              className="selector"
              aria-label="Default select example"
            >
              <option>Sub Category</option>
              {subCat.length > 0 && subCat.map((c) => {
                return (
                  <React.Fragment key={c._id}>
                    {c.IsActive && (
                      <option value={c._id}>
                        {c.subCategoryName}
                      </option>
                    )}
                  </React.Fragment>
                );
              })}
            </Form.Select>
          </Col>
          <Col lg={4} md={4}>
            <Label>Quantity</Label>
            <input
              className="qtyInput"
              type="number"
              onWheel={(e) => e.target.blur()} // Disable scrolling increment
              placeholder="Qty"
              value={quantity}
              onChange={(e) => { setValues({ ...values, "quantity": e.target.value }) }} />
          </Col>
        </Row>
        <Row className="pb-4">
          <Col lg={4} md={4}>
            <Label>Start Price</Label>
            <input className="qtyInput" type="number" placeholder="Start"
            onWheel={(e) => e.target.blur()} // Disable scrolling increment
              value={startPrice}
              onChange={(e) => { setValues({ ...values, "startPrice": e.target.value }) }} />
          </Col>
          <Col lg={4} md={4}>
            <Label>End Price</Label>
            <input className="qtyInput" type="number" placeholder="End"
            onWheel={(e) => e.target.blur()} // Disable scrolling increment
              value={endPrice}
              onChange={(e) => { setValues({ ...values, "endPrice": e.target.value }) }} />
          </Col>
          <Col lg={4} md={4}>
          <Label className="invisible">"mm</Label>

            <button className="viewBtn " type="button" onClick={handleView}>
              View <FaEye className="eyeIcon" />
            </button>
          </Col>
        </Row>
        </Col>
        </Row>
        <Row className="pt-4 pb-4  mt-4">
         
            <div className="row justify-content-center">
            {allproduct.length > 0 && <div className="categoryDiv pt-4">
              <button
                className="viewBtn"
                type="button"
                onClick={() => { 
                  if (checkedProducts.length === 0) {
                    toast.error("Please Select Products to download the Brochure")
                    setLoading(false)
              
                    return
                  }
                 else setViewModel(true) 
                  }}>
                {isLoading ? "Loading...." : "Create Catalogue"}<IoCreateOutline className="eyeIcon"  />

              </button>
            </div>}
            {allproduct.length > 0 &&
              <div className="ps-4 allCategoryDiv justify-content-center mt-4">
                <input type="checkbox"
                 style={{accentColor:'#a01e20'}}
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                /> <span>Select All Category</span>
              </div>
            }
          </div>
         
          {allproduct.length > 0 ? allproduct.map((data) => (
            <Col className="pt-4" lg={3} md={4} sm={6} xs={6}>
              <div className="item-card">
                <div className="allCategoryDiv checkBoxDiv ">
                  <input
                  style={{accentColor:'#a01e20'}}
                    className=""
                    type="checkbox"
                    checked={checkedProducts.includes(data._id)} // Check if the product is in the array
                    onChange={(e) => handleCheckboxChange(e, data._id)} // Handle the checkbox change
                  />
                </div>

                <img src={`${process.env.REACT_APP_API_URL}/${data.productImage}`} alt="" />
                <div className="productTitle">{data.productName}</div>
                <div className="categoryTitle">{data.categoryName.categoryName}</div>
                <div className="categoryTitle">{data.newPrice}</div>
                {/* <div className='item-card-hov'>
                            <i className="w-icon-cart"></i>
                            <p>Add To Inquiry</p>
                          </div> */}
              </div>
            </Col>
          )) : <div className="text-center"> {showTest || ""} </div>}


        </Row>

      </Container>

      <Modal
        isOpen={viewModel}

      // centered
      >
        <ModalHeader
          className="p-3 modalHader"
          toggle={() => {
            setViewModel(false);
          }}
          close={
            <button onClick={() => setViewModel(false)}
              className="close" >
              &times;
            </button>
          }
        >
          User Deatils

        </ModalHeader>
        <form>
          <ModalBody>

            <div className="form-floating mb-3">
              <Row>
                <Col lg={12}>
                  <p ><span className="fw-bold"> User Name :</span>{userData.Name} </p>
                </Col>
                <Col lg={12}>
                  <p ><span className="fw-bold"> Contact Number :</span>{userData.Mobile} </p>
                </Col>

                <Col lg={12}>
                  <p ><span className="fw-bold"> User Email :</span>{userData.Email} </p>
                </Col>
                <Col lg={12}>
                  <p ><span className="fw-bold"> Estimated Date you want  :</span>
                    <input
                      value={estimatedDate}
                      onChange={(e) => {
                        setValues({ ...values, "estimatedDate": e.target.value });
                        console.log(values)
                      }}
                      className="inputDate"
                      type="date">
                    </input> </p>
                </Col>
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    <button
                      className="viewBtn"
                      type="button"
                      onClick={() => { handleCreateCatalogue() }}>
                      {isLoading ? "Loading...." : "Create Catalog"}<IoCreateOutline />

                    </button>



                  </div>
                </Col>
              </Row>



              {/* <p ><span className="fw-bold"> Password :</span>{values.Password} </p> */}




            </div>
          </ModalBody>

        </form>
      </Modal>
      {/* </div>
         )} */}
    </React.Fragment >
  )
};

export default CreateCatalogPage;
