var mongoose = require('mongoose'),
    Dotstorming = mongoose.model('dotstormingStat'),
    utils = require('../Utils'),
    io = require('socket.io').listen(8087);

module.exports = function(app) {
    app.post('/dotstorming/create/', function(req, res) {
        var graph = createNewStat(JSON.parse(req.body.data));
        graph.save(function() {
            res.send({
                success: true,
                graphUrl: '/dst/' + graph.id
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

function createNewStat(data) {
    var cards = data.cardsText.split('{sep}').map(function(text) {
        return {
            id: utils.getUid(),
            title: text,
            dotsCount: 0
        }
    });
    return new Dotstorming({
        id: data.id || utils.getUid(),
        date: new Date(),
        cards: cards
    });
};