import Express from 'express';
import path from 'path';

export const app = Express();

export function start(port) {

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
