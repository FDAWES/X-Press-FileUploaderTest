//THIS APP USES EXPRESS-FILEUPLOADER PACKAGE

/* eslint no-const-assign: "off" */
const express = require("express");
const path = require("path");
const uploader = require("express-fileuploader");/*MAIN PACKAGE TO UPLOAD*/
const multiparty = require("connect-multiparty"); /*MUST INSTALL THIS ADDITIONAL PACKAGE*/
const morgan = require("morgan");

const app = express();
const PORT = 8000;

app.use(morgan("tiny"));
app.use("/upload/image", multiparty());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//Setting up the upload directory and the base url for image link
uploader.use(
  new uploader.LocalStrategy({
    uploadPath: "/uploads",
    baseUrl: "http://127.0.0.1:8000/uploads/"
  })
);

//Add routes for all image src retrieval
app.get("/uploads/:id", (req, res) => {
  res.sendFile(path.join(__dirname, `uploads/${req.params.id}`));
});

//Route to upload the image
app.post("/upload/image", function(req, res, next) {
  uploader.upload("local", req.files["images"], function(err, files) {
    console.log(files);
    if (err) {
      return next(err);
    }
    res.send(JSON.stringify(files));
  });
});

app.listen(PORT, (err) => {
  console.log(`Server is listening on port ${PORT}`)
});
