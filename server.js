//THIS APP USES EXPRESS-FILEUPLOADER PACKAGE

/* eslint no-const-assign: "off" */
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

//MUST INSTALL THIS ADDITIONAL PACKAGE
const multiparty = require("connect-multiparty"); 

//EXPRESS AND AWS UPLOAD UTILITY
const { AWS, CUSTOM, EXPRESS } = require("./uploaders");

const app = express();
const PORT = process.env.PORT || 8000;

//Initialize the morgan logger package for all routes
app.use(morgan("tiny"));

//Setup multiparty middleware for both the express uploader and aws routes
app.use("/upload/image", multiparty());
app.use("/aws-upload/image", multiparty());
app.use("/custom-upload/image", multiparty());


//Application Entry Point
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//Add routes for all image src retrieval
app.get("/uploads/:id", (req, res) => {
  res.sendFile(path.join(__dirname, `uploads/${req.params.id}`));
});

//EXPRESS FILE UPLOADER ROUTE
app.post("/upload/image", EXPRESS.uploadFile);

//AWS STORAGE BUCKET UPLOAD
app.post("/aws-upload/image", AWS.uploadFile);

//CUSTOM FILE UPLOADER ROUTE
app.post("/custom-upload/image", CUSTOM.uploadFile)

app.listen(PORT, (err) => {
  console.log(`Server is listening on port ${PORT}`)
});
