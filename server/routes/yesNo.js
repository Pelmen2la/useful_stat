var mongoose = require('mongoose'),
    YesNoStat = mongoose.model('yesNoStat'),
    utils = require('../Utils'),
    dataHelper = require('../DataHelper'),
    io = require('socket.io').listen(8086);

module.exports = function(app) {
    app.post('/yesno/create/', function(req, res) {
        var stat = dataHelper.createCardsStatEntry(YesNoStat, JSON.parse(req.body.data),
            { yesCount: 0, noCount: 0 });
        stat.save(function() {
            res.send({
                success: true,
                graphUrl: '/yns/' + stat.id
            });
        });
    });

    io.sockets.on('connection', (socket) => {
        socket.on('joinRoom', function(roomId) {
            socket.join(roomId);
        });
        socket.on('stateRequest', function(statId) {
            YesNoStat.findOne({id: statId}, function(err, statData) {
                socket.emit('state', statData.toObject());
            });
        });
        socket.on('voteCard', function(statId, data) {
            YesNoStat.findOne({id: statId}, function(err, graphData) {
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