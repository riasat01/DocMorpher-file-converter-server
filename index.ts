import dotenv from 'dotenv';
import http from 'http';
import app from './src/app';
import connectDB from './src/db/connectDB';

dotenv.config();

const server = http.createServer(app);
const port = process.env.PORT || 5000;

const main = async () => {
    await connectDB();
    server.listen(port, () => {
        console.log(`server is listening at port ${port}`);
    });
};

main();
