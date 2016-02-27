import request from 'superagent';
const weatherUrl = '/api/0/weather';

function weatherEvent(eventType, forecast) {
    return {
      type: eventType,
      forecast
    }
}

function weatherError(eventType, error) {
    return {
      type: eventType,
      error
    }
}

export const weatherUpdate = (data) => {
  return dispatch => {
      dispatch({ type: 'UPDATE_WEATHER', data });

      return request
      .get(weatherUrl)
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
          if(err) {
              dispatch(weatherError('UPDATE_WEATHER_FAILURE', err ));
          } else {
              dispatch(weatherEvent('UPDATE_WEATHER_SUCCESS', res.body));
          }
      });
  }
}
