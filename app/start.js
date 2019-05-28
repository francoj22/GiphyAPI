/*eslint-disable no-console */
import open from 'open';
import express from 'express';
import { favourites } from '../app/favourites'
import bodyParser from 'body-parser';
import path from 'path';
import _ from 'lodash';

function start(app, port) {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get('/app/favourites', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ favourites }));
    });

    app.post('/app/favourites', (req, res) => {
        if (!_.find(favourites, item => {
                return item.id === req.body.id;
            })) {
            favourites.push(req.body);
        }
        res.end();
    });

    app.delete('/app/favourites', (req, res) => {
        const favId = favourites.findIndex(item => {
            return item.id === req.query.id;
        });
        if (favId) {
          favourites.splice(favId, 1)
        }
        res.end();
    });

    app.use('/templates', express.static(path.join(__dirname, '../public/templates')))

    app.get('*', function(req, res) {
        res.redirect('/');
    });

    app.listen(port, function(err) {
        if (err) {
            console.log(err);
        } else {
            open('http://localhost:' + port);
        }
    });
}

export default start;
