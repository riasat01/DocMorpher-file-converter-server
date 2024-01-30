// import { Request, Response } from 'express';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: '2023-10-16',
// });

// const createPaymentIntent = async (req: Request, res: Response) => {
//     const { price } = req.body;
//     console.log(price, "this price is from req.body");

//     const amount = parseInt(price) * 100;
//     console.log(amount, "from inside payment");

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: amount,
//         currency: "usd",
//         payment_method_types: ['card']
//     });

//     res.send({
//         clientSecret: paymentIntent.client_secret,
//     });
// }

// export default createPaymentIntent;


import dotenv from 'dotenv';
import Stripe from 'stripe';
import { Request, Response } from 'express';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_TOKEN_SECRET as string, {
    apiVersion: '2023-10-16',
});

const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { price } = req.body;
        const amount = Math.floor(price * 100);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card']
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        }
    }
}

export default createPaymentIntent;
