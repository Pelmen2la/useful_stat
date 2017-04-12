var mongoose = require('mongoose'),
    SimpleVoteStat = mongoose.model('simpleVoteStat'),
    utils = require('../Utils'),
    dataHelper = require('../DataHelper'),
    io = require('socket.io').listen(8089);

module.exports = function(app) {
    app.post('/simplevote/create/', function(req, res) {
        var stat = dataHelper.createCardsStatEntry(SimpleVoteStat, JSON.parse(req.body.data),
            { voteCount: 0 });
        stat.save(function() {
            res.send({
                success: true,
                graphUrl: '/siv/' + stat.id
            });
        });
    });

    io.sockets.on('connection', (socket) => {
        socket.on('joinRoom', function(roomId) {
            socket.join(roomId);
        });
        socket.on('stateRequest', function(statId) {
            SimpleVoteStat.findOne({id: statId}, function(err, statData) {
                socket.emit('state', statData.toObject());
            });
        });
        socket.on('voteCard', function(statId, data) {
            SimpleVoteStat.findOne({id: statId}, function(err, graphData) {
                var card = graphData.get('cards').find((c) => c.get('id') === data.cardId);
                card.set('voteCount', card.get('voteCount') + 1);
                if(data.oldVoteCardId) {
                    var oldCard = graphData.get('cards').find((c) => c.get('id') === data.oldVoteCardId);
                    oldCard.set('voteCount', oldCard.get('voteCount') - 1);
                }
                graphData.save(function(err, graphData) {
                    io.sockets.in(statId).emit('state', graphData.toObject());
                });
            });
        });
    });
};