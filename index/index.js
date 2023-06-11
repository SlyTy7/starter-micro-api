const cors = require('cors')
const express = require('express')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.get('/keytest', (req,res) => {
    res.send(process.env)
})

app.post('/checkout', async (req, res) => {
    if(req.body.products){
        let lineItems = []

        req.body.products.forEach(item => {
            lineItems.push({
                price: item.price_id,
                quantity: item.quantity
            })
        })

        if(req.body.key){
            const stripe = require('stripe')(req.body.key)
            const session = await stripe.checkout.sessions.create({
                success_url: 'https://example.com/success',
                line_items: lineItems,
                mode: 'payment',
            })
    
            res.json({ url: session.url })
        } else {
            res.json({"ERROR": "you didn't pass along your api key..."})
        }
    } else {
        res.json({"ERROR": "'products' key does not exist! Make sure you formatted your response body correctly...", "body": req.body})
    }
})

app.get('/product/:id/:key', async (req, res) => { 
    const stripe = require('stripe')(req.params.key)
    const product = await stripe.products.retrieve(req.params.id)

    res.json({ product: product })
})

app.get('/price/:id/:key', async (req, res) => { 
    const stripe = require('stripe')(req.params.key)
    const price = await stripe.prices.retrieve(req.params.id)

    res.json({ price: price })
})

app.listen(process.env.PORT || 3000);
