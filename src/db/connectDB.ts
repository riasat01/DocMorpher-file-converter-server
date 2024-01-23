import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const getconnectionURL = () => {
    let connectionURL: string;
    if (process.env.NODE_ENV === "development") {
        connectionURL = process.env.DATABASE_LOCAL ? process.env.DATABASE_LOCAL : 'error';
        if (process.env.DATABASE_LOCAL && process.env.DB_USER && process.env.DB_PASSWORD){
            connectionURL = connectionURL.replace("<username>", process.env.DB_USER);
            connectionURL = connectionURL.replace("<password>", process.env.DB_PASSWORD);
        }
    } else {
        connectionURL = process.env.DATABASE_PROD ? process.env.DATABASE_PROD : 'ERROR';
    }
    return connectionURL;
}

const connectDB = async () : Promise<void> => {
    console.log("connecting to database...");
    const mongoURI: string = getconnectionURL();
    const options : ConnectOptions = {
        dbName: process.env.DB_NAME
    }
    await mongoose.connect(mongoURI, options);
    console.log("connected to database!");
}

export default connectDB;