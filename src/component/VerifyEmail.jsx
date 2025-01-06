import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmailContext = createContext();
const FilterContext = createContext()

export const useEmail = () => useContext(EmailContext);
export const useFilter = () => useContext(FilterContext)

const EmailProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  const [filterRange, setFilterRange] = useState(0)
  const [startFilter, setStartFilter] = useState(0)
  const [filterRangeName, setFilterRangeName] = useState('')

  const [filterCategory, setFilterCategory] = useState('')
  const [filterCategoryName, setFilterCategoryName] = useState('')
  const [filterSubCategoryName, setFilterSubCategoryName] = useState('')

  const [searchText, setSearchText] = useState("")
  const [textToFind, setTextToFind] = useState("")
  const EmailVerify = async () => {
    const Email = localStorage.getItem("user");
    if (Email) {
      await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/get/UserMasterDetails/${Email}`)
        .then((response) => { 
          const user = response.data;
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error in user verification process:", error);
        });
    } else {
      console.log("No token found");
      setUserData(null)
    }
  };

  const FilterLogic = (range , endRange , text) => { 
    setFilterRange(range)
    setStartFilter(endRange)
    setFilterRangeName(text)
    setTextToFind('') 
    setFilterCategoryName('')
    setFilterSubCategoryName('')
  }


  const handleSearchClick = () => { 
    setTextToFind(searchText)
    setFilterRange(0)
    setStartFilter(0)
    navigate('/product-list')
  };

  const handleKeyDown = (e) => { 
    if (e.key === "Enter") {
      setTextToFind(searchText)
      setFilterRange(0)
      setStartFilter(0)
      e.preventDefault()
      navigate('/product-list')
    }
  };

  const handleInputChange = (e) => {
    return setSearchText(e); // Directly setting the value from input
  };


  const handleFilterCategory = (e, categoryName) => { 
    setFilterSubCategory('')
    setFilterCategory(e)
    setFilterSubCategoryName('')
    setFilterRangeName('')
    setFilterCategoryName(categoryName)
    return
  }


  const [filterSubCategory, setFilterSubCategory] = useState('')

  const handleFilterSubCategory = (e, subCategoryName) => {
    setFilterCategory('')
    setFilterCategoryName('')
    setFilterSubCategoryName(subCategoryName)
    setFilterRangeName('')
    return setFilterSubCategory(e)
  }


  return (
    <EmailContext.Provider value={{
      EmailVerify, userData, setUserData
    }}>


      <FilterContext.Provider value={{
        FilterLogic, filterRange, searchText,
        handleKeyDown, setSearchText, handleSearchClick, handleInputChange, textToFind, handleFilterCategory,
         filterCategory, setFilterCategoryName, filterCategoryName,
         setFilterSubCategoryName,filterSubCategoryName,
        handleFilterSubCategory, filterSubCategory, setFilterRange,
        startFilter, setStartFilter,
        filterRangeName, setFilterRangeName
      }}>
        {children}
      </FilterContext.Provider>
    </EmailContext.Provider>
  );
};

export default EmailProvider;
