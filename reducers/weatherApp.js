const weatherApp = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_WEATHER':
            return [
                ...state,
                { updated: true }
            ]
        default:
            return state;
    }
}

export default weatherApp;
