var mongoose = require('mongoose'),
    YesNoStat = mongoose.model('yesNoStat'),
    utils = require('../Utils'),
    io = require('socket.io').listen(8086);

module.exports = function(app) {
    app.post('/yesno/create/', function(req, res) {
        var graph = createNewStat(req.body.data);
        graph.save(function() {
            res.send({
                success: true,
                graphUrl: '/service/yesNo/' + graph._id
            });
        });
    });

    io.sockets.on('connection', (socket) => {
        socket.on('joinRoom', function(roomId) {
            socket.join(roomId);
        });
        socket.on('stateRequest', function(statId) {
            YesNoStat.findById(statId, function(err, statData) {
                socket.emit('state', statData.toObject());
            });
        });
        socket.on('voteCard', function(statId, data) {
            YesNoStat.findById(statId, function(err, graphData) {
                var card = graphData.get('cards').find((c) => c.get('id') === data.cardId);
                data.oldVote && card.set(data.oldVote + 'Count', card.get(data.oldVote + 'Count') - 1);
                card.set(data.vote + 'Count', card.get(data.vote + 'Count') + 1);
                graphData.save(function(err, graphData) {
                    io.sockets.in(statId).emit('state', graphData.toObject());
                });
            });
        });
    });
};

function createNewStat(cardTexsts) {
    var cards = cardTexsts.split(',').map(function(text) {
        return {
            id: utils.getGuid(),
            title: text,
            yesCount: 0,
            noCount: 0
        }
    });
    return new YesNoStat({
        id: utils.getGuid(),
        date: new Date(),
        cards: cards
    });
};