import React, { Component, PropTypes } from 'react';
import Forecast from './Forecast.js';

export default class Weather extends Component {

    static propTypes: {
        forecast: PropTypes.array,
        isUpdating: PropTypes.bool,
        error: PropTypes.string,
        getWeatherUpdate: PropTypes.func
    };

    componentDidMount() {
        this.props.getWeatherUpdate();
    }

    render() {
        let loading = this.props.isUpdating ? 'Loading...' : null;
        let forecast = this.props.forecast ? this.renderForecast() : null;

        return (
            <div>
              <p>{loading}</p>
              <div className='forecast-container'>
                {forecast}
              </div>
            </div>
        );
    }
    
    renderForecast() {
       return (
            <div>
              {this.props.forecast.map((weather, index) => {
                  if(index === 0) {
                      return;
                  }
                  let data = weather.weatherData;
                  let previousData = this.props.forecast[index - 1] || weather;
                  let highDiff = data.high - previousData.weatherData.high;
                  let lowDiff = data.low - previousData.weatherData.low;

                  return (
                      <div key={data.timestamp}>
                        <Forecast weekday={data.weekday} conditions={data.conditions}
                        high={data.high} low={data.low} index={index} 
                        highDiff={highDiff} lowDiff={lowDiff}/>
                      </div>
                  );
              })}
           </div>
       )
    }
}
