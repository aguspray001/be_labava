const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

// router
const userRouter = require("./routers/user");
const roomRouter = require("./routers/room");
const { errorHandlerMiddleware } = require("./helper/error");

// define the app
const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

apiVersion = "/api/v1/"
app.use(apiVersion+"user", userRouter);
app.use(apiVersion+"room", roomRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, ()=>{
    console.log(`this app is running on port => ${PORT}`)
})