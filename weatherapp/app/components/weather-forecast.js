import Ember from 'ember';

export default Ember.Component.extend({

    forecastModel: null,
    
    day: Ember.computed('forecastModel.weekday', function() {
        let weekdays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        
        function getWeekdayName(date) {
            let numericalDay = date.getDay();
        
            return weekdays[numericalDay];
        }

        let weekday = this.get('forecastModel.weekday');
        let currentDay = getWeekdayName(new Date());
        let day = weekday === currentDay ? Ember.String.htmlSafe("<h3 class='forecast-header'>Today</h3>") : Ember.String.htmlSafe("<h3>" + weekday + "</h3>");
        return day;
    }),

    conditions: Ember.computed('forecastModel.conditions', function() {
        return this.get('forecastModel.conditions') || 'Cloudy';
    }),

    showHighDiff: Ember.computed('forecastModel.highDiff', function() {
        let highDiff = this.get('forecastModel.highDiff');
        return Math.abs( highDiff ) > 0 ? highDiff : null;
    }),

    showLowDiff: Ember.computed('forecastModel.lowDiff', function() {
        let lowDiff = this.get('forecastModel.lowDiff');
        return Math.abs( lowDiff ) > 0 ? lowDiff : null;
    })
});