import React, { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const delay = 1000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="loader-container">
          <Puff color="#a01e20" height={50} width={50} timeout={0} />
        </div>
      ) : (
        <div>
          <nav className="breadcrumb-nav">
            <div className="container">
              <ul className="breadcrumb">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </nav>
          <div
            className="page-content mb-8 mt-8"
            style={{ textAlign: "start" }}
          >
            <div className="container">
              <div className="row">
                <div className="post-single-content">
                  <h4 className="title title-md font-weight-bold">
                    Privacy Policy
                  </h4>
                  <p className="mb-2">
                    At Chanakya Corporate, we are committed to protecting your
                    privacy. This Privacy Policy explains how we collect, use,
                    and protect your personal information when you visit our
                    website or make a purchase.
                  </p>

                  {/* <h4 className="title title-md font-weight-bold mt-4">
                  Information We Collect
                  </h4> */}
                  <ul className="list-style-none list-type-check">
                    <li>
                      <span className="valuesTitle">
                        Information We Collect
                      </span>
                      We collect personal information such as your name, email
                      address, phone number, shipping/billing address, payment
                      details, and IP address.
                    </li>
                    <li>
                      <span className="valuesTitle">
                        {" "}
                        How We Use Your Information
                      </span>
                      We use your information to process orders, improve our
                      services, send updates and promotions (with your consent),
                      and respond to inquiries.
                    </li>
                    <li>
                      <span className="valuesTitle">
                        Sharing Your Information
                      </span>
                      We do not sell or rent your personal information. We may
                      share it with trusted third-party service providers, such
                      as payment processors and shipping companies, to complete
                      transactions.
                    </li>
                    <li>
                      <span className="valuesTitle">Data Security</span>
                      We implement security measures to protect your personal
                      information, but no method is 100% secure.
                    </li>
                    <li>
                      <span className="valuesTitle">Cookies</span>
                      We use cookies to enhance your website experience. You can
                      adjust your browser settings to decline cookies, though
                      some features may not work properly.
                    </li>
                    <li>
                      <span className="valuesTitle"> Your Rights</span>
                      You can access, update, or delete your personal
                      information anytime. You can also opt-out of promotional
                      emails by unsubscribing.
                    </li>
                    <li>
                      <span className="valuesTitle">Third-Party Links</span>Our
                      website may contain links to other sites, which are not
                      covered by this policy. Review their privacy policies for
                      details.
                    </li>
                    <li>
                      <span className="valuesTitle">
                        Changes to This Policy
                      </span>
                      We may update this Privacy Policy periodically. Check this
                      page for any changes.
                    </li>
                  </ul>

                  <h4 className="title title-md font-weight-bold mt-4">
                    Terms & Conditions
                  </h4>
                  <p>
                    Welcome to Chanakya Corporate. By accessing and using our
                    website and services, you agree to the following terms and
                    conditions:
                  </p>
                  <ol style={{ lineHeight: "2" }}>
                    <li>
                      <span className="valuesTitle">Product Availability</span>
                      All products listed on our website are subject to
                      availability. In case a product is unavailable after
                      placing an order, we will notify you and offer an
                      alternative or inform you about the expected restock time.
                    </li>
                    <li>
                      <span className="valuesTitle">Pricing and Payment</span>
                      We make every effort to ensure that prices and
                      descriptions of products are accurate. Prices may change
                      without prior notice, but the confirmed price at the time
                      of order placement will apply. Payments must be made in
                      full before processing your order.
                    </li>
                    <li>
                      <span className="valuesTitle">Order Confirmation</span>
                      Once an order is successfully placed, you will receive an
                      order confirmation email. This email serves as
                      acknowledgment of your order. Orders will be processed
                      based on product availability.
                    </li>
                    <li>
                      <span className="valuesTitle">Shipping and Delivery</span>
                      Orders will be processed and shipped as quickly as
                      possible. Delivery times may vary based on location. While
                      we strive to deliver within the stated time frame, delays
                      can occasionally occur.
                    </li>
                    <li>
                      <span className="valuesTitle">
                        Cancellation Policy (No Refund)
                      </span>
                      <ul>
                        <li>
                          Once an order is confirmed and processed,
                          cancellations are not accepted, and no refund will be
                          provided.
                        </li>
                        <li>
                          If you wish to cancel an order, please do so within 24
                          hours of placing it. After this period, cancellations
                          will not be entertained.
                        </li>
                        <li>
                          In case of cancellations within the specified window,
                          you will be notified of the decision, and no refunds
                          will be issued.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="valuesTitle">
                        Cancellation Policy (No Refund)
                      </span>
                      If you receive a damaged or defective product, please
                      contact us within 7 days of receipt. We will review the
                      issue and offer a replacement or exchange, provided the
                      product is unused and in its original packaging.
                    </li>
                    <li>
                      <span className="valuesTitle">Privacy and Security</span>
                      We value your privacy and ensure that your personal data
                      is kept secure. For more information, please refer to our
                      Privacy Policy.
                    </li>
                    <li>
                      <span className="valuesTitle">
                        Changes to Terms & Conditions
                      </span>
                      We reserve the right to update or modify these Terms &
                      Conditions at any time. Any changes will be posted on this
                      page with an updated revision date.
                    </li>
                    <li>
                      <span className="valuesTitle">
                        Limitation of Liability
                      </span>
                      Chanakya Corporate is not responsible for any direct or
                      indirect damages arising from the use of the products or
                      services provided. Our liability is limited to the value
                      of the purchased product.
                    </li>
                    <li>
                      <span className="valuesTitle">Contact Us</span>
                      For any inquiries or concerns, please contact us
                    </li>
                  </ol>
{/*                 
                  <div className="tags">
                    <label className="text-dark mr-2">Links:</label>
                    <Link to="#" className="tag">
                      Link 1
                    </Link>
                    <Link to="#" className="tag">
                      Link 2
                    </Link>
                    <Link to="#" className="tag">
                      Link 3
                    </Link>
                    <Link to="#" className="tag">
                      Link 4
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PrivacyPolicy;
