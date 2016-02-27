import { connect } from 'react-redux';
import { weatherUpdate } from '../actions/actions.js';
import Weather from '../components/Weather.js';

const mapStateToProps = (state) => {
    return {
        forecast: state.forecast,
        isUpdating: state.isUpdating,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getWeatherUpdate: () => {
        dispatch(weatherUpdate());
      }
    }
}

const UpdateWeather = connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather);

export default UpdateWeather;
