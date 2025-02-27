import './App.css';
import { useState, useEffect } from 'react';
import Weatherbox from './component/Weatherbox';
import WeatherSearch from './component/WeatherSearch';
import WeatherFivedays from './component/WeatherFivedays';
import { useWeatherQuery } from './hooks/useWeatherQuery';
import { useCurrentLocation } from './hooks/useCurrentLocation';
import { useWeatherTime } from './hooks/useWeatherTime';



function App() {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [answer, setAnswer] = useState(["고민이 있다면", <br key="br1"/>,'소라고동에게 물어보세요!']);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        console.log()
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다", error)
      }
    );
  }, []);

  useEffect(()=> {
    fetch("./answer.json")
    .then((res) => res.json())
      .then((data) => {
        console.log("명언",data);
        setAnswers(data)
      })
      .catch((error) => console.error("error", error));
  }, []);

  const soragodong = () => {
    if (answers.length === 0) return; 
    const randomIndex = Math.floor(Math.random() * answers.length);
    setAnswer(answers[randomIndex].answer);
  };


  // 현재 날씨 훅
  const { data: weather, isLoading: currentLoading } = useCurrentLocation(
    coords.lat,
    coords.lon
  );

  // 날씨 검색 훅
  const { data: cityWeather, isLoading: cityLoading } = useWeatherQuery(city);


  //시간대별, 5일간 날씨 훅
  const { data: timeWeather = { list: [] }, isLoading: timeLoading } = useWeatherTime(
    coords.lat,
    coords.lon
  );
  

  return (
    <div className="wrap">

      <div className="header">
        <div className="header_i">
          <a href="http://localhost:3000/">
          <img className='logo' src="./img/logo.png" alt="logo" />
          </a>
          <h1>How’s The Weather ?</h1>
          <img className='sublogo' src="./img/sublogo.png" alt="sublogo" />
        </div>
      </div>

      <div className="wrap_i">

        <div className="main">

          {currentLoading ? (
            <p>로딩 중...</p>
          ) : (
            <Weatherbox weather={weather} isLoading={currentLoading} timeWeather={timeWeather}  timeLoading={timeLoading}/>
          )}


        </div>

        <div className="wrap_i_right">
          <div className="search">
            <input
              type="text"
              placeholder='지금, 날씨가 궁금한 곳은?'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {cityLoading ? (
              <p className="finding">찾는 중...</p>
            ) : (
              <WeatherSearch cityWeather={cityWeather} isLoading={cityLoading} />
            )}

          </div>

          <div className="wrap_i_right_bottom">
          <div className="daytime_Weather">
              <h2>5 Day's Weather</h2>
              <WeatherFivedays timeWeather={timeWeather}  timeLoading={timeLoading}/>
            </div>

            <div className="sora">
              <button onClick={soragodong}>
              <img className='sora_button' src="./img/sora.png" alt="sora" />
              </button>
              <p className='sora_answer'>{answer}</p>
            </div>

          </div>

          

        </div>
      </div>

      <div className="footer">
        <p>@fresh-pear Weather App</p>
      </div>





    </div>
  );
}

export default App;
