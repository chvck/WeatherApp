import Datastore from 'nedb';

export var db;

// Database Structures
export function weatherRow(timestamp, weekday, high, low) {
    return { 
      weatherData: {
        timestamp: timestamp, 
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

export function insertRow(data) {
    db.insert(data, (error, result) => {
        if(error) {
            console.error(error);
        }
    });
}

