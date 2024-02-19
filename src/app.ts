import express, { Express, Request, Response } from "express";
import cors from "cors"
import dotenv from 'dotenv';

import connectDB from "./db/connectDB";
import globalErrorHandler from "./utils/globalErrorHandler";
import applyDefaultMiddleWares from "./middlewares/applyDefaultMiddleWares";
import paymentRouter from "./routers/payment/index";
import userRouter from "./routers/users/index";
import JWTRouter from './routers/authentication/index';
import logOutRouter from './routers/remove-token/index'

import multer from 'multer';
import pdfParse from 'pdf-parse';
import fs from 'fs';
import Docxtemplater from 'docxtemplater';
import path from "path";
import JSZip from 'jszip';

dotenv.config();

class HTTPError extends Error {
    status?: number
}

const port = process.env.PORT || 5000
const app: Express = express();

applyDefaultMiddleWares(app);
// app.use(cors());

app.use('/jwt', JWTRouter);
app.use('/create-payment-intent', paymentRouter);
app.use('/user', userRouter);
app.use('/logout', logOutRouter);


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/convert', upload.single('pdfFile'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new HTTPError('No file uploaded');
    }

    // Extract text from the PDF
    const pdfData = req.file.buffer;
    console.log('PDF Data:', pdfData);
    const pdfText = await pdfParse(pdfData);
    console.log('PDF Text:', pdfText.text);

    // Create a DOCX template
    const templatePath = path.join(__dirname, 'template.docx');


    const template = fs.readFileSync(templatePath, 'utf-8');

    
    const doc = new Docxtemplater();
    doc.loadZip(new JSZip(template));

    // Fill in the template with the PDF text (customize this based on your needs)
    doc.setData({ content: pdfText.text });
    doc.render();

    // Save the converted DOCX file
    const convertedBuffer = doc.getZip().generate({ type: 'nodebuffer' });

    // Send the converted DOCX file back to the client
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.send(convertedBuffer);
  } catch (error) {
    console.error('Error converting PDF to DOC', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








app.get('/', (req: Request, res: Response) => {
    res.send("server is running with no error")
});

app.all('*', (req, res, next) => {
  console.log(req.url);
  const error = new HTTPError(`Can't find the ${req.originalUrl} on this server`);
  error.status = 404;
  next(error);
})

app.use(globalErrorHandler);

// const main = async () => {
//     await connectDB()
//     app.listen(port, () => {
//         console.log(`server is running at port ${port}`);
//     })
// }

// main();


export default app;