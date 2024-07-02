import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherFetch.css'


const WeatherFetch = ({ location, setWeath }) => {
    
    const [data,setData] = useState();
    const citydata = location;

 async function fetchData(citydata) {
            console.log("in fetchdata");
            try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${citydata.lat}&lon=${citydata.lon}&units=metric&appid=4f09ff227c7660603a5c858137c207fc`).then((res) => {setData(res.data)});
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }

          
  
     }

    useEffect(()=>{
      console.log("in useeffect");
      console.log(citydata);
      
      fetchData(citydata);
    }, [citydata] )
    

    useEffect(() => {

        console.log("logged"); 
        console.log(data);
        setWeath(data);
        
      
    }, [data])
    


}




// console.log(citydata);

//         if (citydata) {
//             try {
//             const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${citydata.lat}&lon=${citydata.lon}&units=metric&appid=4f09ff227c7660603a5c858137c207fc`);
//             setData(response.data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
            
//         }

export default WeatherFetch;


