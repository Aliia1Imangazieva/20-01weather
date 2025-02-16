import React, { useState, useEffect } from "react";
import "./weather.scss"; 

function Weather() {
  const [city, setCity] = useState("Erevan");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "62f9e42b03d163507b0cdb56d144e489";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки погоды!");
        }
        const data = await response.json();
        setWeather({
          temp: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]); // Обновляем данные при смене города

  return (
    <div className="weather-widget">
      <h2>Погода в {city}</h2>

      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <img src={weather.icon} alt="Weather icon" />
          <p><strong>{weather.temp}°C</strong></p>
          <p>{weather.description}</p>
          <p>Влажность: {weather.humidity}%</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Введите город..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </div>
  );
}

export default Weather;