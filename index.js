const http = require('http')
const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send('Hello World!');
    res.write('Hello World!');
})

/*
const server = http.createServer(function (req, res) {
    res.write(`Just got a request at ${req.url}!`)
    res.end();
})
*/

app.listen(process.env.PORT || 3000);
