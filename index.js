var http = require('http');
http.createServer(function (req, res) {
    res.write(`Just got a request at ${req.url}!`)
    res.write('Yo!');
    res.end();
}).listen(process.env.PORT || 3000);
