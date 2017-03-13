'use strict';

var mongoose = require('mongoose');

var EfficientyGraph = new mongoose.Schema({
    id: String,
    date: Date,
    cards: [{
        id: String,
        title: String,
        efficiencyRates: [Number],
        timeCostRates: [Number]
    }]
});

mongoose.model('efficientyGraph', EfficientyGraph);