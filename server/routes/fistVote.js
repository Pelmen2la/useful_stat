var mongoose = require('mongoose'),
    FistVoteStat = mongoose.model('fistVoteStat'),
    utils = require('../Utils'),
    dataHelper = require('../DataHelper'),
    io = require('socket.io').listen(8088);

module.exports = function(app) {
    app.post('/fistvote/create/', function(req, res) {
        var stat = dataHelper.createCardsStatEntry(FistVoteStat, JSON.parse(req.body.data),
            { votes: [] });
        stat.save(function() {
            res.send({
                success: true,
                graphUrl: '/fvs/' + stat.id
            });
        });
    });

    io.sockets.on('connection', (socket) => {
        socket.on('joinRoom', function(roomId) {
            socket.join(roomId);
        });
        socket.on('stateRequest', function(statId) {
            FistVoteStat.findOne({id: statId}, function(err, statData) {
                socket.emit('state', statData.toObject());
            });
        });
        socket.on('voteCard', function(statId, data) {
            FistVoteStat.findOne({id: statId}, function(err, statData) {
                var card = statData.get('cards').find((c) => c.get('id') === data.cardId),
                    votes = card.get('votes');
                if(data.prevVote) {
                    var prevVote = votes.find((e) => e == data.prevVote);
                    votes.indexOf(prevVote) != -1 && votes.splice(votes.indexOf(prevVote), 1);
                }
                votes.push(data.vote);
                statData.save(function(err, statData) {
                    io.sockets.in(statId).emit('state', statData.toObject());
                });
            });
        });
    });
};