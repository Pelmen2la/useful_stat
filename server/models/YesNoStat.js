'use strict';

var mongoose = require('mongoose');

var YesNoStat = new mongoose.Schema({
    id: String,
    date: Date,
    cards: [{
        id: String,
        title: String,
        yesCount: Number,
        noCount: Number
    }]
});

mongoose.model('yesNoStat', YesNoStat);