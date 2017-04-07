'use strict';

var mongoose = require('mongoose');

var FistVoteStat = new mongoose.Schema({
    id: String,
    date: Date,
    cards: [{
        id: String,
        title: String,
        votes: [Number]
    }]
});

mongoose.model('fistVoteStat', FistVoteStat);