const http = require('http')
const express = require('express')
const app = express()

const server = http.createServer(function (req, res) {
    res.write(`Just got a request at ${req.url}!`)
    res.write('Yo!');
    res.end();
})

server.listen(process.env.PORT || 3000);
