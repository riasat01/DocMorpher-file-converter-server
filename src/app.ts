// const express = require("express");
import express, {Express, Request, Response} from "express";
require("dotenv").config();
const app : Express  = express();
const port : string | number = process.env.PORT || 5000;

app.get('/', (req : Request, res : Response) => {
    res.send("server is running with no error")
});

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})