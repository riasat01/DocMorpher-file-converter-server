import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).send({message: 'unauthorized'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, decoded) => {
        if(error){
            return res.status(401).send({message: 'unauthorized'});
        }
        req.user = decoded;
        next();
    });
}

export default verifyToken;
