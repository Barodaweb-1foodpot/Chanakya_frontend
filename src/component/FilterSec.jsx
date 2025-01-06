import { React, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from "axios";
import { Button } from 'react-bootstrap'; 

function valuetext(value) {
  return `${value}°C`;
}

export default function FilterSec({ handleSubmit }) {
  const [selectList, setSelectList] = useState([]);
  const [value, setValue] = useState([]);

  const [filters, setFilters] = useState([])
  const [subCategories, setSubcategories] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(0)

  useEffect(() => {
    fetchFilters()
  }, [])

  const fetchFilters = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/list/get-filters`) 
    setFilters(res.data[0])
    setSubcategories(res.data[0].subCategories)
    setCategories(res.data[0].categories)
    setBrands(res.data[0].brands)
    const minPrice = Math.min(...res.data[0].uniquePrices);
    const maxPrice = Math.max(...res.data[0].uniquePrices);
    setMaxVal(maxPrice)
    setMinVal(minPrice)
    setValue([minPrice,maxPrice]) 
  }

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };



  const [activeCategoriesIndices, setActiveCategoriesIndices] = useState([]);
  const [activeSubCategoriesIndices, setActiveSubCategoriesIndices] = useState([]);
  const [activeBrandIndices, setActiveBrandIndices] = useState([]);
  const handleClick = (e,index) => { 
    if(e === 'categories')
    {
      setActiveCategoriesIndices((prevIndices) => {
        if (prevIndices.includes(index)) {
          return prevIndices.filter((i) => i !== index);
        } else {
          return [...prevIndices, index];
        }
      });
    }
    else if(e === 'subcategories')
      {
        setActiveSubCategoriesIndices((prevIndices) => {
          if (prevIndices.includes(index)) {
            return prevIndices.filter((i) => i !== index);
          } else {
            return [...prevIndices, index];
          }
        });
      }
      else if(e === 'brands')
        {
          setActiveBrandIndices((prevIndices) => {
            if (prevIndices.includes(index)) {
              return prevIndices.filter((i) => i !== index);
            } else {
              return [...prevIndices, index];
            }
          });
        }
   
  };

  

  

  return (
    <div>
      <Accordion className='widget new border-0'>
        <AccordionSummary
          expandIcon={<p style={{ marginBottom: "0px", fontSize: "24px", fontWeight: "bolder", color: "rgb(58, 58, 58)" }}><ArrowDownwardIcon /></p>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography ><p className='widget-title' style={{ marginBottom: "0px", fontSize: "18px", fontWeight: "bolder", color: "rgb(58, 58, 58)" }}>Categories</p></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul class="widget-body filter-items item-check">



            {categories.map((item, index) => {
              return (
                <li
                  key={index}
                  id="categories"
                  className={activeCategoriesIndices.includes(item._id) ? 'active' : 'inactive'}
                  onClick={(e) => handleClick("categories",item._id)}
                >
                  <p className='p-0 text-left mb-1'>{item.categoryName}</p>
                </li>
              );
            })}




          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion className='widget new border-0'>
        <AccordionSummary
          expandIcon={<p style={{ marginBottom: "0px", fontSize: "24px", fontWeight: "bolder", color: "rgb(58, 58, 58)" }}><ArrowDownwardIcon /></p>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography ><p className='widget-title' style={{ marginBottom: "0px", fontSize: "18px", fontWeight: "bolder", color: "rgb(58, 58, 58)" }}>Sub Categories</p></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul class="widget-body filter-items item-check">



            {subCategories.map((item, index) => {
              return (
                <li
                key={index}
                name="subcategories"
                className={activeSubCategoriesIndices.includes(item._id) ? 'active' : 'inactive'}
                onClick={(e) => handleClick("subcategories",item._id)}
                >
                  <p className='p-0 text-left mb-1'>{item.subCategoryName}</p>
                </li>
              );
            })}




          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion className='widget new border-0'>
        <AccordionSummary
          expandIcon={<p style={{ marginBottom: "0px", fontSize: "24px", fontWeight: "bolder", color: "rgb(58, 58, 58)" }}><ArrowDownwardIcon /></p>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography ><p className='widget-title' style={{ marginBottom: "0px", fontSize: "18px", fontWeight: "bolder", color: "rgb(58, 58, 58)" }}>Brands</p></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul class="widget-body filter-items item-check">



            {brands.map((item, index) => {
              return (
                <li
                key={index}
                name="brands"
                className={activeBrandIndices.includes(item._id) ? 'active' : 'inactive'}
                onClick={(e) => handleClick('brands',item._id)}
                >
                  <p className='p-0 text-left mb-1'>{item.brandName}</p>
                </li>
              );
            })}




          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>

        <AccordionDetails>
          <Box>
            <div className='d-flex align-item-center justify-content-between'>
              <div className='d-flex' style={{ alignItems: "center", gap: "10px" }}><p className='mb-0-p'>Min</p><div className='d-flex justify-content-center range-box'><p className='mb-0-p'>{value[0]}</p></div></div>

              <div className='d-flex' style={{ alignItems: "center", gap: "10px" }}><p className='mb-0-p'>Max</p><div className='d-flex justify-content-center range-box'><p className='mb-0-p'>{value[1]}</p></div></div>
            </div>
            
            <Slider
              getAriaLabel={() => 'Temperature range'}
              min={minVal}
              max={maxVal}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              sx={{
                color: '#1976d2',
                '& .MuiSlider-thumb': {
                  backgroundColor: '#a01e20',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#a01e20',
                  border: "1px solid #a01e20"
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#a01e20',
                },
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <button className='filter-btn' onClick={() => handleSubmit({activeBrandIndices,activeCategoriesIndices,activeSubCategoriesIndices,value})} type='button'>Apply Now</button>
    </div>
  );
}
