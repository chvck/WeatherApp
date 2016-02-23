import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import weatherApp from './reducers/weatherApp.js';
import App from './components/App.js';

let store = createStore(weatherApp);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
