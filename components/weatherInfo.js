import React, { useEffect, useState } from 'react';
import { View, Text} from 'react-native';

export default function Weatherinfo({ location }) {
  const [weatherCode, setWeatherCode] = useState(null);
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    //console.log("sää1")
    if (!location) return;

    const fetchWeather = async () => {
      const { latitude, longitude } = location;
     // console.log("sää2")
      const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&forecast_days=1`;

      try {
        const response = await fetch(URL);
        if (response.ok) {
          const json = await response.json();
          const currentHour = new Date().getHours();
          const temp = json.hourly.temperature_2m[currentHour];
          const code = json.hourly.weather_code[currentHour];

          setTemperature(temp);
          setWeatherCode(code);
        } else {
          console.log('Weather API error:', response.status);
        }
      } catch (error) {
        console.error('Fetch weather error:', error);
      }
    };

    fetchWeather();
  }, [location]);


//meteon sääkoodi lista
  const getWeatherEmoji = (code) => {
    if (code === 0) return '☀️'; 
    if (code === 1 || code === 2) return '🌤️'; 
    if (code === 3) return '☁️'; 
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 57) return '🌦️'; 
    if (code >= 61 && code <= 67) return '🌧️'; 
    if (code >= 71 && code <= 77) return '🌨️'; 
    if (code >= 80 && code <= 82) return '🌧️';
    if (code >= 85 && code <= 86) return '🌨️'; 
    if (code >= 95 && code <= 99) return '⛈️'; 
    return '❓'; 
  };


  return (
    <>{weatherCode !== null && (
      <Text style={{ color: 'white', fontSize: 18 }}>
        {getWeatherEmoji(weatherCode)} | {temperature}°C
      </Text>
    )}</>
  );
}
