const express = require ('express');
require('dotenv'). config();

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`sserver is running in port ${PORT}`)
} )