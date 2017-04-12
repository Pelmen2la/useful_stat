'use strict';

var mongoose = require('mongoose');

var SimpleVoteStat = new mongoose.Schema({
    id: String,
    date: Date,
    cards: [{
        id: String,
        title: String,
        voteCount: Number
    }]
});

mongoose.model('simpleVoteStat', SimpleVoteStat);