import React, { forwardRef, useEffect, useState } from 'react';
import Logo from "../assets/images/home/logo.png"
import { useEmail } from "../component/VerifyEmail";

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import PrintStatement from './PrintStatment'; // Adjust the import path as necessary
const PrintStatment = () => {

  const { EmailVerify, userData } = useEmail();
  const { id } = useParams()
  useEffect(() => {
    EmailVerify();  
  }, []);
 
  useEffect(() => {
    fetchData()
  }, [id])
  const [printData, setPrintData] = useState({})
  const fetchData = async () => { 
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/get/order-history/${id}`) 
      if (res.status === 200) {
        setPrintData(res.data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const downloadPDF = async () => {
    const input = document.getElementById('printablediv');
    if (!input) {
      console.error("Element with ID 'printablediv' not found.");
      return;
    }

    const canvas = await html2canvas(input).catch(err => {
      console.error("Error creating canvas: ", err);
      return null; // Return null if there's an error
    });

    if (!canvas) return; // Exit if the canvas creation failed

    const imgData = canvas.toDataURL('image/png');
    if (!imgData) {
      console.error("Image data is invalid.");
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190; // Width of the image in mm
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    position += heightLeft;

    // Check if another page is needed
    if (heightLeft >= pageHeight) {
      position = heightLeft - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    }

    pdf.save('invoice.pdf');
  };


  const calculateSubtotal = (item) => { 
    return item.productName.newPrice * item.quantity
  };
  const calculateTotal = () => { 
    return printData && printData.cart
      ? printData.cart.reduce((total, item) => total + calculateSubtotal(item), 0)
      : 0;   
  };


  return (
    <React.Fragment>
      {printData &&
        <section className="blog-area pb-2">
          <button
            type="button"
            className="btn btn-rounded btn-primary"
            onClick={downloadPDF}
          >
            <span className=" text-white">
              
            </span>
            Print Invioce 
          </button>
          <div className="container">
            <div className="row m-0" id="printablediv">
              <div className="col-sm-12 checkout-login">
                <div className="row align-items-center">
                  <div className="col-md-7">
                    <div className="invoice-address">
                      <h4>Chanakya - The Bag Studio</h4>
                      <p> Opp. Pratap Talkies, opp. Sursagar Lake (East), Vadodara, Gujarat 390001, India</p>
                      <p> Chanakya The bag Studio, vadivadi, near race course circle, race course road, Vadodara, Gujarat, India</p>
                      <p> chanakyathebagstudio@gmail.com</p>
                      <p> 919974017725 | 919974017727</p>
                  
                      
                    </div>
                  </div>
                  <div className="col-md-5">
                    <img src={Logo} className="img-fluid center-block text-center" style={{ width: 200 }} />
                  </div>
                </div>
                <div className="row mt-4" style={{borderBottom:'1px dashed #d4d4d4'}}>
                  <div className="col-md-6">
                  <p className='mb-0'><span className="fw-bold">BILL TO  </span></p>
                  <p className='mb-0'><span className="fw-bold">Name : </span>{printData.user && printData.user.Name}</p>
                  <p className='mb-0'><span className="fw-bold">Email : </span>{printData.user && printData.user.Email}</p>
                  <p className='mb-0'><span className="fw-bold">Address : </span>{printData.user && printData.user.companyAddress}</p>
                  
                   
                  </div> 

                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <table className="table table-bordered table-tacb">
                      <thead>
                        <tr>
                          <th>Commercial Invoice #</th>
                          <th>Order Date</th>
                          <th>Estimated Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> {}{printData.orderNo && printData.orderNo} </td>
                          <td>{new Date(printData.createdAt && printData.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
                 
                </td>
                          <td>{new Date(printData.estimatedDate && printData.estimatedDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
                  </td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                 
                </div>
                <div className="row mt-4">
                  <div className="col-sm-12">
                    <div className="table table-responsive table-tacb">
                      <table className="meta-1 table table-bordered order-summary mb-0">
                        <thead>
                          <tr>
                            <th>Item No </th>
                            <th>Description</th>
                            <th>Qty</th>
                             
                          </tr>
                        </thead>
                        <tbody>
                          {
                            printData.cart && printData.cart.length > 0 &&
                            printData.cart.map((item, index) => (
                              <tr key={index}>
                                <td className="text-left">
                                  {index + 1}
                                </td>
                                <td>
                                  <div className="description-p text-left">
                                    <p className="product-category">{item.productName.productName}</p>
                                  </div>
                                </td>
                                <td>{item.quantity}</td>
                                
                              </tr>
                            ))
                          }


                          <tr>
                            <td colSpan={2} className="text-left" style={{color:"red"}}>All the Prices are exclusive of Taxes . Taxes may differ product to product</td>
                           
                          </tr>
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <hr />
                
                <hr />
                <div className="row mt-4">
                  <div className="col-sm-12">
                    <div className="mlr-20 offer-panel">
                      <p className="text-center" style={{ fontSize: 11 }}>This is system generated invoice statement, It's not required any Digital signature.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }



    </React.Fragment>
  );
};

export default PrintStatment