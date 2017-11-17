var mongoose = require('mongoose'),
    models = require('./../models/');

module.exports = function (app) {
    models.init();
    mongoose.connect('mongodb://localhost:27017/efficiency');
};