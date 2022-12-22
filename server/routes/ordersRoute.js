const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const stripe = require("stripe")("sk_test_51FfQBPHdYSqFNE7IJEw81G8DKDo4N94EVn2rMf4RSZsipha3JhUtLCf4lwdl3YgswTcSfMhsrfuUHlr5Ekdds5h900pSVlOeSb")

router.post("/placeorder", async (req, res) => {

    const { token, subtotal, currentUser, cartItems } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: subtotal*100,
            currency: 'LKR',
            customer : customer.id,
            receipt_email : token.email
        },{
            idempotencyKey : uuidv4()
        })

        if (payment) 
        {
            res.send('Payment Done')
        } else {

            res.send('Payment Failed')
            
        }
    } catch (error) {

        return res.status(400).json({ message : 'Something went wrong'});
    }

});

module.exports = router