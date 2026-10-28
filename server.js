const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const bookRoutes = require("./routes/bookRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.use(bookRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT, () => {
            console.log("Server running on port " + process.env.PORT);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error");
    });