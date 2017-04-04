var fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose');

module.exports = function(app) {
    const scriptNamesMapping = {
        dst: 'dotstorming',
        eff: 'efficiency',
        yns: 'yesNo'
    };

    const modelNamesMapping = {
        dotstorming: 'dotstormingStat',
        efficiency: 'efficientyGraph',
        yesNo: 'yesNoStat'
    };

    require('./dotstorming')(app);
    require('./efficiency')(app);
    require('./yesNo')(app);

    app.get('/', function(req, res) {
        res.sendFile('/static/html/index.html', {root: global.appRoot })
    });

    app.get('/is_id_free/:statname/:id', function(req, res) {
        mongoose.model(modelNamesMapping[req.params.statname]).findOne({id: req.params.id}, function(err, data) {
            res.send(!data);
        });
    });

    app.get('/:statname/:id', function(req, res) {
        fs.readFile(path.join(global.appRoot, '/static/html/reactPageTpl.html'), 'utf8', function(err, pageHtml) {
            pageHtml = pageHtml.replace('{{scriptName}}', scriptNamesMapping[req.params.statname]);
            res.send(pageHtml);
        });
    });
};