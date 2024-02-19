import UserModel from '../../../../models/UserModel';
import { Request, Response } from 'express';

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserModel.find({}, null, null);
        res.send(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({ error: error.message });
        }
    }
}

const getAnUser = async (req: Request, res: Response) => {
    try {
        const email = req.params?.email;
        const query = { email: email };
        const result = await UserModel.findOne(query);
        res.send(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({ error: error.message });
        }
    }
}

const postAnUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const query = { email: user.email }
        const existingUser = await UserModel.findOne(query);
        if (existingUser) {
            return res.send({ message: 'user already exists' })
        }
        const newUser = new UserModel(user)
        const result = await newUser.save(user);
        res.send(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({ error: error.message });
        }
    }
}

// const updateUser = async (req: Request, res: Response) => {
//     try {
//         const id = req.params?.id;
//         const filter = {_id: id};
//         const updatedDoc = {
//             $set: {

//             }
//         }
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(401).send({ error: error.message })
//         }
//     }
// }

const makeAdmin = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;
        const filter = { _id: id };
        const updatedDoc = {
            $set: {
                role: 'admin'
            }
        }
        const result = await UserModel.updateOne(filter, updatedDoc, null);
        res.send(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({ error: error.message });
        }
    }
}

export default { getUsers, getAnUser, postAnUser, makeAdmin };
