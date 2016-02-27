import React, { Component } from 'react';
import UpdateWeather from '../containers/UpdateWeather.js';

export default class App extends Component {

    render() {
        return (
            <div>
              <h2>The Weather App</h2>
              <UpdateWeather />
            </div>
        );
    }
}
