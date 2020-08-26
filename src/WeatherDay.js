import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { fetchWeather } from './actions/index'
import { fetchForecast } from './actions/index'


class WeatherDay extends Component  {


    constructor(props) {
        super(props);
        this.state = {isCelsius: true};
        this.celciusOnClick = this.celciusOnClick.bind(this);
        this.farenhiteOnClick = this.farenhiteOnClick.bind(this);
      }

      componentDidMount(){
        
        if(this.props.weather.length !== 0){
            
            if(this.state.isCelsius === true){
                this.celciusOnClick();
            } else {
              this.farenhiteOnClick();
            }

        }
         
      }


    celciusOnClick(e){

        this.setState({
            isCelsius: true
        })

        const city = this.props.weather[0].name
        const units = "metric"
        this.props.fetchWeather(city,units);
        this.props.fetchForecast(city,units);

    }

    farenhiteOnClick(e){

        this.setState({
            isCelsius: false
        })

        const city = this.props.weather[0].name
        const units = "imperial"
        this.props.fetchWeather(city,units);
        this.props.fetchForecast(city,units);

    }

    renderWeather(cityData, forecast){
        
        

        if(cityData === undefined){
            return(
                <div>
                    <h1>Enter a valid City Name</h1>
                </div>
            )
        }
        else {

            var displayTemp = this.state.isCelsius ? <div className="temp">{Math.round(cityData.main.temp)}&deg;<small>C</small><br/></div> :
                                                     <div className="temp">{Math.round(cityData.main.temp)}&deg;<small>F</small><br/></div>;

            var displayFeels = this.state.isCelsius ? <div className="feels">Feels like {Math.round(cityData.main.feels_like)}&deg;<small>C</small></div> :
                                                      <div className="feels">Feels like {Math.round(cityData.main.feels_like)}&deg;<small>F</small></div>

            return(
                    <div className="row" key={cityData.id}>
                            <div className="col-md-4 col-md-offset-4">
                                <div className="weather">
                                    <div className="current">
                                        
                                        <div className="info">
                                            <div className="selection">

                                                <button type="button" onClick={this.celciusOnClick}>&deg;<small>C</small></button> | <button type="button" onClick={this.farenhiteOnClick}>&deg;<small>F</small></button>

                                            </div>
                                            
                                            <div>&nbsp;</div>
                                            <div className="city">{cityData.name}</div>
                                            <div className="icon"><img alt="icon" src={"https://openweathermap.org/img/wn/"+cityData.weather[0].icon+"@2x.png"}  height = "90px" width = "90px"/></div>
                                            <div className="description"> {cityData.weather[0].description}</div>
                                            {displayTemp}
                                            {displayFeels}
                                            <div className="dayhl"> &#8593;{Math.round(cityData.main.temp_max)}  &#8595;{Math.round(cityData.main.temp_min)}</div>
                                            
                                            <div></div>
                                            <div key={cityData.name}>
                                                {forecast.map(data => this.renderForecast(data, this.state.isCelsius))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

            )

        }
        
       
    };

    
    renderForecast(cityData,cf){
        

        

        if(cityData === undefined){
            return(
                <div>
                    <h1>Enter a valid City Name</h1>
                </div>
            )
        }
        else {

            const forecast = [];
            var i=0;
            const data = cityData.list;
            var j=0;
            var tempMin = 100;
            var tempMax = -100;

            for(i=0;i<data.length;i++){

                if(data[i].main.temp_min<tempMin)
                    tempMin = data[i].main.temp_min;
                if(data[i].main.temp_max>tempMax)
                    tempMax = data[i].main.temp_max;
                if(i===6 || i===14 || i===22 || i===30 || i===38)
                {
                    forecast[j]= {dt_txt: data[i].dt_txt, temp_min: tempMin, temp_max: tempMax, icon: data[i].weather[0].icon};
                    j++;
                    tempMin = 100;
                    tempMax = -100;
                }          
            }


            

            return(
                <div>
                    {
                        forecast.map(day => {
                            return ( 
                                <div key={day.dt_txt}>
                                <Link to={{ pathname: '/'+moment(day.dt_txt).format('dddd'), state:{date: day.dt_txt, isCelsius: cf}}}>
                                    <div className="forecast">
                                    <div className="day">{moment(day.dt_txt).format('dddd')}</div>
                                    <div className="icon"> <img alt="icon" src={"http://openweathermap.org/img/wn/"+day.icon+"@2x.png"}  height = "65px" width = "65x"/></div>
                                    <div className="highlow"><span className="arrows">&#8593;</span>{Math.round(day.temp_max)}  <span className="arrows">&#8595;</span>{Math.round(day.temp_min)}</div>
                                    
                                    </div>
                                </Link>
                                </div>
                            )
                        })
                    }
                </div>
            )

        }

       

        }
    
    render(){
        
        
        return(

            <div>
                {
                    this.props.weather.map(data => this.renderWeather(data, this.props.forecast))
                }
            </div>
        )


    }
    
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchWeather, fetchForecast}, dispatch)
  }
  

const mapStatetoProps = (state) => {

    return{
        weather: state.weather,
        forecast: state.forecast
    }

}

export default connect(mapStatetoProps,mapDispatchToProps)(WeatherDay)