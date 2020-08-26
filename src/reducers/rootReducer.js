import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';
import ForecastReducer from './reducer_forecast';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  forecast: ForecastReducer
});

export default rootReducer;