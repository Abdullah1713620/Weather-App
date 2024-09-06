import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloudy_icon from '../assets/cloudy.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import storm_icon from '../assets/storm.png'
import sun_icon from '../assets/sun.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import haze_icon from '../assets/haze.png'
import weather_icon from '../assets/weather.png'

const Weather = () => {
  const inputRef = useRef()

    const [weatherData, setweatherData] = useState(false)
    const allIcons = {
        "01d" : sun_icon,
        "01n" : sun_icon,
        "02d" : cloudy_icon,
        "02n" : cloudy_icon,
        "03d" : cloudy_icon,
        "03n" : cloudy_icon,
        "04d" : cloudy_icon,
        "04n" : cloudy_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "010d" : storm_icon,
        "010n" : storm_icon,
        "013d" : snow_icon,
        "013n" : snow_icon,
        "50d"  : haze_icon
    }

  const search = async (city)=>{
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    
    const response = await fetch (url);
    const data = await response.json();
    console.log(data)
    const icon = allIcons[data.weather[0].icon] || clear_icon;
    setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
    })

}catch (error) {
    }
  }   
   useEffect(()=>{
    search("Lahore");
   },[])

  return (
    <div className='weather'>
        <div className="search-bar">
        <input ref={inputRef} type='text' placeholder='Search'/>
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        <img src={weatherData.icon} alt='' className='weather-icon'/>
        <p className='temp'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather