import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

//Middleware for handling CORS policy
// Option 1: Allow origins with default of core(*).
app.use(cors());
//Option 2: Allow customs origins.
/*app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);*/


app.get('/', (req,res) => {
    console.log(req);
    return res.status(234).send(`Welcome`);
});

app.use('/books', booksRoute);


mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log(`App is connected to database`);
    app.listen(PORT, () => {
        console.log(`App is running on port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
})

