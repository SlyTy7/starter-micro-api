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
                price: item.id,
                quantity: item.quantity
            })
        })

        if(req.body.key){
            const stripe = require('stripe')(req.body.key);
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

app.get('/product/:id', async (req, res) => { 
    if(req.body.key){
        const product = await stripe.products.retrieve(req.params.id)

        res.json({ product: product })
    } else {
        res.json({"ERROR": "you didn't pass along your api key..."})
    }
    
})

app.listen(process.env.PORT || 3000);
