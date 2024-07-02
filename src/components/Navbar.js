import React from 'react'
import './Navbar.css';
import CitiesSearch from './CitiesSearch'    ;
import Autocomplete from './autocomplete';

import { useState } from 'react';







const Navbar = ({handleResult,setLocation}) => {
  
  const fetchSuggestions = async (value) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=4f09ff227c7660603a5c858137c207fc`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    const results = result.filter((user) => {
                return (
                    value &&
                    user &&
                    user.name &&
                    user.name.toLowerCase().includes(value.toLowerCase())
                );
            });

            return results;
            
  };  

  setInterval(() => {
  const currentDate = new Date();
 
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const dayindex = currentDate.getDay();
const dayname = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthindex = (currentDate.getMonth());
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const year = currentDate.getFullYear().toString();

const formattedDateTime = `${dayname[dayindex]}, ${day}\ ${month[monthindex]}\, ${year}`;

document.getElementById("date").innerHTML = formattedDateTime;
}, 1000);


  return (


    <div className='navcontainer'>
        <div className="navwrapper">
          <div className="userpro">
            <div className="propic"></div>
            <div className="namecard">
              <div className="username">Hi, Cyrex!</div>
              <div className="date" id='date'>Sat, 08 June, 2024 </div>
            </div>
          </div>
        <Autocomplete
        placeholder={"Search..."}
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading...</>}
        onSelect={(res) => console.log(res)}
        caching={true}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
        setLocation={setLocation}
      />
        </div>
    </div>
    
  )
}

export default Navbar
