import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherApp from './reducers/weatherApp.js';
import App from './components/App.js';
import './dist/styles/weather.css';

let store = createStore(
    weatherApp,
    applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
