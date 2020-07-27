var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.cert', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var path = require('path');
var express = require('express');

var DIST_DIR = path.join(__dirname, 'build');
var PORT = 3000;
var app = express();

app.use(express.static(DIST_DIR));

app.get("/", function (req, res) {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT);
//app.listen(PORT);