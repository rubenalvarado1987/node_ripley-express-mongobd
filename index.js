const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const _ = require("lodash");
//const logger = require('morgan');

const app = express();
app.use(cors());
const server = require("http").createServer(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR"
  );
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

const destinatario = require("./routes/destinatarioRoutes");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

//app.use(logger('dev'));

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://serveralvarado:Gsx400..@cluster0.fhrip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Database Ripey");
  })
  .catch((error) => {
    console.log("Connection to database failed!", error);
  });

app.use("/api", destinatario);

var port = process.env.PORT || 8080;

server.listen(port, () => {});
