/* eslint-disable react/prop-types */
import {useCallback, useEffect} from "react";
import {useState} from "react";
import SearchResList from "./SearchResList";
import debounce from "lodash/debounce";
import { FaSearch } from "react-icons/fa" 
import "./CitiesSearch.css";

const CitiesSearch = ({
    setLocation,
    staticData,
    
}) => {


 










    const [results, setResults] = useState([]);
    const [input, setInput] = useState("");


    


    const fetchData = (value) => {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=4f09ff227c7660603a5c858137c207fc`)
        .then((res) => res.json())
        .then((list) => {

            const results = list.filter((user) => {
                return (
                    value &&
                    user &&
                    user.name &&
                    user.name.toLowerCase().includes(value.toLowerCase())
                );
            });

            console.log(results);
            setResults(results);
        }).catch((err) => {
            console.error(err);
            
        });
    }; 
    const handleChange = (value) =>{
        value = value.trim()
        setInput(value)
        if (value === '') {
            document.getElementById('reslist').classList.add('listhide');
            return
        }else{
            document.getElementById('reslist').classList.remove('listhide');
        }
        fetchData(value);
        console.log(value);
    }

    const handleOnClick = (result) => {

        const resval =  `${result.name}, ${result.country}`;
        console.log(result);
        setInput(resval);
        document.getElementById('reslist').classList.add('listhide');
    }
      return (
    <div className="search-wrapper">
    <div className='inp-wrapper'>
      <FaSearch id="search-icon" />
      <input id='searchbar' type="text" placeholder='Search city...' value={input} onChange={(e) => handleChange(e.target.value)}/>
    </div>
    <div id='reslist' className='reslist'>
        {results.map((result,id) =>{
            return <button className='searchRes' key={id} onClick={() => {
                setLocation(result)
                handleOnClick(result) 
            }} resultname={result.name} >{result.name}, {result.country}</button>
        })}
    </div>
    </div>
  )



};

export default CitiesSearch

