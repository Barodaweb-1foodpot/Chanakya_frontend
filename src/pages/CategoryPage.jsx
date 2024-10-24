import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useFilter } from "../component/VerifyEmail";
import { Container, Row, Col } from 'reactstrap';
import { Puff } from 'react-loader-spinner';

const CategoryPage = () => {
    const [CategoryData, setCategoryData] = useState([])
    const { handleFilterCategory, handleFilterSubCategory } = useFilter()
  const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true)
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/auth/list/CategoryMaster`
        )
        setCategoryData(res.data)
        setIsLoading(false)
        console.log(res)
    }
    useEffect(() => {
        fetchData()

    }, [])

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
        <main className="main">
            {/* Start of Breadcrumb */}
            <nav className="breadcrumb-nav mb-10">
                <Container>
                    <ul className="breadcrumb">
                        <li><Link to="/">Home</Link></li> 
                        <li>All Categories</li>
                    </ul>
                </Container>
            </nav>
            {/* End of Breadcrumb */}

            <Container className="pb-5">
                <Row>
                    <Col lg="12">
                        <Row className="category-wrapper cols-12 cols-md-2 cols-xs-2  cols-lg-7 cols-xl-9 pt-4 align-items-center">
                            {CategoryData.map((category, index) => (

                                <div key={index} xs="6" md="6" lg="4" xl="3" className="category  category-ellipse mb-5">
                                    <div className="category-media">
                                        <Link to="/product-list" onClick={(e) => { handleFilterCategory(category._id) }}>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/${category.logo}`}
                                                alt={category.categoryName}
                                                width="190"
                                                height="190"
                                            />
                                        </Link>
                                    </div>
                                    <div className="category-content">
                                        <h4 className="category-name">
                                            <Link to="/product-list" onClick={(e) => { handleFilterCategory(category._id) }}>{category.categoryName}</Link>
                                        </h4>
                                    </div>
                                </div>

                            ))}



                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    )}
    </React.Fragment>
    );
};

export default CategoryPage;
