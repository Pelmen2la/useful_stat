var fs = require('fs'),
    path = require('path');

module.exports = function(app) {
    const scriptNamesMapping = {
        eff: 'efficiency',
        yns: 'yesNo'
    };

    require('./efficiency')(app);
    require('./yesNo')(app);

    app.get('/', function(req, res) {
        res.sendFile('/static/html/index.html', {root: global.appRoot })
    });

    app.get('/:statname/:id', function(req, res) {
        fs.readFile(path.join(global.appRoot, '/static/html/reactPageTpl.html'), 'utf8', function(err, pageHtml) {
            pageHtml = pageHtml.replace('{{scriptName}}', scriptNamesMapping[req.params.statname]);
            res.send(pageHtml);
        });
    });
};