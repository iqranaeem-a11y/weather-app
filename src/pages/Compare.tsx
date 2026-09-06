import { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { useCitySearch } from "../hooks/useCitySearch";

interface CityCardProps {
  city: string;
  onCitySelect: (value: string) => void;
}

const CityWeatherCard = ({ city, onCitySelect }: CityCardProps) => {
  const [searchInput, setSearchInput] = useState("");
  const { data: weather, isLoading, isError } = useWeather(city);
  const { data: searchResults } = useCitySearch(searchInput);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 w-full relative">
      <div className="relative z-20">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search city..."
          className="w-full p-2.5 rounded-lg outline-none text-white placeholder-white/70 bg-white/20 border border-white/30 focus:border-white/60 transition text-sm text-center"
        />

        {searchResults && searchResults.length > 0 && (
          <ul className="absolute w-full bg-white/95 backdrop-blur-md rounded-lg mt-1 shadow-2xl z-30 overflow-hidden max-h-52 overflow-y-auto">
            {searchResults.map((result) => (
              <li
                key={result.id}
                onClick={() => {
                  onCitySelect(result.name);
                  setSearchInput("");
                }}
                className="p-2.5 hover:bg-blue-100 cursor-pointer text-black transition text-sm"
              >
                {result.name}, {result.region}, {result.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isLoading && <p className="text-center text-sm mt-4">Loading...</p>}
      {isError && (
        <p className="text-center text-sm mt-4">City not found</p>
      )}

      {weather && (
        <div className="text-center text-white mt-4">
          <h2 className="text-xl font-bold">{weather.location.name}</h2>
          <p className="text-xs opacity-80">{weather.location.country}</p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="mx-auto"
          />
          <p className="text-4xl font-bold">{weather.current.temp_c}°C</p>
          <p className="text-sm mb-3">{weather.current.condition.text}</p>

          <div className="text-xs space-y-1 opacity-90">
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind: {weather.current.wind_kph} kph</p>
            <p>UV: {weather.current.uv}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Compare = () => {
  const [cityA, setCityA] = useState("Islamabad");
  const [cityB, setCityB] = useState("Lahore");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-800 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Compare Cities</h1>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl">
        <CityWeatherCard city={cityA} onCitySelect={setCityA} />
        <CityWeatherCard city={cityB} onCitySelect={setCityB} />
      </div>
    </div>
  );
};

export default Compare;