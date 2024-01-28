import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const applyDefaultMiddleWares = (app: Express) => {
    app.use(cors({
        // origin: [process.env.CLIENT, process.env.CLIENT_EXTRA],
        origin: [process.env.LOCAL_CLIENT, process.env.CLIENT, process.env.CLIENT_EXTRA],
        credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());
}

export default applyDefaultMiddleWares;
