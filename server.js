import Express from 'express';
import * as db from './database/database.js';
import path from 'path';

export const app = Express();

//var testDoc = { hello: 'world', n: 5, today: new Date() };

export function start(port) {

    db.startDatabase();
    //db.insertRow(testDoc);

    app.use(require('serve-static')(path.join(__dirname, 'dist')));

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.listen(port, (error) => {
        if(error) {
            console.error(error);
        } else {
            console.info('App now accessible on http://localhost:%s/.', port);
        }
    });
}
