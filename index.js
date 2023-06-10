const express = require('express')
const cors = require('cors')
const app = express()
const stripe = require('stripe')('sk_test_51MN6VBJrPPXiJnm6eeTaKxhgBfMObAkSIBkV1qsIIuYndUrF3ZBeFAQn5NUGTi2en1Koc4DnmFPU3lTMZtx1fldU002tzdg8wb')

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.get('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        success_url: 'https://example.com/success',
        line_items: [
            {price: 'price_1NHVNYJrPPXiJnm6KSYXdQoW', quantity: 2},
        ],
        mode: 'payment',
    })

    res.json({
        id: session.id,
        url: session.url
    })

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

        const session = await stripe.checkout.sessions.create({
            success_url: 'https://example.com/success',
            line_items: lineItems,
            mode: 'payment',
        })

        res.json({
            id: session.id,
            url: session.url
        })

    } else {
        res.json({"error": "'products' key does not exist! Make sure you formatted your response body correctly..."})
    }
})

app.listen(process.env.PORT || 3000);
