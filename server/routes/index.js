var fs = require('fs'),
    path = require('path');

module.exports = function(app) {
    require('./efficiency')(app);

    app.get('/', function(req, res) {
        res.sendFile('/static/html/index.html', {root: global.appRoot })
    });

    app.get('/service/:name/:id', function(req, res) {
        fs.readFile(path.join(global.appRoot, '/static/html/reactPageTpl.html'), 'utf8', function(err, pageHtml) {
            pageHtml = pageHtml.replace('{{scriptName}}', req.params.name);
            pageHtml = pageHtml.replace('{{styleName}}', req.params.name);
            res.send(pageHtml);
        });
    });
};