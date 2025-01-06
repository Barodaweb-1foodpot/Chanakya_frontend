import React, { useEffect , useState } from 'react'
import { Link, redirect , useNavigate } from 'react-router-dom'
import { varifyUser } from '../Functions/UserLogin';
import { toast, ToastContainer } from "react-toastify";


const CreateCatalogBtn = () => {
  const navigate = useNavigate();
  const user= localStorage.getItem("user");
  const [userData, setUserData] = useState({})
 

  const chechLogin =()=>{
    if(user)
    {
      navigate("/createCatalog"); 
    }
    else{
     
      toast.warning("Please Login to assess Catalogue")
      setTimeout(() => {
        navigate("/login");
      }, 3000)
    }
  }

  return (
    <React.Fragment>
    <ToastContainer />
        <div className='createCatelogDiv'>
        <button onClick={chechLogin} className='catalogue-vertical'>   Create catalogue  </button>
        </div>
       
    </React.Fragment>
  )
}

export default CreateCatalogBtn