import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.findAll('forecast').then(function(forecasts) {
            let prevData = null;
            forecasts.map(function(forecast, idx) {
                if (idx === 0) {
                    prevData = forecast;
                    return forecast;
                }
                forecast.set('highDiff', forecast.get('high') - prevData.get('high'));
                forecast.set('lowDiff', forecast.get('low') - prevData.get('low'));
                prevData = forecast;
                return forecast;
            });
            return forecasts;
        });
    },
    actions: {
    }
});