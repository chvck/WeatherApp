import Express from 'express';
import path from 'path';
import * as db from './database/database.js';
import * as migrations from './database/migrations.js';

export const app = Express();

export function start(port) {

    db.startDatabase();
    migrations.create();

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
