export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  condition: Condition;
  humidity: number;
  wind_kph: number;
  uv: number;
  is_day: number;
  air_quality?: {
    "us-epa-index": number;
  };
}

export interface Location {
  name: string;
  region: string;
  country: string;
  localtime: string;
  lat: number;
  lon: number;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: Condition;
    daily_chance_of_rain: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moon_phase: string;
  };
  hour: {
    time: string;
    temp_c: number;
    condition: Condition;
  }[];
}

export interface WeatherResponse {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface CitySearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}