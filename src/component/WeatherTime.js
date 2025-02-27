import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const WeatherTime = ({ timeWeather, isLoading }) => {
  console.log("timeWeather 데이터:", timeWeather);
  if (isLoading) return <p>로딩 중...</p>;
  if (!timeWeather) return <p>시간별 날씨 데이터 없음</p>;

  const weatherImages = {
    Clear: "./img/sun.png",
    Clouds: "./img/cloud.png",
    Mist: "./img/fog.png",
    Heavyrain: "./img/heavyrain.png",
    Rain: "./img/rain.png",
    Drizzle: "./img/rain.png",
    Snow: "./img/snow.png",
    Thunderstorm: "./img/thunder.png",
  };

  const hourlyWeather = timeWeather.list.slice(0, 8);
  
  return (
    <div className="weather_time">
      <Swiper
        slidesPerView={3.6} 
        spaceBetween={10}  
        freeMode={true}
        pagination={false}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {hourlyWeather.map((hour, index) => {
          const weatherType = hour.weather[0].main;
          const imgSrc = weatherImages[weatherType] || "/img/default.png";

          return (
            <SwiperSlide key={index}> 
              <div className="hour">
                <p>{hour.dt_txt.split(" ")[1].slice(0, 5)}</p>
                <img src={imgSrc} alt={weatherType} />
                <p>{Math.round(hour.main.temp)}°C</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default WeatherTime;
