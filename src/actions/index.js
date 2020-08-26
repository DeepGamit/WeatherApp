import axios from 'axios';

const API_KEY = '60d72e12b8ec91d14b18d3a43004cdf2';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_FORECAST = 'FETCH_FORECAST';

// action creator
export const fetchWeather = (city,units) => {

  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
  const url = `${WEATHER_URL}&units=${units}&q=${city}`;
  const request = axios.get(url);
  console.log(request);
  

  // fetch (url).then(function(response){
  //   return response.json()
  // })
  // .then(data => {
  //   console.log(data)
  // });

  console.log('Request', request);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}

export const fetchForecast = (city, units) => {

  const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
  const url = `${FORECAST_URL}&units=${units}&q=${city}`;
  const request = axios.get(url);

  

  console.log('Request', request);

  return {
    type: FETCH_FORECAST,
    payload: request
  };
}


