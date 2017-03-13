var mongoose = require('mongoose'),
    EfficientyGraph = mongoose.model('efficientyGraph'),
    utils = require('../Utils'),
    io = require('socket.io').listen(8085);

module.exports = function(app) {
    app.post('/efficiency/create/', function(req, res) {
        var graph = createNewGraph(req.body.data);
        graph.save(function() {
            res.send({
                success: true,
                graphUrl: '/service/efficiency/' + graph._id
            });
        });
    });

    io.sockets.on('connection', (socket) => {
        socket.on('joinRoom', function(roomId) {
            socket.join(roomId);
        });
        socket.on('stateRequest', function(graphId) {
            EfficientyGraph.findById(graphId, function(err, graphData) {
                socket.emit('state', graphData.toObject());
            });
        });
        socket.on('setCardProperty', function(graphId, data) {
            EfficientyGraph.findById(graphId, function(err, graphData) {
                var card = graphData.get('cards').find((c) => c.get('id') === data.cardId),
                    rates = card.get(data.propertyName + 'Rates'),
                    votedCash = utils.parseCookie(socket.client.request.headers.cookie)['graphVotedCash'];
                if(data.oldVal) {
                    var oldRate = rates.find((e) => e == data.oldVal);
                    rates.splice(rates.indexOf(oldRate), 1);
                }
                rates.push(data.val);
                graphData.save(function(err, graphData) {
                    io.sockets.in(graphId).emit('state', graphData.toObject());
                });
            });
        });
    });
};

function createNewGraph(cardTexsts) {
    var cards = cardTexsts.split(',').map(function(text) {
        return {
            id: utils.getGuid(),
            title: text,
            efficiencyRates: [1],
            timeCostRates: [1]
        }
    });
    return new EfficientyGraph({
        id: utils.getGuid(),
        date: new Date(),
        cards: cards
    });
};