'use strict';

var mongoose = require('mongoose');

var DotstormingStat = new mongoose.Schema({
    id: String,
    date: Date,
    cards: [{
        id: String,
        title: String,
        dotsCount: Number
    }]
});

mongoose.model('dotstormingStat', DotstormingStat);