import * as database from './database.js';
import * as dateUtils from '../server/dateUtils.js';

function saveDateToDatabase(data) {
    database.insertRow(data);
}

function weatherRange(max, min) {
    return Math.floor(Math.random() * [max - min] + min);
}

export function createHistoricalData() {

    for(var i = 1; i <= 28; i += 1) {
        let today = new Date();
        let high = weatherRange(25, 15);
        let low = weatherRange(15, 5);
        let timestamp = dateUtils.historicalDate(today, i);
        let weekday = dateUtils.getWeekdayName(timestamp);
        let row = database.weatherRow(timestamp, weekday, high, low);

        saveDateToDatabase(row);
    }
}

export function create() {
    database.db.find({}, (error, data) => {
        if(error) {
            console.warning(error);
        } else {
            if(data.length <= 0) {
                this.createHistoricalData();
            }
        } 
    });
}