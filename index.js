const http = require('http')
const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send('Hello World!');
    res.write('Hello World!');
})

app.get('/checkout', (req, res) => {
    res.send('Hello!');
    res.write('Checkout Links will be generated here.....')
})

app.listen(process.env.PORT || 3000);
