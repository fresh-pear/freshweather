import React from 'react';

const weatherImages = {
  Clear: "./img/sun.png",
  Clouds: "./img/cloud.png",
  Mist: "./img/fog.png",
  Rain: "./img/heavyrain.png",
  Drizzle: "./img/rain.png",
  Snow: "./img/snow.png",
  Thunderstorm: "./img/thunder.png",
};

const WeatherSearch = ({ cityWeather, cityLoading }) => {
  if (cityLoading) {
    return <p>로딩 중...</p>;
  }

  if (!cityWeather) {
    return <img className="search_img" src="./img/search2.png" alt="search" />;
  }

  const weatherMain = cityWeather.weather[0].main;
  const weatherImage = weatherImages[weatherMain] || "./img/default.png";

  return (
    <div className="search_detail">
      <h2 className="search_title">{cityWeather.name}</h2>
      <div className="search_box">
        <img className="search_weatherimg" src={weatherImage} alt={weatherMain} />
        <div className="search-text">
          <p>온도
            <span>{Math.round(cityWeather.main.temp - 273.15)}°C</span>
          </p>
          <p>날씨
            <span>{cityWeather.weather[0].main}</span>
          </p>
          <p>습도
            <span>{cityWeather.main.humidity}%</span>
          </p>
          <p>풍속
            <span>{cityWeather.wind.speed} m/s</span>
          </p>
        </div>

      </div>

    </div>
  );
};

export default WeatherSearch;
