import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const getAToken = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
        res
        .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .send({success: true});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

export default getAToken;
