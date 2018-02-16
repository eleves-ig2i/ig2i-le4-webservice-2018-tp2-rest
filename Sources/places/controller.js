
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

    }
}
module.exports = Places;
