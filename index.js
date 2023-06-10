const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config({path: './.env'})

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

        const stripe = require('stripe')('sk_test_51MN6VBJrPPXiJnm6eeTaKxhgBfMObAkSIBkV1qsIIuYndUrF3ZBeFAQn5NUGTi2en1Koc4DnmFPU3lTMZtx1fldU002tzdg8wb')
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
