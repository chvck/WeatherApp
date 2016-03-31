var pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/weather';
const weatherTable = 'weatherData';

function insertRow(data, cb) {
    pg.connect(connectionString, function(err, client, done) {
        if(err || !client) {
            done();
            console.error(err);
        } else {
            client.query('INSERT INTO ' + weatherTable + ' (ctimestamp, conditions, weekday, high, low) VALUES (' + data.timestamp +
                         ', \'' + data.conditions + '\', \'' + data.weekday + '\', ' + data.high + ', ' + data.low + ') returning id;',
                (err, res) => {
                    done();
                    if (err) {
                        console.error(err);
                    }
                    if (cb) {
                        cb(res.rows[0].id);
                    }
                }
            );
        }
    });
}

function dateIsHistorical(data, cb) {
    insertRow(data, cb);
}

function dateIsCurrentDay(data, timestamp) {
    pg.connect(connectionString, (err, client, done) => {
        client.query('SELECT * FROM ' + weatherTable + ' where ctimestamp = $1;', [timestamp], (err, res) => {
            done();
            if(err || !client) {
                console.error(err);
            } else {
                if(res.rows.length <= 0) {
                    insertRow(data);
                }
            }
        });
    });
}

export function GetByTimestamp(timestamp, cb) {
    pg.connect(connectionString, (err, client, done) => {
        client.query('SELECT * FROM ' + weatherTable + ' where ctimestamp = $1;', [timestamp], (err, res) => {
            done();
            if(err || !client) {
                console.error(err);
            } else {
                cb(err, res);
            }
        });
    });
}

export function count(cb) {
    pg.connect(connectionString, (err, client, done) => {
        if(err || !client) {
          done();
          console.error(err);
        }
        
        client.query('SELECT COUNT(*) FROM ' + weatherTable, (err, res) => {
            done();
            cb(err, res);
        });
    });
}

export function weatherRow(timestamp, weekday, high, low, conditions = 'unknown') {
    return { 
        timestamp: timestamp,
        conditions: conditions,
        weekday: weekday,
        high: high,
        low: low 
    };
}

export function startDatabase() {
}

export function insertDateRow(data, cb) {
    let timestamp = data.timestamp;
    let today = new Date();
    let dateTime = new Date(today.getFullYear(), today.getDay(), today.getMonth());

    if(timestamp < Date.parse(dateTime)) {
        dateIsHistorical(data, cb);
    } else {
        dateIsCurrentDay(data, timestamp);
    }
}

export function createTable(cb) {
    pg.connect(connectionString, (err, client, done) => {
        if(err || !client) {
          done();
          console.error(err);
        }
        
        client.query('CREATE TABLE ' + weatherTable + ' (id serial, ctimestamp bigint, conditions varchar(40), weekday varchar(10), high real, low real);', (err, res) => {
            done();
            cb(err, res);
        });
    });
    
}

