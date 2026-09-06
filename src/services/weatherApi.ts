import axios from "axios";

const BASE_URL = "https://api.weatherapi.com/v1";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

// Current weather + forecast (includes AQI + UV)
export const getWeatherByCity = async (city: string) => {
  const response = await weatherApi.get("/forecast.json", {
    params: {
      q: city,
      days: 7,
      aqi: "yes",
      alerts: "no",
    },
  });
  return response.data;
};

// City search / autocomplete
export const searchCities = async (query: string) => {
  const response = await weatherApi.get("/search.json", {
    params: {
      q: query,
    },
  });
  return response.data;
};