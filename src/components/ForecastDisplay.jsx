import { useState, useEffect } from 'react';

function ForecastDisplay({ city, apiKey }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error(`The forecast data is currently not available: ${response.statusText}`);
        }
        
        const data = await response.json();
        // Getting one entry for each day
        const dailyData = processForecastData(data.list);
        setForecastData(dailyData);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchForecast();
  }, [city, apiKey]);

  const processForecastData = (forecastList) => {
    const dailyForecasts = {};
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000).toISOString().split('T')[0];
        
        const hour = new Date(item.dt * 1000).getHours();
        
        if (!dailyForecasts[date] || Math.abs(hour - 12) < Math.abs(new Date(dailyForecasts[date].dt * 1000).getHours() - 12)) {
          dailyForecasts[date] = item;
        }
      });
      
      // Converting it to and array and we take only the next 5 days
      return Object.values(dailyForecasts).slice(1, 6);
    };
  
    if (loading) {
      return (
        <div className="mt-6 text-center">
          <p>Loading forecast...</p>
        </div>
      );
    }
    if (error) {
        return (
          <div className="mt-6 text-center text-red-500">
            <p>{error}</p>
          </div>
        );
      }
    
      if (!forecastData || forecastData.length === 0) {
        return null;
      }
    
      // Formatting the day name from date
      const formatDay = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      };
      return (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {forecastData.map((day, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center transition-all duration-300"
              >
                <div className="font-medium">{formatDay(day.dt)}</div>
                <img 
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                  className="w-12 h-12"
                  style={{ filter: 'brightness(0.8)' }} 
                />
                <div className="font-bold">{Math.round(day.main.temp)}°C</div>
                <div className="text-xs capitalize text-gray-600 dark:text-gray-400">
                  {day.weather[0].description}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    export default ForecastDisplay;    