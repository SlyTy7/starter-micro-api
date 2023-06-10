const http = require('http')
const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.get('/checkout', (req, res) => {
    res.send('Checkout Links will be generated here.....')
})

app.listen(process.env.PORT || 3000);
