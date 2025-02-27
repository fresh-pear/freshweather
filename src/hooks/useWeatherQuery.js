import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchWeather = async (city) => {
  console.log("city:",city)
  const key = 'b10ee7f287c8752f70f116d450a369fe'
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  );
  console.log(response.data);
  return response.data;
};

export const useWeatherQuery = (city) =>{
  return useQuery({
    queryKey:["weather","city", city],
    queryFn: ()=> fetchWeather(city),
    select: (data)=>data || {},
    staleTime: 1000*60*5,
    enabled: !!city
  })
}