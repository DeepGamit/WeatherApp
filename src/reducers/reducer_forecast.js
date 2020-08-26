import {FETCH_FORECAST} from '../actions/index'


const forecastReducer = (state = [], action) => {

    switch (action.type) {

      case FETCH_FORECAST:
        state = [];
       return state.concat([action.payload.data]);

       default:
        return state;

  
    }
    
  }

  export default forecastReducer