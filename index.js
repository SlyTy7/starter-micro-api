const http = require('http')
const express = require('express')
const app = express()
const stripe = require('stripe')('sk_test_51MN6VBJrPPXiJnm6eeTaKxhgBfMObAkSIBkV1qsIIuYndUrF3ZBeFAQn5NUGTi2en1Koc4DnmFPU3lTMZtx1fldU002tzdg8wb');

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.get('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        success_url: 'https://example.com/success',
        line_items: [
            {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
        ],
        mode: 'payment',
    })
    
    res.send(session)

})

app.listen(process.env.PORT || 3000);
