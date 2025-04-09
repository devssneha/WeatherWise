import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import SearchHistory from './components/SearchHistory';
import ThemeToggle from './components/ThemeToggle';
import ForecastDisplay from './components/ForecastDisplay';
import './App.css';
import MountainBg from './assets/MountainBg.jpg';
import DarkModeBg from './assets/DarkModeBg.jpg';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  
  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`City not found or API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      setWeatherData(data);
      
      updateSearchHistory(city);
      
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };
  
  const updateSearchHistory = (city) => {
    setSearchHistory(prevHistory => {
      
      const filteredHistory = prevHistory.filter(item => item.toLowerCase() !== city.toLowerCase());
      
      return [city, ...filteredHistory].slice(0, 5);
    });
  };
  
  const handleHistoryItemClick = (city) => {
    fetchWeatherData(city);
  };
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    // Toggle dark mode class
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    //Changing the background as per theme
    if (isDarkMode) {
      document.body.style.backgroundImage = `url(${DarkModeBg})`;
    } else {
      document.body.style.backgroundImage = `url(${MountainBg})`;
    }
    
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${isDarkMode ? 'dark:text-white' : 'text-gray-900'}`}>
      <div className="max-w-3xl mx-auto bg-white/40 dark:bg-gray-900/80 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">WeatherWise</h1>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>
        
        <SearchBar onSearch={fetchWeatherData} />
        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {weatherData && !loading && <WeatherDisplay weatherData={weatherData} />}
        {weatherData && !loading && (
          <ForecastDisplay city={weatherData.name} apiKey={API_KEY} />
        )}
        
        {searchHistory.length > 0 && (
          <SearchHistory history={searchHistory} onHistoryItemClick={handleHistoryItemClick} />
        )}
      </div>
    </div>
  );
}

export default App;