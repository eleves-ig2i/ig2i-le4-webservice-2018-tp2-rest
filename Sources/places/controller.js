
class Places {
    constructor(app, data) {

        app.get('/api/places/', function (request, response) {
            let id = request.params.id;
            return data.getPlacesAsync().then(function (places) {
                if (places !== undefined) {
                    response.status(200).json({'places':places});
                    return;
                }
                response.status(404).json({
                    key: 'entity.not.found'
                });
            });
        });

        app.get('/api/places/:id', function (request, response) {
            let id = request.params.id;
            return data.getPlaceAsync(id).then(function (place) {
                if (place !== undefined) {
                    response.status(200).json(place);
                    return;
                }
                response.status(404).json({
                    key: 'entity.not.found'
                });
            });
        });

        app.post('/api/places/', function (request, response) {
            let place_ = request.body;
            response.setHeader('Location', '/places/');
            if(place_.author.length < 3
                || place_.author.length > 100
                || place_.name.length < 3
                || place_.name.length > 100) {
              response.status(400).json({
                      key: 'entity.not.found'
                    });
                    return;
            }
            return data.savePlaceAsync(request.body).then(function (place) {
                    response.status(201).json();
                    return;
            });
        });

    }
}
module.exports = Places;
