const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(cors());


app.use(express.json());

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Routes
const movieRouter = require("./routes/movie");
app.use("/movies", movieRouter);

// Database
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("Database Connected"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
