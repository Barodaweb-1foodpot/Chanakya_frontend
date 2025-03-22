import { BrowserRouter, Routes, Route, Router, replace , Navigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/bootstrap.min.css'

import './assets/css/style.min.css'
// import './assets/css/responsive.css'
import './App.css';
// import './assets/css/demo1.min.css'
// import './assets/css/demo7.min.css'
// import './assets/css/demo12.min.css'
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/header";
import Home from "./pages/Home";
import Footer from "./component/Footer";
import ScrollTopButton from "./component/ScrollToTop";
import CategoryPage from "./pages/CategoryPage";
import ProductList from "./pages/ProductList";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import OrderCompletion from "./pages/Order-Complete";
import CreateCatalogPage from "./pages/CreateCatalogPage";
import MyAccount from "./pages/MyAccount";
import MyOrder from "./pages/MyOrder";
import MyAddress from "./pages/MyAddress";
import MyProFile from "./pages/MyProFile";
import BrandPage from "./pages/BrandPage";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import PrintStatment from "./pages/PrintStatment";
import EmailProvider from "./component/VerifyEmail";
import { Profile } from "./pages/Profile";
import ScrollTop from "./component/ScrollTop";
import OfferPage from "./pages/OfferPage";
import StikyFooter from "./component/StikyFooter";
import ClientPage from "./pages/ClientPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <EmailProvider >
        {/* Place Header outside of Routes */}
        <Header />
        {/* <ScrollTopButton /> */}
        <ScrollTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace/> } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/offer" element={<OfferPage />} />
          <Route path="/signUp" element={<SignupPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orderCompletion" element={<OrderCompletion />} />
          <Route path="/createCatalog" element={<CreateCatalogPage />} />
          <Route path="/myAccount" element={<Profile />} />
          <Route path="/myOrder" element={<MyOrder />} />
          <Route path="/myAddres" element={<MyAddress />} />
          <Route path="/myProfile" element={<MyProFile />} />
          <Route path="/brand/:id" element={<BrandPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/printStatment/:id" element={<PrintStatment />} />
          <Route path="/allclient" element={<ClientPage />} />

        </Routes>
        <Footer />
        <StikyFooter />
        </EmailProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
