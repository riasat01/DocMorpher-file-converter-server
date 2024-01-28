import express, { Express, Request, Response } from "express";
import cors from "cors"

import dotenv from 'dotenv';
import connectDB from "./db/connectDB";
import globalErrorHandler from "./utils/globalErrorHandler";
import applyDefaultMiddleWares from "./middlewares/applyDefaultMiddleWares";
import paymentRouter from "./routers/payment/index";
import userRouter from "./routers/users/index"
dotenv.config();

class HTTPError extends Error {
    status?: number
}

const port = process.env.PORT || 5000
const app: Express = express();

applyDefaultMiddleWares(app);

app.use('/create-payment-intent', paymentRouter);
app.use('/user', userRouter);

app.get('/', (req: Request, res: Response) => {
    res.send("server is running with no error")
});

app.all('*', (req, res, next) => {
  console.log(req.url);
  const error = new HTTPError(`Can't find the ${req.originalUrl} on this server`);
  error.status = 404;
  next(error);
})

app.use(globalErrorHandler);

const main = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`server is running at port ${port}`);
    })
}

main();