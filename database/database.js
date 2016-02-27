import Datastore from 'nedb';

export var db;

function insertRow(data) {
    db.insert(data, (err, res) => {
        if(err) {
            console.error(err);
        }
    });
}

function dateIsHistorical(data) {
    insertRow(data);
}

function dateIsCurrentDay(data, timestamp) {
    db.find({'weatherData.timestamp': timestamp}, (err, res) => {
        if(err) {
            console.error(err);
        } else {
            if(res.length <= 0) {
                insertRow(data);
            }
        }
    });
}

export function weatherRow(timestamp, weekday, high, low, conditions = 'unknown') {
    return { 
      weatherData: {
        timestamp: timestamp,
        conditions: conditions,
        weekday: weekday,
        high: high,
        low: low 
      }
    };
}

export function startDatabase() {
    if(db) {
        return;
    }
    db = new Datastore({ filename: __dirname + '/storage.db', autoload: true });
}

export function insertDateRow(data) {
    let timestamp = data.weatherData.timestamp;
    let today = new Date();
    let dateTime = new Date(today.getFullYear(), today.getDay(), today.getMonth());

    if(timestamp < Date.parse(dateTime)) {
        dateIsHistorical(data);
    } else {
        dateIsCurrentDay(data, timestamp);
    }
}

