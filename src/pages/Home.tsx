import { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { useCitySearch } from "../hooks/useCitySearch";
import { useFavorites } from "../hooks/useFavorites";
import RainEffect from "../components/RainEffect";
import SunnyEffect from "../components/SunnyEffect";
import MildSunnyEffect from "../components/MildSunnyEffect";
import UmbrellaCharacter from "../components/UmbrellaCharacter";

const getMoodMessage = (tempC: number, conditionText: string) => {
  const condition = conditionText.toLowerCase();

  if (condition.includes("rain") || condition.includes("drizzle")) {
    return "Grab an umbrella, it's gonna pour! ☔";
  }
  if (condition.includes("thunder") || condition.includes("storm")) {
    return "Stay indoors, storm's brewing! ⛈️";
  }
  if (condition.includes("snow")) {
    return "Bundle up, it's snowing! ❄️";
  }
  if (condition.includes("fog") || condition.includes("mist")) {
    return "Drive safe, visibility is low! 🌫️";
  }
  if (tempC >= 35) {
    return "Scorching hot, stay hydrated! 🥵";
  }
  if (tempC >= 25) {
    return "Perfect day for chai on the balcony! ☕";
  }
  if (tempC >= 15) {
    return "Nice and mild, enjoy the day! 🙂";
  }
  return "Chilly out there, wear a jacket! 🧥";
};

const getAqiLabel = (index: number) => {
  const labels = [
    "",
    "Good",
    "Moderate",
    "Unhealthy (Sensitive)",
    "Unhealthy",
    "Very Unhealthy",
    "Hazardous",
  ];
  const colors = [
    "",
    "text-green-300",
    "text-yellow-300",
    "text-orange-300",
    "text-red-300",
    "text-purple-300",
    "text-rose-400",
  ];
  return {
    label: labels[index] || "Unknown",
    color: colors[index] || "text-white",
  };
};

const getBackgroundGradient = (conditionText: string, isDay: number) => {
  const condition = conditionText.toLowerCase();

  if (!isDay) {
    return "from-slate-900 via-indigo-950 to-black";
  }
  if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("thunder")
  ) {
    return "from-slate-600 via-slate-700 to-slate-900";
  }
  if (condition.includes("cloud") || condition.includes("overcast")) {
    return "from-blue-400 via-slate-400 to-slate-600";
  }
  if (condition.includes("snow")) {
    return "from-blue-100 via-blue-300 to-blue-500";
  }
  if (condition.includes("fog") || condition.includes("mist")) {
    return "from-gray-400 via-gray-500 to-gray-600";
  }
  return "from-sky-400 via-blue-500 to-indigo-700";
};

