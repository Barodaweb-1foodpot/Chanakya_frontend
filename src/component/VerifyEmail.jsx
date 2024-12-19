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
  const EmailVerify = async () => {
    const Email = localStorage.getItem("user");
    if (Email) {
      await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/get/UserMasterDetails/${Email}`)
        .then((response) => {
          console.log(response)
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

  const [filterRange, setFilterRange] = useState(0)

  const FilterLogic = (range) => {
    console.log(range)
    setFilterRange(range)
    setTextToFind('')
  }

  const [searchText, setSearchText] = useState("")
  const [textToFind, setTextToFind] = useState("")

  const handleSearchClick = () => {
    console.log("Search text:", searchText); // Logging the search text when button is clicked
    setTextToFind(searchText)
    setFilterRange(0)
    navigate('/product-list')
  };

  const handleKeyDown = (e) => {
    console.log(e)

    if (e.key === "Enter") { // Check if the key pressed is "Enter"
      console.log("Search text on Enter:", searchText);
      setTextToFind(searchText)
      setFilterRange(0)
      e.preventDefault()
      navigate('/product-list')
    }
  };

  const handleInputChange = (e) => {
    return setSearchText(e); // Directly setting the value from input
  };

  const [filterCategory, setFilterCategory] = useState('')
  const [filterCategoryName, setFilterCategoryName] = useState('')
  const [filterSubCategoryName, setFilterSubCategoryName] = useState('')

  const handleFilterCategory = (e, categoryName) => {
    console.log(categoryName)
    setFilterSubCategory('')
    setFilterCategory(e)
    setFilterSubCategoryName('')
    setFilterCategoryName(categoryName)
    return
  }


  const [filterSubCategory, setFilterSubCategory] = useState('')

  const handleFilterSubCategory = (e, subCategoryName) => {
    console.log(e)
    setFilterCategory('')
    setFilterCategoryName('')
    setFilterSubCategoryName(subCategoryName)
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
        handleFilterSubCategory, filterSubCategory, setFilterRange
      }}>
        {children}
      </FilterContext.Provider>
    </EmailContext.Provider>
  );
};

export default EmailProvider;
