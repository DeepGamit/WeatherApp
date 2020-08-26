import React, {Component} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'



class WeatherHourly extends Component  {

    constructor(props) {
        super(props);
        this.state = { dayForecast: [],
                        date: '' ,
                        celsius: ''};
        this.handleClick = this.handleClick.bind(this);
        this.tConvert = this.tConvert.bind(this);
      }

    componentDidMount(){


       
        this.setState({
            dayForecast: this.props.forecast,
            date: this.props.location.state.date,
            celsius: this.props.location.state.isCelsius
        })



    }

    handleClick(e) {
        this.props.history.push("/");
        // this.props.history.pushState(null, null, '/');
       
    }

    tConvert(time){
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice (1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time[0]+" "+time[5]; // return adjusted time or original string
    }


    render(){

        var day = this.state.dayForecast;
       
        var dayForecast = [];

        
        day.map(res => {
           return dayForecast = res.list;
            
        });

       
        
        var inputDate = this.state.date.split(' ');
        var j=0;
        var i=0;
        const tempDay = [];

    
        for(i;i<dayForecast.length;i++){
            let checkDate = dayForecast[i].dt_txt.split(' ');
                if(inputDate[0] === checkDate[0])
                    tempDay[j++] = dayForecast[i];
        }

        
        var displayTemp = '';
        if( this.state.celsius){
            console.log("Hi");
            displayTemp = <small>C</small>
        }else {
            
            displayTemp =  <small>F</small>
        }
       
        var displayFeels = this.state.celsius ? <small>C</small> : <small>F</small>;

        const dayCards = tempDay.length ? (
            tempDay.map(day=>{
                return(
                    <div className="col s12 m3" key={day.dt_txt}>
                        <div className="card medium">
                            <div className="card-content">
                                <h4>{this.tConvert(day.dt_txt.split(' ')[1])}</h4>
                                <span className="card-title">{day.weather[0].main}</span>
                                <img alt="img" src={"https://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png"} />
                                <h4><strong>{Math.round(day.main.temp)}&deg;</strong>{displayTemp}</h4>
                                <h5>Feels like: {Math.round(day.main.feels_like)}&deg;{displayFeels}</h5>
                            </div>
                        </div>
                    </div>
                )
            })
        ):(
             <div className="center">No posts yet</div>
        );
        

        return(
            <div className="container">
                <button onClick={this.handleClick}>
                <FontAwesomeIcon icon={faChevronLeft} style={
                    {
                        fontSize: "50px",
                        color: "black"
                    }
                }/></button>
                    <h4>{moment(this.props.location.state.date).format("dddd, MMMM Do YYYY")}</h4>
                    <div className="row">
                        {dayCards}
                    </div>    
            </div>
        )
    }



}

const mapStatetoProps = (state) => {

    return{
        weather: state.weather,
        forecast: state.forecast
    }

}

export default connect(mapStatetoProps)(WeatherHourly)