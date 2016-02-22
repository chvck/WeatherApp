import Express from 'express';

export const app = Express();

export function start(port) {
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
