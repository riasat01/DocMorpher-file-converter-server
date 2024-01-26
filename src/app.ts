import express, { Express, Request, Response } from "express";

import dotenv from 'dotenv';
import connectDB from "./db/connectDB";
import { log } from "console";
dotenv.config();

const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const bodyParser = require('body-parser');
const app: Express = express();
const port: string | number = process.env.PORT || 5000;

// middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.24pgglg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      // await client.connect();
    
      app.post('/create-payment-intent',async (req, res) => {

        const { price } = req.body;
        console.log(price, "this price is from req.body");
        
        const amount = parseInt(price * 100);
        console.log(amount, "from inside payment");
        

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ['card']
        });

        res.send({

            clientSecret: paymentIntent.client_secret,
        })
        ;
      })


      // Send a ping to confirm a successful connection
      // await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req: Request, res: Response) => {
    res.send("server is running with no error")
});

const main = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`server is running at port ${port}`);
    })
}

main();