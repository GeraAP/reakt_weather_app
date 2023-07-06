import "./.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function searchCity(city){
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherSearch);
  }
  
  function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
     if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [ "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  
  }
  
  
  function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
  return days[day];
  }
  function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElemet = document.querySelector("#weather-forecast");
  
    let forecastHTML = `<div class="row">`;
   forecast.forEach(function (forecastDay , index){ 
    if (index < 6){
   forecastHTML = forecastHTML +
   ` <div class="col-sm-2"> 
   <div class="weekly-forecast" id="weather-forecast">
    <div class="forecast-days">${formatDay(forecastDay.time)}</div>  
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" 
        alt="" 
        class="img-fluid weekly-icon"
        width="80px">
          <div class="forecast-temp">
              <span class="max-temp">${Math.round(forecastDay.temperature.maximum)}° </span>
              <span class="min-temp"> | ${Math.round(forecastDay.temperature.minimum)}°</span>
              </div>
          </div>  
      </div>
   `;
    }
    });
  forecastHTML = forecastHTML + `</div>`;
  forecastElemet.innerHTML = forecastHTML;
  }
  
  
  function getForecast(coordinates){
    let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`
  
    axios.get(apiUrl).then(displayForecast);
  }
  
   function displayWeatherSearch(response){
  celsiusTemperature =  response.data.temperature.current
  document.querySelector("#city-input").innerHTML = response.data.city;
  document.querySelector("#temperature-link").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.condition.description;
  document.querySelector("#current-date").innerHTML = formatDate(response.data.time * 1000);
  document.querySelector("#real-feel").innerHTML = Math.round(response.data.temperature.feels_like);
  document.querySelector("#big-icon").setAttribute("src" , response.data.condition.icon_url);
  document.querySelector("#big-icon").setAttribute("alt" , response.data.condition.description);
  
  getForecast(response.data.coordinates);
  
  };
  
   
  function searchSubmit(event){
    event.preventDefault();
  
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
  };
  
  function searchLocation(position){
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherSearch);
  }
  
  
  function getLocalWeather(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  
  function displayCelsiusTemp(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature-link");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  
  let searchForm = document.querySelector("#input-form");
  searchForm.addEventListener("submit", searchSubmit);
  
  let currentLocationButton = document.querySelector("#current-button")
  currentLocationButton.addEventListener("click", getLocalWeather);
  
  let searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", searchSubmit);
  
  searchCity("Krakow");
  