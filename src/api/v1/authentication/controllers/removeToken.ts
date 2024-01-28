import { Request, Response } from 'express';

const removeToken = async (req: Request, res: Response) => {
    const user = req.body;
    res.clearCookie('token', { maxAge: 0 }).send({ tokenRemoved: true });
}

export default removeToken;
