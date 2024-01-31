const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

// router
const userRouter = require("./routers/user");
// define the app
const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

apiVersion = "/api/v1/"
app.use(apiVersion+"user", userRouter);

app.listen(PORT, ()=>{
    console.log(`this app is running on port => ${PORT}`)
})