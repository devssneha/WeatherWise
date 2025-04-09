# WeatherWise
Fully functional weather dashboard made using ReactJS and tailwind CSS\
Uses the OpenWeatherMap API to fetch data that gets continuously refreshed\
-displays the current weather and date\
-shows history of last 5 searched cities\
-has toggle mode for light/dark themes with different backgrounds\
-gives forecast for next 5 days as well\
Deployed Vercel link: https://weather-wise-rust.vercel.app/

Tech stack used:\
1)For frontend\
  -ReactJS\
  -React hooks (useState, useEffect)\
  -JSX\ 
2)For styling\
	-Tailwind CSS\
3)For API integration\
	-current weather from https://api.openweathermap.org/data/2.5/weather \
	-forecast from https://api.openweathermap.org/data/2.5/forecast \
4)Build tool was vite

Setup instructions:\
1)Install node or npm\
2)Clone the repo from github\
3)Set up all dependencies\
4)Get API key and store it in .env file\
5)Run using:\
	cd <filename>\
	npm i\
	npm run dev\
6) This will start running on the localhost\

API details:\
1)Get API key from https://openweathermap.org/api?spm=a2ty_o01.29997173.0.0.7087c921SDZ0A2 \
2)Store in .env file\
3)Get current weather from 	https://api.openweathermap.org/data/2.5/weather and forecast from https://api.openweathermap.org/data/2.5/forecast \
4)Rate limits are: 60 calls per min and 1000000 calls per month\
5)Units are: celcius, fahrenheit\
6)Icons are fetched dynamically from OpenWeatherMap: https://openweathermap.org/img/wn/01d.png

<img width="957" alt="AppSS1" src="https://github.com/user-attachments/assets/b10659de-6df6-4282-825c-9e051e3dd4d9" />
<img width="959" alt="AppSS2" src="https://github.com/user-attachments/assets/4bcd2a47-7480-4b96-b987-9d02bd8a2676" />
