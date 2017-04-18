var fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    cookie = require('cookie');

module.exports = function(app) {
    const scriptNamesMapping = {
        dst: 'dotstorming',
        eff: 'efficiency',
        fvs: 'fistVote',
        siv: 'simpleVote',
        yns: 'yesNo'
    };

    const modelNamesMapping = {
        dotstorming: 'dotstormingStat',
        efficiency: 'efficientyGraph',
        fistVote: 'fistVoteStat',
        simpleVote: 'simpleVoteStat',
        yesNo: 'yesNoStat'
    };

    require('./dotstorming')(app);
    require('./efficiency')(app);
    require('./fistVote')(app);
    require('./simpleVote')(app);
    require('./yesNo')(app);

    app.get('/', function(req, res) {
        fs.readFile(path.join(global.appRoot, '/static/html/index.html'), 'utf8', function(err, indexPageHtml) {
            var lang = cookie.parse(req.headers.cookie || '').lang || 'en';
            fs.readFile(path.join(global.appRoot, '/server/text_resources/' + lang +'/index.json'), 'utf8', function(err, textData) {
                textData = JSON.parse(textData);
                for(key in textData) {
                    if(textData.hasOwnProperty(key)) {
                        indexPageHtml = indexPageHtml.replace(new RegExp('{{' + key + '}}', 'g'), textData[key]);
                    }
                }
                res.send(indexPageHtml);
            });
        });
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