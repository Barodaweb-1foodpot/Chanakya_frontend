import React, { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import { Link } from "react-router-dom";
import CreateCatalogBtn from "../component/CreateCatalogBtn";

const PrivacyPolicy = () => {
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
    <div className="page-content mb-8 mt-8" style={{textAlign:"start"}}>
  <div className="container">
    <div className="row">
      <div className="post-single-content">
        <h4 className="title title-md font-weight-bold">Title Here (Paragraph)</h4>
        <p className="mb-2">
          Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
        </p>
        <p className="mb-2">
          Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
        </p>
        <p className="mb-2">
          Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
        </p>
        <h4 className="title title-md font-weight-bold mt-4">Title Here (ul List)</h4>
        <ul className="list-style-none list-type-check">
          <li>Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...Text will be coming soon...</li>
        </ul>
        <p>Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...</p>
        <h4 className="title title-md font-weight-bold mt-4">Title Here (ol List)</h4>
        <ol style={{lineHeight:"2"}}>
          <li>Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...Text will be coming soon...</li>
          <li>Text will be coming soon...Text will be coming soon...Text will be coming soon...</li>
        </ol>
        <p>Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...</p>
        <div className="tags">
          <label className="text-dark mr-2">Links:</label>
          <Link to="#" className="tag">Link 1</Link>
          <Link to="#" className="tag">Link 2</Link>
          <Link to="#" className="tag">Link 3</Link>
          <Link to="#" className="tag">Link 4</Link>
        </div>
      </div>
    </div>
  </div>
  <CreateCatalogBtn />
</div>
</div>
 )}

    </React.Fragment>
  );
};

export default PrivacyPolicy;