const formatHour = (timeStr: string) => {
  const date = new Date(timeStr);
  return date.toLocaleTimeString("en-US", { hour: "numeric" });
};

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("Islamabad");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const { data: weather, isLoading, isError } = useWeather(selectedCity);
  const { data: searchResults } = useCitySearch(searchInput);
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useFavorites();

  const aqiIndex = weather?.current.air_quality?.["us-epa-index"];
  const aqiInfo = aqiIndex ? getAqiLabel(aqiIndex) : null;

  const backgroundGradient = weather
    ? getBackgroundGradient(
        weather.current.condition.text,
        weather.current.is_day
      )
    : "from-blue-500 to-indigo-800";

  const isRainy = weather
    ? weather.current.condition.text.toLowerCase().includes("rain") ||
      weather.current.condition.text.toLowerCase().includes("drizzle")
    : false;

  const isSunnyCondition = weather
    ? weather.current.condition.text.toLowerCase().includes("sunny") ||
      weather.current.condition.text.toLowerCase().includes("clear")
    : false;

  const isVeryHotSunny =
    isSunnyCondition && weather ? weather.current.temp_c >= 33 : false;

  const isMildSunny =
    isSunnyCondition && weather ? weather.current.temp_c < 33 : false;

  const isCloudyWithRainChance = weather
    ? weather.current.condition.text.toLowerCase().includes("cloud") &&
      weather.forecast.forecastday[0].day.daily_chance_of_rain >= 40
    : false;

  const currentIsFavorite = weather
    ? isFavorite(weather.location.name)
    : false;

  const handleToggleFavorite = () => {
    if (!weather) return;
    if (currentIsFavorite) {
      const fav = favorites.find(
        (f) =>
          f.cityName.toLowerCase() === weather.location.name.toLowerCase()
      );
      if (fav) removeFavorite(fav.id);
    } else {
      addFavorite(weather.location.name);
    }
  };

  return (
    <div
      className={`relative overflow-hidden min-h-screen bg-linear-to-br ${backgroundGradient} flex flex-col items-center p-6 transition-all duration-1000`}
    >
      {isRainy && <RainEffect />}
      {isVeryHotSunny && <SunnyEffect />}
      {isMildSunny && <MildSunnyEffect />}
      {isCloudyWithRainChance && <UmbrellaCharacter />}

      {/* Search Bar */}
      <div className="w-full max-w-sm relative z-30">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search city..."
          className="w-full p-2.5 rounded-lg outline-none text-white placeholder-white/70 bg-white/20 backdrop-blur-md border border-white/30 focus:border-white/60 transition text-sm"
        />

        {searchResults && searchResults.length > 0 && (
          <ul className="absolute w-full bg-white/95 backdrop-blur-md rounded-lg mt-1 shadow-2xl z-30 overflow-hidden max-h-60 overflow-y-auto">
            {searchResults.map((city) => (
              <li
                key={city.id}
                onClick={() => {
                  setSelectedCity(city.name);
                  setSearchInput("");
                  setSelectedDay(null);
                }}
                className="p-2.5 hover:bg-blue-100 cursor-pointer text-black transition text-sm"
              >
                {city.name}, {city.region}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Favorites List */}
      {favorites.length > 0 && (
        <div className="w-full max-w-sm flex gap-2 flex-wrap mt-3 relative z-10">
          {favorites.map((fav) => (
            <button
              key={fav.id}
              onClick={() => {
                setSelectedCity(fav.cityName);
                setSelectedDay(null);
              }}
              className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition"
            >
              ⭐ {fav.cityName}
            </button>
          ))}
        </div>
      )}

      {/* Weather Display */}
      <div className="mt-6 text-white text-center w-full max-w-sm relative z-10">
        {isLoading && <p>Loading weather...</p>}
        {isError && <p>City not found. Try again.</p>}

        {weather && (
          <div className="backdrop-blur-md bg-white/20 rounded-2xl p-5 relative">
            {/* Favorite Star Button */}
            <button
              onClick={handleToggleFavorite}
              className="absolute top-3 right-3 text-xl"
              aria-label="Toggle favorite"
            >
              {currentIsFavorite ? "⭐" : "☆"}
            </button>

            <h1 className="text-2xl font-bold">{weather.location.name}</h1>
            <p className="text-sm opacity-90">{weather.location.country}</p>

            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="mx-auto w-16 h-16"
            />

            <p className="text-5xl font-bold">{weather.current.temp_c}°C</p>
            <p className="text-base">{weather.current.condition.text}</p>

            {/* Mood Message */}
            <p className="text-xs italic mt-1.5 opacity-90">
              {getMoodMessage(
                weather.current.temp_c,
                weather.current.condition.text
              )}
            </p>

            <div className="flex justify-around gap-3 mt-4 text-xs">
              <p>Humidity: {weather.current.humidity}%</p>
              <p>Wind: {weather.current.wind_kph} kph</p>
              <p>UV: {weather.current.uv}</p>
            </div>

            {/* AQI Card */}
            {aqiInfo && (
              <div className="mt-3 bg-white/20 rounded-lg p-2.5">
                <p className="text-[11px] opacity-80">Air Quality</p>
                <p className={`text-xs font-semibold ${aqiInfo.color}`}>
                  {aqiInfo.label}
                </p>
              </div>
            )}

            {/* Hourly Forecast */}
            <div className="mt-4 w-full">
              <h2 className="text-xs font-semibold mb-1.5 text-left">
                Hourly Forecast
              </h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {weather.forecast.forecastday[0].hour
                  .filter(
                    (h) => new Date(h.time) >= new Date(Date.now() - 3600000)
                  )
                  .slice(0, 12)
                  .map((h) => (
                    <div
                      key={h.time}
                      className="flex-0 bg-white/20 backdrop-blur-md rounded-md p-2 text-center w-14"
                    >
                      <p className="text-[9px]">{formatHour(h.time)}</p>
                      <img
                        src={h.condition.icon}
                        alt={h.condition.text}
                        className="mx-auto w-6 h-6"
                      />
                      <p className="text-[10px] font-semibold">
                        {Math.round(h.temp_c)}°
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* 3-Day Forecast */}
            <div className="mt-4 w-full">
              <h2 className="text-xs font-semibold mb-1.5 text-left">
                7-Day Forecast
              </h2>
              <div className="flex gap-1.5 overflow-x-auto pb-2">
                {weather.forecast.forecastday.map((day, index) => (
                  <button
                    key={day.date}
                    onClick={() =>
                      setSelectedDay(selectedDay === index ? null : index)
                    }
                    className={`shrink-0 backdrop-blur-md rounded-md p-1.5 text-center w-11 transition ${
                      selectedDay === index
                        ? "bg-white/40 ring-1 ring-white"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    <p className="text-[9px]">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <img
                      src={day.day.condition.icon}
                      alt={day.day.condition.text}
                      className="mx-auto w-5 h-5"
                    />
                    <p className="text-[9px] font-semibold">
                      {Math.round(day.day.maxtemp_c)}°
                    </p>
                    <p className="text-[8px] opacity-80">
                      {Math.round(day.day.mintemp_c)}°
                    </p>
                  </button>
                ))}
              </div>

              {/* Selected Day Detail */}
              {selectedDay !== null && (
                <div className="mt-3 bg-white/20 backdrop-blur-md rounded-lg p-3 text-left text-xs space-y-1">
                  <p className="font-semibold text-sm mb-1">
                    {new Date(
                      weather.forecast.forecastday[selectedDay].date
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    {
                      weather.forecast.forecastday[selectedDay].day.condition
                        .text
                    }
                  </p>
                  <p>
                    Max:{" "}
                    {Math.round(
                      weather.forecast.forecastday[selectedDay].day.maxtemp_c
                    )}
                    °C{"  "}Min:{" "}
                    {Math.round(
                      weather.forecast.forecastday[selectedDay].day.mintemp_c
                    )}
                    °C
                  </p>
                  <p>
                    Chance of rain:{" "}
                    {
                      weather.forecast.forecastday[selectedDay].day
                        .daily_chance_of_rain
                    }
                    %
                  </p>
                </div>
              )}
            </div>

            {/* Sun & Moon */}
            <div className="mt-4 w-full bg-white/20 rounded-lg p-3">
              <h2 className="text-xs font-semibold mb-2 text-left">
                Sun & Moon
              </h2>
              <div className="flex justify-around text-xs">
                <div className="text-center">
                  <p className="text-lg">🌅</p>
                  <p className="text-[10px] opacity-80">Sunrise</p>
                  <p className="font-semibold text-[11px]">
                    {weather.forecast.forecastday[0].astro.sunrise}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg">🌇</p>
                  <p className="text-[10px] opacity-80">Sunset</p>
                  <p className="font-semibold text-[11px]">
                    {weather.forecast.forecastday[0].astro.sunset}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg">🌙</p>
                  <p className="text-[10px] opacity-80">Moon Phase</p>
                  <p className="font-semibold text-[11px]">
                    {weather.forecast.forecastday[0].astro.moon_phase}
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-4 w-full rounded-lg overflow-hidden border border-white/20">
              <iframe
                key={`${weather.location.lat}-${weather.location.lon}`}
                title="City Map"
                width="100%"
                height="180"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  weather.location.lon - 0.1
                }%2C${weather.location.lat - 0.1}%2C${
                  weather.location.lon + 0.1
                }%2C${weather.location.lat + 0.1}&layer=mapnik&marker=${
                  weather.location.lat
                }%2C${weather.location.lon}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;