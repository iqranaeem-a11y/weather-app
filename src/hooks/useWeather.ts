import { useQuery } from "@tanstack/react-query";
import { getWeatherByCity } from "../services/weatherApi";
import type { WeatherResponse } from "../types/weather";

export const useWeather = (city: string) => {
  return useQuery<WeatherResponse>({
    queryKey: ["weather", city],
    queryFn: () => getWeatherByCity(city),
    enabled: !!city, 
    staleTime: 1000 * 60 * 5, 
    retry: 1,
  });
};