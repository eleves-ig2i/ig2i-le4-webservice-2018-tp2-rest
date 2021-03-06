const request = require('supertest');
const assert = require('assert');
const App = require('../app');

describe('Places/controller', () => {

    it('GET /api/places/2 should respond a http 200 OK', () => {
        const app = (new App()).app; 
        return request(app)
            .get('/api/places/2')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                assert.equal(response.body.author, 'Louis');
            });
    });

    it('GET /api/places/youhou should respond a http 404', () => {
        const app = (new App()).app; 
        return request(app)
            .get('/api/places/youhou')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect(response => {
                assert.equal(response.body.key, 'entity.not.found');
            });
    });

    it('GET /api/places should return 3 places', () => {
        const app = (new App()).app;
        return request(app)
            .get('/api/places')
            .expect(response => {
                assert.equal(response.body.places.length, 3);
            });
    });

    it('POST /api/places should respond a http 201 OK with no image', () => {
        var newPlace = {
            name: 'Londre',
            author: 'Patrick',
            review: 2,
            image: null
        };
        const app = (new App()).app; 
        return request(app)
            .post('/api/places')
            .send(newPlace)
            .expect('Location', /places/)
            .expect(201);
    });

    it('POST /api/places should respond a http 201 OK with an image', () => {

        var newPlace = {
            name: 'Londre',
            author: 'Patrick',
            review: 2,
            image: {
                url: 'https://www.bworld.fr/api/file/get/c27e39ee-7ba9-46f8-aa7c-9e334c72a96c/d9d0634b-b1a0-42bd-843d-d3bc3cf7d842/ImageThumb/bworld-2016-v3.png',
                title: 'bworld place'
            }
        };
        const app = (new App()).app; 
        return request(app)
            .post('/api/places')
            .send(newPlace)
            .expect('Location', /places/)
            .expect(201);

    });

    it('POST /api/places should respond a http 400 KO', () => {

        var newPlace = {
            name: '',
            author: 'Pat',
            review: 2,
            image: null
        };
        const app = (new App()).app; 
        return request(app)
            .post('/api/places')
            .send(newPlace)
            .expect('Content-Type', /json/)
            .expect(400);

    });

    it('POST /api/places should respond a http 400 KO', () => {

        const app = (new App()).app; 
        var newPlace = {
            name: 'Londre &',
            author: 'Patrickmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
            review: 2,
            image: {
                url: 'https://www.bworld.fr/api/file/get/c27e39ee-7ba9-46f8-aa7c-9e334c72a96c/d9d0634b-b1a0-42bd-843d-d3bc3cf7d842/ImageThumb/bworld-2016-v3.png',
                title: ''
            }
        };
        return request(app)
            .post('/api/places')
            .send(newPlace)
            .expect('Content-Type', /json/)
            .expect(400);

    });

});
