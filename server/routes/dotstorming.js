var mongoose = require('mongoose'),
    Dotstorming = mongoose.model('dotstormingStat'),
    utils = require('../Utils'),
    dataHelper = require('../DataHelper'),
    io = require('socket.io').listen(8087);

module.exports = function(app) {
    app.post('/dotstorming/create/', function(req, res) {
        var data = JSON.parse(req.body.data),
            stat = dataHelper.createCardsStatEntry(Dotstorming, data, { dotsCount: 0 });
        stat.set('maxDotsCount', data.maxDotsCount || 10);
        stat.save(function() {
            res.send({
                success: true,
                graphUrl: '/dst/' + stat.id
            });
        });
    });

    io.sockets.on('connection', (socket) => {
        socket.on('joinRoom', function(roomId) {
            socket.join(roomId);
        });
        socket.on('stateRequest', function(statId) {
            Dotstorming.findOne({id: statId}, function(err, statData) {
                socket.emit('state', statData.toObject());
            });
        });
        socket.on('changeDotsCount', function(statId, data) {
            Dotstorming.findOne({id: statId}, function(err, graphData) {
                var card = graphData.get('cards').find((c) => c.get('id') === data.cardId);
                card.set('dotsCount', card.get('dotsCount') + data.changeValue);
                graphData.save(function(err, graphData) {
                    io.sockets.in(statId).emit('state', graphData.toObject());
                });
            });
        });
    });
};