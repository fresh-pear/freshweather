import React from "react";


const WeatherFivedays = ({ timeWeather, isLoading }) => {

  if (isLoading) return <p>로딩 중...</p>;
  if (!timeWeather?.list || timeWeather.list.length === 0) {
    return <p>5일 치 날씨 데이터 없음</p>;
  }
  
  console.log("리스트",timeWeather.list)

  const weatherImages = {
    Clear: "./img/sun.png",
    Clouds: "./img/cloud.png",
    Mist: "./img/fog.png",
    Rain: "./img/heavyrain.png",
    Drizzle: "./img/rain.png",
    Snow: "./img/snow.png",
    Thunderstorm: "./img/thunder.png",
  };

  const dailyWeather = timeWeather.list.filter((_, index) => (index -5) % 8 === 0);


  // timeWeather.list 에는 3시간 간격으로 5일치 날씨 데이터(40개)가 있고 5일치 날씨에는 한개씩 날씨만 추출할 거니까 filter 쓴다!
  // 오후 3시을 기준 데이터로 할 거니까 8개 데이터 중 6번째 (index-5) 해주고 그걸 8로 나눈 나머지가 0인 경우를 찾는다!


  return (
    <div className="fivebox">
     <h2 className="day">
     <img src="./img/current.png" alt="current" />
     {timeWeather.city.name}</h2>
      {dailyWeather.map((day, index) => {
        const weatherType = day.weather[0].main;
        const imgSrc = weatherImages[weatherType] || "/img/default.png";
        const date = new Date(day.dt * 1000).toLocaleDateString("ko-KR", {
          weekday: "short",
          month: "numeric",
          day: "numeric",
        });

        return (
          <div key={index} className="day">
            <p className="day_text">{date}</p>
            <img className="day_img" src={imgSrc} alt={weatherType} />
            <p>{Math.round(day.main.temp)}°C</p>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherFivedays;
