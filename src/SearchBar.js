import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchWeather } from './actions/index'
import { fetchForecast } from './actions/index'


class SearchBar extends Component {
 
    constructor(props) {
        super(props);
        this.state = { term: '' };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
      }

onInputChange(event) {
this.setState({ term: event.target.value })
}

      
onFormSubmit(event) {

  const units = "metric"
  event.preventDefault();
  this.props.fetchWeather(this.state.term,units);
  this.props.fetchForecast(this.state.term,units);

}

  render () {
    return (


        <div>

            <form className="col s12" onSubmit={this.onFormSubmit}>
                  <div className="row">
                      <div className="input-field col s4 offset-s4">
                          <input  placeholder="Search City" type="text" className="validate" value={this.state.term} onChange={this.onInputChange}/>
                      </div>
                  </div>
              </form>
           
        </div>

        
            
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchWeather, fetchForecast }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);