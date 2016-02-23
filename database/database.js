import Datastore from 'nedb';

var db;

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
        } else {
            console.log('Insert Successful:', result);
        }
    });
}

