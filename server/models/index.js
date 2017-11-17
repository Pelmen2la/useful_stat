var mongoose = require('mongoose'),
    utils = require('./../utils');

function addModel(name, modelCfg, cardsCfg) {
    var model = new mongoose.Schema(utils.apply({
        id: String,
        date: Date,
        cards: [
            utils.apply({
                id: String,
                title: String,

            }, cardsCfg || {})
        ]
    }, modelCfg || {}));

    mongoose.model(name, model);
};

function init() {
    addModel('dotstormingStat', {maxDotsCount: Number}, {dotsCount: Number});
    addModel('efficientyGraph', {}, {efficiencyRates: [Number], timeCostRates: [Number]});
    addModel('fistVoteStat', {}, {votes: [Number]});
    addModel('simpleVoteStat', {}, {voteCount: Number});
    addModel('yesNoStat', {}, {yesCount: Number, noCount: Number});
};

module.exports = {
    init: init
};