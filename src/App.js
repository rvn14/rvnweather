import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
// import * as Unicons from '@iconscout/react-unicons';
import Navbar from './components/Navbar';
import WeatherFetch from './components/WeatherFetch';
import Card from './components/card';
import Weather from './components/Weather';


function App() {


  const [location, setLocation] = useState();
  const [weath,setWeath] = useState();
  

  let handleResult = (result) => {
    console.log(result);
  }



  return (
    <div className="bgcontainer">
      <div className="preloader" id='preloader'></div>
      <div className='preloader'><Weather weath = {weath}/></div>
      
    </div>
  );
}

export default App;
