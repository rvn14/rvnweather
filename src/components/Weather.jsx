import React from 'react'
import "./Weather.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
// import * as Unicons from '@iconscout/react-unicons';
import Navbar from './Navbar';
import WeatherFetch from './WeatherFetch';
import { FaWind } from "react-icons/fa";
import Card from './card';

function Weather() {

    const [location, setLocation] = useState();
    const [weath,setWeath] = useState();
    const [london, setLondon] = useState()
    const [tokyo, setTokyo] = useState()
    const [ny, setNy] = useState()
    const [sydney, setSydney] = useState()
    const [crrLoc, setCrrLoc] = useState({lat: 0, lon: 0})
    const [isLoaded, setIsLoaded] = useState(false)

    const elem = document.querySelector('.mcity');

     async function fetchData() {
            console.log("in fetchdata");
            try {
            
            const getCurrentPosition = () => {
                return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
                });
            }

            const lann = async () => {
                try {
                    const position = await getCurrentPosition();
                    console.log('Got position:');
                    setCrrLoc({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                    });
                    
                        } catch (error) {
                            console.error('Error getting location:', error);
                        }
            }
            lann();

            
    


            const lndn = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&units=metric&appid=4f09ff227c7660603a5c858137c207fc`).then((res) => {setLondon(res.data)});
            const tkyo = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=35.6895&lon=139.6917&units=metric&appid=4f09ff227c7660603a5c858137c207fc`).then((res) => {setTokyo(res.data)});
            const newyork = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=43.0004&lon=-75.4999&units=metric&appid=4f09ff227c7660603a5c858137c207fc`).then((res) => {setNy(res.data)});
            const sdney = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=-33.8679&lon=151.2073&units=metric&appid=4f09ff227c7660603a5c858137c207fc`).then((res) => {setSydney(res.data)});
            

            
          } catch (error) {
            console.error('Error fetching data:', error);
          }

          
  
     }

     async function setnowlocation(crrLoc) {
        const lndn = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crrLoc.lat}&lon=${crrLoc.lon}&units=metric&appid=4f09ff227c7660603a5c858137c207fc`).then((res) => {setWeath(res.data)});
        setIsLoaded(true);
    
    }



    useEffect(()=>{
      console.log("in useeffect");
      console.log();
      
      fetchData();
    }, [] )

    useEffect(() => { 
        console.log("logged"); 
        (crrLoc.lat > 0 && crrLoc.lon > 0) ? setnowlocation(crrLoc) : console.log("no location");

    }, [crrLoc])
  
    if (isLoaded) {
        document.getElementById('preloader').style.height = "0px";
    }
    

    let handleResult = (result) => {
    console.log(result);
    }

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

const formattedTime = `${hours}:${minutes} <span id='timeState'>PM</span>`;

document.getElementById("time").innerHTML = formattedTime;
}, 1000);

  return (
    <div>
      <div className="pageContainer">
      <div className="dropblur"></div>
      <Navbar handleresult = {handleResult} setLocation = {setLocation}></Navbar>
      <WeatherFetch location={location} setWeath = {setWeath} />
      <div className="weather-wrapper">
        <div className='currentweather'>
            <div className='citycurrweather'>
            <video src={weath ? `./images/bg/${weath.weather[0].icon}.mp4` : `./images/bg/sunny.mp4`} autoPlay muted loop className='video' type="video/mp4"></video>
                <div className='currweath'>
                    <div className='mweth'>
                        <div className='iconbox'>
                        <svg
                                    class="weather"
                                    version="1.1"
                                    id="Layer_1"
                                    x="0px"
                                    y="0px"
                                    width="100px"
                                    height="100px"
                                    viewBox="0 0 100 100"

                                    >
                                    <image
                                        id="image0"
                                        width="100"
                                        height="100"
                                        x="0"
                                        y="0"
                                        href={weath ? `./images/assets/${weath.weather[0].icon}.png` : `./images/assets/01d.png`}
                                    ></image>
                                    </svg>
                                <div className="minmax">Min.  Temp : {weath ? Math.floor(weath.main.temp_min) : "00"}°</div>
                                <div className="minmax">Max.  Temp : {weath ? Math.floor(weath.main.temp_max) : "00"}°</div>
                        </div>
                        <div className='cityname'>
                            <div className="mcity">{weath ? weath.name : "N/A"}</div>
                            <div className="mcountry">{weath ? weath.sys.country : "N/A"}</div>
                        </div>
                    </div>
                    <div className='mtemp'>
                        <div className='m-time' id='time'>04:04 </div>
                        <div className='m-temp'>{weath ? Math.floor(weath.main.temp) : "00"}°</div>
                        <div className='m-feel'>Feels Like : {weath ? Math.floor(weath.main.feels_like) : "00"}°</div>
                    </div>
                </div>
                <div className='wind'>
                    <div className='wind-wrapper'>
                        <FaWind />
                        <div>Wind</div>
                        <div>{weath ? Math.floor(weath.wind.speed * 3.6) : "00"} KMPH</div>
                    </div>
                    <div className='wind-wrapper'>
                        <FaWind />
                        <div>Pressure</div>
                        <div>{weath ? Math.floor(weath.main.pressure) : "00"} hPa</div>
                    </div>
                    <div className='wind-wrapper'>
                        <FaWind />
                        <div>Humidity</div>
                        <div>{weath ? Math.floor(weath.main.humidity) : "00"} %</div>
                    </div>
                </div>
            </div>
            <div className='forweath'>
                <div className="forweath-wrapper">
                    <div>TOKYO</div>
                    <div>Japan</div>
                    <img
                    
                        width="40px"
                        height="40px"
                        x="0"
                        y="0"
                        src={tokyo ? `./images/assets/${tokyo.weather[0].icon}.png` : `./images/assets/01d.png`}
                    ></img>
                    <div>{tokyo ? Math.floor(tokyo.main.temp) : "00"}°</div>
                </div>
                <div className="forweath-wrapper">
                    <div>NEW YORK</div>
                    <div>USA</div>
                    <img
                    
                        width="40px"
                        height="40px"
                        x="0"
                        y="0"
                        src={ny ? `./images/assets/${ny.weather[0].icon}.png` : `./images/assets/01d.png`}
                    ></img>
                    <div>{ny ? Math.floor(ny.main.temp) : "00"}°</div>
                </div>
                <div className="forweath-wrapper">
                    <div>LONDON</div>
                    <div>UK</div>
                    <img
                    
                        width="40px"
                        height="40px"
                        x="0"
                        y="0"
                        src={london ? `./images/assets/${london.weather[0].icon}.png` : `./images/assets/01d.png`}
                    ></img>
                    <div>{london ? Math.floor(london.main.temp) : "00"}°</div>
                </div>
                <div className="forweath-wrapper">
                    <div>SYDNEY</div>
                    <div>Australia</div>
                    <img
                    
                        width="40px"
                        height="40px"
                        x="0"
                        y="0"
                        src={sydney ? `./images/assets/${sydney.weather[0].icon}.png` : `./images/assets/01d.png`}
                    ></img>
                    <div>{sydney ? Math.floor(sydney.main.temp) : "00"}°</div>
                </div>
            </div>
        </div>
        <div className='forecast'>
            <div className='forecast-wrapper'>
                <div className="forecast-child">
                    <div>  </div>
                </div>
                <div className="forecast-child"></div>
                <div className="forecast-child"></div>
                <div className="forecast-child"></div>
                <div className="forecast-child"></div>
                <div className="forecast-child"></div>
                <div className="forecast-child"></div>
            </div>
        </div>
      </div>

      </div>
    </div>
  )
}

export default Weather
