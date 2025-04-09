import { useState } from 'react';

function WeatherDisplay({ weatherData }) {
  const [refreshing, setRefreshing] = useState(false);
  
  if (!weatherData) return null;
  
  const {
    name,
    sys: { country },
    main: { temp, humidity },
    weather: [{ description, icon }],
    wind: { speed }
  } = weatherData;
  
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const windSpeedKmh = (speed * 3.6).toFixed(1); // Convert m/s to km/h
  
  const handleRefresh = async () => {
    setRefreshing(true);
    // Wait for 1 second to simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };
  return (
    <div className="my-6 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{name}, {country}</h2>
          <p className="text-gray-600 dark:text-gray-300 capitalize">{description}</p>
        </div>
        <button 
          onClick={handleRefresh} 
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
          disabled={refreshing}
        >
          <svg 
            className={`w-5 h-5 text-blue-500 ${refreshing ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="flex items-center">
          <img src={iconUrl} alt={description} className="w-16 h-16" />
          <div className="text-4xl font-bold ml-2">{temp.toFixed(1)}°C</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
            <span>Humidity: {humidity}%</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            <span>Wind: {windSpeedKmh} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;