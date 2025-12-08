const express = require ('express');
require('dotenv'). config();
// const path = require('path');
// const cors = require('cors');

console.log("Loaded .env from:", __dirname);
console.log("DATABASE_URL =", process.env.DATABASE_URL);

const mongoose = require('mongoose');
const path = require('path');
const cors =require('cors');



const app = express();

app.use(express.json());
// app.use(cors.json())


const PORT = process.env.PORT || 8000;

const DATABASE_URL = process.env.DATABASE_URL;
const movieRouter  = require ('./routes/movie');
mongoose.connect(DATABASE_URL)
const db = mongoose.connection;
db.on('error', error => console.error(error) );
db.once('open', () => console.log('Database Connected'));


app.use(express.json());
app.use('/movie', movieRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
} )