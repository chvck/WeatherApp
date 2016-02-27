import React, { Component, PropTypes } from 'react';
import * as dateUtils from '../server/dateUtils.js';

export default class Forecast extends Component {

    static propTypes: {
        weekday: PropTypes.string,
        conditions: PropTypes.string,
        high: PropTypes.string,
        highDiff: PropTypes.number,
        low: PropTypes.string,
        lowDiff: PropTypes.number,
        index: PropTypes.number
    };

    render() {
        let conditions = this.props.conditions || 'Cloudy';
        let currentDay = dateUtils.getWeekdayName(new Date());
        let showHighDiff = Math.abs(this.props.highDiff) > 0 ? this.props.highDiff : null;
        let showLowDiff = Math.abs(this.props.lowDiff) > 0 ? this.props.lowDiff : null;
        let day = this.props.weekday === currentDay ? <h3 className='forecast-header'>Today</h3> : <h3>{this.props.weekday}</h3>;

        return (
            <div className='forecast-block'>
              <li>
                {day}
                <h3>{conditions}</h3>
                <br />
                <div className='forecast-block-temps'>
                  <b>High &nbsp;</b>
                  {this.props.high}&#176; &nbsp; 
                  <b>{showHighDiff}</b>
                </div>
                <br/>
                <div className='forecast-block-temps'>
                  <b>Low &nbsp;</b>
                  {this.props.low}&#176; &nbsp; 
                  <b>{showLowDiff}</b>
                </div>
              </li>
            </div>
        );
    }
}
