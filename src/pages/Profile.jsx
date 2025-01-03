import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MyAccount from './MyAccount' 
import AccountSidbarDashboard from "../component/AccountSidbarDashboard";
import { Col, Row, Button } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyOrder from './MyOrder';
import MyProFile from './MyProFile';
import { useEmail } from "../component/VerifyEmail";
import {toast, ToastContainer } from 'react-toastify';



export const Profile = () => {

    const { EmailVerify, setUserData, userData } = useEmail();
 
    useEffect(() => {
        EmailVerify()
    }, [])
    const [selectedCase, setSelectedCase] = useState('My Account'); // Default case


    const renderComponent = () => {
        switch (selectedCase) {
            case 'My Account':
                return <MyAccount setSelectedCase={setSelectedCase} userData={userData} />;
            case 'My Order':
                return <MyOrder userData={userData}/>;
            case 'My Profile':
                return <MyProFile userData={userData}/>;
            default:
                return <div>Please select a valid case.</div>;
        }
    };


    const handleLogout = () => {
        toast.success("User Logged out successfully") 
        localStorage.removeItem("user"); 
        window.location.href = "/";
        EmailVerify();
    
      };

    return (
        <React.Fragment>
            <ToastContainer />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>My account</li>
                        <li>My Profile</li>
                    </ul>
                </div>
            </nav>

            <div className="page-content pt-6 pb-2 my-account">
                <div className="container">
                    <div className="tab tab-vertical row gutter-lg">
                        <ul className="justify-content-start align-items-start nav nav-tabs  mb-6" role="tablist">
                            <li className="nav-item">
                                <h5 className="nav-link active account-dashboard">Account Dashboard</h5>
                            </li>
                            <li className="link-item">
                                <Button name="My Account" onClick={(e) => { setSelectedCase(e.target.name) }} className="button-none siderBtn">My Account</Button>
                            </li>
                            <li className="link-item">
                                <Button name="My Order" onClick={(e) => { setSelectedCase(e.target.name) }} className="button-none siderBtn">My Order</Button>
                            </li>

                            <li className="link-item">
                                <Button name="My Profile" onClick={(e) => { setSelectedCase(e.target.name) }} className="button-none siderBtn">My Profile</Button>
                            </li>
                            <li className="link-item">
                                 <Button onClick={(e) => { handleLogout() }} className="button-none siderBtn">Log Out</Button>
                            </li>
                        </ul>
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}