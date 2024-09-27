import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/bootstrap.min.css'

import './assets/css/style.min.css'
// import './assets/css/responsive.css'
import './App.css';
// import './assets/css/demo1.min.css'
// import './assets/css/demo7.min.css'
import './assets/css/demo12.min.css'
import Header from "./component/header";
import Home from "./pages/Home";
import Footer from "./component/Footer";
function App() {
  return (
    <div className="App">
    
     <BrowserRouter>
        {/* Place Header outside of Routes */}
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
