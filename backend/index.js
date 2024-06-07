const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const userRoute = require ("./routes/users");
const pinRoute = require ("./routes/pins");

dotenv.config();

app.use(express.json());

mongoose
        .connect(process.env.MONGO_URL)
        .then(()=> {
            console.log("MongoDb Connected")
        }).catch(err=>console.log(err));


app.listen(8800,() => {
    console.log("Backend server is running!")
})

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);