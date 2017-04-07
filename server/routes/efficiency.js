var mongoose = require('mongoose'),
    EfficientyGraph = mongoose.model('efficientyGraph'),
    utils = require('../Utils'),
    dataHelper = require('../DataHelper'),
    io = require('socket.io').listen(8085);

module.exports = function(app) {
    app.post('/efficiency/create/', function(req, res) {
        var graph = dataHelper.createCardsStatEntry(EfficientyGraph, JSON.parse(req.body.data),
            { efficiencyRates: [], timeCostRates: [] });
        graph.save(function() {
            res.send({
                success: true,
                graphUrl: '/eff/' + graph.id
            });
        });
    });

    io.sockets.on('connection', (socket) => {
        socket.on('joinRoom', function(roomId) {
            socket.join(roomId);
        });
        socket.on('stateRequest', function(graphId) {
            EfficientyGraph.findOne({id: graphId}, function(err, graphData) {
                socket.emit('state', graphData.toObject());
            });
        });
        socket.on('setCardProperty', function(graphId, data) {
            EfficientyGraph.findOne({id: graphId}, function(err, graphData) {
                var card = graphData.get('cards').find((c) => c.get('id') === data.cardId),
                    rates = card.get(data.propertyName + 'Rates');
                if(data.oldVal) {
                    var oldRate = rates.find((e) => e == data.oldVal);
                    rates.indexOf(oldRate) != -1 && rates.splice(rates.indexOf(oldRate), 1);
                }
                rates.push(data.val);
                graphData.save(function(err, graphData) {
                    io.sockets.in(graphId).emit('state', graphData.toObject());
                });
            });
        });
    });
};