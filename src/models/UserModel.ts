import { Document, Schema, model } from "mongoose";

interface userType extends Document {
    name: string,
    email: string,
    photoURL: string,
    type: string
}

const userShema = new Schema<userType>({
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "photoURL": {
        type: String,
        required: true
    },
    "type": {
        type: String,
        required: true
    }
})

const UserModel = model<userType>("user", userShema);

export default UserModel;