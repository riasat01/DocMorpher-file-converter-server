import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import connectDB from "./db/connectDB";
dotenv.config();
const app: Express = express();
const port: string | number = process.env.PORT || 5000;

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