import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchWeathertime = async (lat,lon) => {
  const key = 'b10ee7f287c8752f70f116d450a369fe'
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
  );
  console.log("시간대별 응답:", response.data);
  return response.data;
};


export const useWeatherTime = (lat,lon) =>{
  return useQuery({
    queryKey:["weather","time", lat,lon],
    queryFn: ()=> fetchWeathertime(lat,lon),
    staleTime: 1000*60*5,
    enabled: !!lat && !!lon
  })
}