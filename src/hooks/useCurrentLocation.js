import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCoords = async (lat, lon) =>{
  const key= 'b10ee7f287c8752f70f116d450a369fe';
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  );
  console.log("현재위치",lat,lon)
  return response.data;
}


export const useCurrentLocation = (lat,lon) =>{

  const isEnabled = lat !==null && lon !== null;

  return useQuery({
    queryKey:["weather", "coords", lat, lon],
    queryFn: ()=> fetchCoords(lat,lon),
    staleTime: 1000*60*5,
    enabled: isEnabled // 위도, 경도가 있을 때만
  })
}