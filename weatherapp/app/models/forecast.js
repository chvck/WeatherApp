import DS from 'ember-data';

export default DS.Model.extend({
    weekday: DS.attr('string'),
    conditions: DS.attr('string'),
    high: DS.attr('number'),
    low: DS.attr('number'),
    highDiff: DS.attr('number'),
    lowDiff: DS.attr('number')
});