import React from 'react';
import WeatherTime from './WeatherTime';

const Weatherbox = ({ weather, currentLoading, timeWeather, timeLoading }) => {

  if (currentLoading) {
    return <p>Loading...</p>
  };

  if (!weather) {
    return <p>날씨 정보를 가져올 수 없습니다.</p>
  };

  const weatherImages = {
    Clear: "./img/weather-19.png",
    Clouds: "./img/weather-22.png",
    Mist: "./img/weather-24.png",
    Rain: "./img/weather-25.png",
    Drizzle: "./img/weather-21.png",
    Snow: "./img/weather-23.png",
    Thunderstorm: "./img/weather-20.png",
  };

  const weatherIcon = weatherImages[weather.weather[0].main] || "./img/weather-22.png";

  return (
    <div className="weatherbox">
      <div className="wb_title">
        <img src="./img/current.png" alt="current" />
        <h2>{weather.name}</h2>
      </div>

      <div className="weatherbox_inner">
        <img src={weatherIcon} alt="weather" />
        <div className="wb_text_left">
          <h2>{Math.round(weather.main.temp - 273.15)}°C</h2>
          <p>L {Math.round(weather.main.temp_min - 273.15)}°C</p>
          <p>H {Math.round(weather.main.temp_max - 273.15)}°C</p>
        </div>
        <div className="wb_text_right">
          <p>{weather.weather[0].main}</p>
        </div>
      </div>
      <div className="wb_detail">
        <p>오늘의 체감 기온은 {Math.round(weather.main.feels_like- 273.15)}°C 이며,</p>
        <p>습도는 {weather.main.humidity}% , 풍속은 {weather.wind.speed} m/s 입니다.</p>

        <div className="line"></div>

        {timeLoading ? (
          <p>로딩 중...</p>
        ) : (
          <WeatherTime timeWeather={timeWeather} isLoading={timeLoading} />
        )}
      </div>
    </div>
  );
};

export default Weatherbox;
