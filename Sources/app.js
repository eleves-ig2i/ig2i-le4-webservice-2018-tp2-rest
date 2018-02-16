const express = require('express');
const bodyParser = require('body-parser');
const Places = require('./places/controller');
const Data = require('./places/data');
const packageJson = require('../package.json');

class App {
    constructor() {
        const app = express();

        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());

        var middlewareHttp = function (request, response, next) {
            response.setHeader('Api-version', packageJson.version);
            response.setHeader('Content-Type', 'application/json');

            console.log(`${request.method} ${request.originalUrl}`);
            if (request.body && Object.keys(request.body).length >0) {
                console.log(`request.body ${JSON.stringify(request.body)}`);
            }
            next();
        };

        var middleware404 = function (request, response, next) {
          console.log(request.route)
          response.status(404).json({
                key: 'not.found'
            });
          next();
        };

        app.use(middlewareHttp);

        new Places(app, new Data());

        app.get('/api/version', function (request, response) {
            response.json({
                version: packageJson.version
            });
        });

        app.use(middleware404);

        // eslint-disable-next-line no-unused-vars
        app.use(function (error, request, response, next) {
            console.error(error.stack);
            response.status(500).json({
                key: 'server.error'
            });
        });
        this.app=app;
    }
}

module.exports = App;
