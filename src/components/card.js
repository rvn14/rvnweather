import React,{useState} from 'react'
import './card.css';


const Card = ({weath}) => {
    console.log("this is weath");
    console.log(weath);
    

  return (
    <div>
      <div class="cardContainer">
  <div class="card">
    <p class="city">{weath ? weath.name.toUpperCase() : "Loading..."}</p>
    <p class="weather">{weath ? weath.weather[0].description.toUpperCase() : "Loading..."}</p>
    <svg
      class="weather"
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      width="50px"
      height="50px"
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
    <p class="temp">{weath ? Math.floor(weath.main.temp) : "Loading..."}°</p>
    <div class="minmaxContainer">
      <div class="min">
        <p class="minHeading">Min</p>
        <p class="minTemp">30°</p>
      </div>
      <div class="max">
        <p class="maxHeading">Max</p>
        <p class="maxTemp">32°</p>
      </div>
    </div>
  </div>
</div>


    </div>
  )
}

export default Card
