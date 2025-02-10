import { useState, useEffect } from "react";
import { WiBarometer } from "react-icons/wi";
import { PiWindLight, PiDropLight } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import Geolocation from "./Geolocation"; // Adjust the path as necessary
import axios from "axios";

function Currweather() {
  // State to hold the fetched data
  const [location, setLocation] = useState(null); // Holds the selected location object
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  // State for showing/hiding the preloader
  const [showPreloader, setShowPreloader] = useState(true);

  console.log("Selected location:", location);

  // Fetch current weather and forecast data using provided location data
  async function fetchData(citydata) {
    console.log("citydata", citydata);
    try {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${citydata.lat}&lon=${citydata.lon}&units=metric&appid=4f09ff227c7660603a5c858137c207fc`
        )
        .then((res) => {
          setWeatherData(res.data);
        });
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${citydata.lat}&lon=${citydata.lon}&units=metric&appid=4f09ff227c7660603a5c858137c207fc`
        )
        .then((res) => {
          setForecastData(res.data);
        });
      console.log("weatherdata", weatherData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Get user's current location using the Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Once the location is set, fetch weather and forecast data
  useEffect(() => {
    if (location && location.lat !== undefined && location.lon !== undefined) {
      fetchData(location);
    }
  }, [location]);

  // Smoothly fade out the preloader when all data is loaded
  useEffect(() => {
    if (location && weatherData && forecastData) {
      // Wait 500ms to allow for a smooth transition
      const timer = setTimeout(() => {
        setShowPreloader(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location, weatherData, forecastData]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      if (hours === 0) hours = 12;
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes} <span id="timeState">${ampm}</span>`;
      const timeElement = document.getElementById("time");
      if (timeElement) {
        timeElement.innerHTML = formattedTime;
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper functions for formatting dates and times
  function formatTime(dt) {
    const dateObj = new Date(dt * 1000);
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedTime}`;
  }

  function getOrdinal(day) {
    let suffix = "th";
    if (day % 100 < 11 || day % 100 > 13) {
      switch (day % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          suffix = "th";
      }
    }
    return day + suffix;
  }

  function formatDate(dt) {
    const dateObj = new Date(dt * 1000);
    const weekday = dateObj.toLocaleString("en-US", { weekday: "long" });
    const day = dateObj.getDate();
    const formattedDay = getOrdinal(day);
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    const year = dateObj.getFullYear();
    const formattedDate = `${weekday}, ${formattedDay} ${month} ${year}`;
    return `${formattedDate}`;
  }

  function formatShortDate(dt) {
    const dateObj = new Date(dt * 1000);
    const day = dateObj.getDate();
    const formattedDay = getOrdinal(day);
    const month = dateObj.toLocaleString("en-US", { month: "short" });
    const formattedDate = `${formattedDay} ${month}`;
    return `${formattedDate}`;
  }

  return (
    <div className="bgrnd absolute top-0 w-full flex flex-col ">
      {/* Preloader with black background and animated loading text */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500 ${
          showPreloader ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="text-white font-mont text-2xl animate-pulse"><p className="text-center">RVN Weather <br/> <span className="text-xl font-light">Loading...</span>  </p></div>
      </div>

      <div className="searchbar absolute w-full mt-6 flex bg-transparent">
        <Geolocation setLocation={setLocation} />
      </div>

      <div className="currcont m-16 flex justify-between items-center bg-transparent">
        <div className="currweath flex justify-between w-[500px] mt-10">
          <div>
            <div>
              <img
                src={
                  weatherData
                    ? `./images/assets/${weatherData.weather[0].icon}.png`
                    : `./images/assets/01d.png`
                }
                alt=""
                className="weathicon w-24 pl-4"
              />
            </div>
            <div className="weathstat pl-2 text-5xl font-inter text-gray-50">
              {weatherData ? weatherData.weather[0].main : `Sunny`}
            </div>
            <div className="temp pl-3 text-lg font-light font-inter text-gray-50 flex items-center">
              <FaLocationDot className="text-xl pr-2 font-extralight text-gray-50" />
              {weatherData
                ? `${weatherData.name}, ${weatherData.sys.country}`
                : `State, Country`}
            </div>
            <div className="temp p-3 text-6xl font-inter font-bold text-gray-50">
              {weatherData ? Math.floor(weatherData.main.temp) : `00`}°C
            </div>
            <div className="temp pl-3 font-inter font-light text-gray-50">
              Feels like{" "}
              {weatherData ? Math.floor(weatherData.main.feels_like) : `00`}°C
            </div>
          </div>

          <div className="datentime mt-6">
            <div className="fctime font-inter text-gray-50">
              {weatherData ? formatDate(weatherData.dt) : `Long Date`}
            </div>
            <div className="fctime font-mont text-6xl font-bold text-gray-50">
              {weatherData ? formatTime(weatherData.dt) : `00:00 PM`}
            </div>
            <div className="font-mont font-light text-gray-50">
              Sunrise -{" "}
              {weatherData ? formatTime(weatherData.sys.sunrise) : `00:00 PM`}
            </div>
            <div className="font-mont font-light text-gray-50">
              Sunset -{" "}
              {weatherData ? formatTime(weatherData.sys.sunset) : `00:00 PM`}
            </div>

            <div className="minmaxtemp mt-6">
              <div className="flex items-center">
                <div className="temp font-light text-gray-50">Min Temp.</div>
                <div className="temp pl-2 font-inter font-bold text-gray-50">
                  {weatherData ? Math.floor(weatherData.main.temp_min) : `00`}°C
                </div>
              </div>
              <div className="flex items-center">
                <div className="temp font-light text-gray-50">Max Temp.</div>
                <div className="temp pl-2 font-inter font-bold text-gray-50">
                  {weatherData ? Math.floor(weatherData.main.temp_max) : `00`}°C
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="currdet rounded-2xl p-8">
          <div className="detchild flex">
            <PiDropLight className="detico text-5xl mt-2 font-extralight text-gray-50" />
            <div>
              <div className="detdata temp pl-5 text-lg text-gray-50 font-light">
                Humidity
              </div>
              <div className="detdata temp pl-5 text-4xl font-inter font-bold text-gray-50">
                {weatherData ? Math.floor(weatherData.main.humidity) : `00`}%
              </div>
            </div>
          </div>
          <div className="detchild flex mt-10">
            <WiBarometer className="detico text-5xl font-extralight text-gray-50" />
            <div>
              <div className="detdata temp pl-5 text-lg text-gray-50 font-light">
                Pressure
              </div>
              <div className="detdata temp pl-5 font-inter text-4xl font-bold text-gray-50">
                {weatherData ? Math.floor(weatherData.main.pressure) : `00`} mb
              </div>
            </div>
          </div>
          <div className="detchild flex mt-10">
            <PiWindLight className="detico text-5xl font-extralight text-gray-50" />
            <div>
              <div className="detdata temp pl-5 text-lg text-gray-50 font-light">
                Wind
              </div>
              <div className="detdata temp pl-5 font-inter text-4xl font-bold text-gray-50">
                {weatherData ? weatherData.wind.speed : `00`} kmph
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="forecasts m-16 flex justify-between bg-transparent">
        {forecastData ? (
          // Render first 6 forecast entries dynamically using map()
          forecastData.list.slice(0, 6).map((forecast, index) => (
            <div
              key={index}
              className="forecastchild w-48 h-56 flex flex-col items-center justify-center rounded-2xl bg-[#ffffff18]"
            >
              <div className="fctime flex flex-col items-center justify-center">

                <div className="fctime font-mont font-light text-xs text-gray-50">
                  {formatShortDate(forecast.dt)}
                </div>
                <div className="fctime font-mont font-semibold text-gray-50">
                  {formatTime(forecast.dt)}
                </div>
              </div>
              <div className="fcimg flex flex-col items-center justify-center">

                <img
                  src={`./images/assets/${forecast.weather[0].icon}.png`}
                  alt={forecast.weather[0].description}
                  className="weathicon w-16"
                />
                <div className="temp text-lg font-inter text-gray-50">
                  {forecast.weather[0].main}
                </div>
              </div>
              <div className="temp text-4xl font-inter font-bold text-gray-50">
                {Math.floor(forecast.main.temp)}°C
              </div>
            </div>
          ))
        ) : (
          // Render placeholders if forecastData is not yet available.
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-48 h-56 flex flex-col items-center justify-center rounded-2xl bg-[#ffffff18]"
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Currweather;