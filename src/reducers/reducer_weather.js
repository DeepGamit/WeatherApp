import {FETCH_WEATHER} from '../actions/index'


const weatherReducer = (state = [], action) => {
    
    switch (action.type) {

      case FETCH_WEATHER:
        state = [];
        return state.concat([action.payload.data]);  

       default:
        return state;

  
    }
    
  }

  export default weatherReducer;