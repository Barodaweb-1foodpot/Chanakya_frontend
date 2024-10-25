import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Button } from 'reactstrap'
import AccountSidbarDashboard from '../component/AccountSidbarDashboard'
import { Puff } from 'react-loader-spinner'

const MyAccount = ({ setSelectedCase ,userData}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay of 2 seconds (adjust as needed)
    const delay = 1000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []);
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
      <div className="tab-content mb-6">
        <div className="tab-pane active in" id="account-details">
          <div className="icon-box icon-box-side mb-6">
            <span className="icon-box-icon icon-account mr-2">
              <i className="w-icon-user" />
            </span>
            <div className="icon-box-content">
              <h4 className="icon-box-title mb-0 ls-normal" style={{ fontSize: '2rem' }}>Account Details</h4>
            </div>
          </div>
          <div className="account-info" style={{}}>
            <h4 className="title title-password ls-25 font-weight-bold">Account Information</h4>
            <hr />
            <div className='informationDiv'>
              <h6 className="contact-information">Contact Information</h6>
              <p>{userData && userData.Name} {userData && userData.lastName}</p>
              <p>{userData && userData.Email} | {userData && userData.Mobile}</p>
              <p>Address: {userData && userData.companyAddress ? userData.companyAddress : "-" }</p>
              <p className="contact-info-link">
                <span>
                  <Button onClick={() => setSelectedCase("My Profile")} className='button-none'>
                    Edit
                  </Button>
                </span> &nbsp; | &nbsp; <span>
                  <Button onClick={() => setSelectedCase("My Profile")} className='button-none'>
                    Change Password
                  </Button></span></p>
            </div>

          </div>
        </div>
      </div>
 )}

    </React.Fragment>
  )
}

export default MyAccount