import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle,
  faArrowRight,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const OrderCompletion = ({ orderStatus, orderData }) => {
  const [show, setShow] = useState(false)
 

  return (
    <main className="main login-page">
      
      <div className="page-content ">
        <div className="">
          <ul className="order-view list-style-none">
            <li>
              <label>Order number</label>
              <strong>{orderData.orderHistory.orderNo}</strong>
            </li>
            <li>
              <label>Status</label>
              <strong>
                {orderStatus === "success" ? "Success" : "Failed"}
              </strong>
            </li>
            <li>
              <label>Date</label>
              <strong>
                {new Date(orderData.orderHistory.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </strong>

            </li>

          </ul>

          <div className="row justify-content-center" id="thankyou-note">
            {orderStatus === "success" ? (
              <div className="">
                <div className="card">
                  <div className="card-body text-center">
                    <h3 className="mt-5 mb-5">
                      <span className="p-3 bg-green w-auto rounded-circle">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-white"
                        />
                      </span>
                    </h3>
                    <h3 className="text-green">Your inquiry was successful</h3>
                    <p>
                      Thank you for your inquiry. We will be in contact with
                      more details shortly.
                    </p>
                    <div className="text-center">
                      <Link
                        // type="button"
                        className="btn btn-rounded btn-primary"
                        to={`/printStatment/${orderData.orderHistory._id}`}
                        target="_blank"
                      >
                        <span className=" text-white">
                           
                        </span>
                        Print Invioce
                        
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12">
                <div className="card">
                  <div className="card-body text-center">
                    <h3 className="mt-5 mb-5">
                      <span className="p-3 bg-danger w-auto rounded-circle">
                        
                      </span>
                    </h3>
                    <h3 className="text-danger">Oh no, your inquiry failed</h3>
                    <p>
                      Don't worry. We'll try your inquiry again over the next
                      few hours.
                    </p>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-rounded btn-danger"
                        onClick={() => (console.log("clicked"))}
                      >
                        <span className="btn-icon-left text-white">
                         
                        </span>
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={() => { window.location.href = "/" }}
              className="btn btn-primary btn-rounded btn-icon-left btn-back mt-6"
            >
               
              Back To Home Page
            </button>
          </div>
        </div>
      </div> 
    </main>
  );
};

export default OrderCompletion;
