const weatherApp = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_WEATHER':
            return Object.assign({}, state, {
                isUpdating: true,
                error: null
            });
        case 'UPDATE_WEATHER_SUCCESS':
            return Object.assign({}, state, {
                isUpdating: false,
                error: null,
                forecast: action.forecast
            });
        case 'UPDATE_WEATHER_FAILURE':
            return Object.assign({}, state, {
                isUpdating: false,
                error: action.error
            });
        default:
            return state;
    }
}

export default weatherApp;
