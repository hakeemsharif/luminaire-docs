import express from "express";
import { PORT } from "./config.js"
import mongoose from "mongoose";
import documentRoute from "./routes/documentRoute.js"
import userRoute from "./routes/userRoute.js"
import cors from "cors"
import dotenv from 'dotenv'

// Load environment variables
dotenv.config();

const app = express()


// Middleware for pasring request body
app.use(express.json());

// CORS Policy
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome")
});

app.use('/document', documentRoute);
app.use('/user', userRoute);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Listening to port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log("Slow" + error)
    })