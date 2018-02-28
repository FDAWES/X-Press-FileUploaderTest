//THIS APP USES EXPRESS-FILEUPLOADER PACKAGE

/* eslint no-const-assign: "off" */
const express = require("express");
const path = require("path");
const uploader = require("express-fileuploader");/*MAIN PACKAGE TO UPLOAD*/
const multiparty = require("connect-multiparty"); /*MUST INSTALL THIS ADDITIONAL PACKAGE*/
const morgan = require("morgan");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("tiny"));
app.use("/upload/image", multiparty());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//Setting up the upload directory and the base url for image link
uploader.use(
  new uploader.LocalStrategy({
    uploadPath: "./uploads",
    baseUrl: `http://127.0.0.1:${PORT}/uploads/`
  })
);

//Add routes for all image src retrieval
app.get("/uploads/:id", (req, res) => {
  res.sendFile(path.join(__dirname, `uploads/${req.params.id}`));
});

//Route to upload the image
app.post("/upload/image", function(req, res, next) {
  console.log("FILE:" + req.files["images"];)
  uploader.upload("local", req.files["images"], function(err, files) {
    if (files[0].error) {
      console.log("ERROR", err)
      return copyFile(files[0].error.path, files[0].error.dest, res);
    }
    else if(err){
      return next(err);
    }
  });
});

function copyFile(tempPath, newPath, res){
  // Read the file
  fs.readFile(tempPath, function (err, data) {
    if (err) throw err;
    console.log('File read!');

    // Write the file
    fs.writeFile(newPath, data, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
        console.log('File written!');

        // Delete the file
      fs.unlink(oldpath, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
    });

    
  });
}



app.listen(PORT, (err) => {
  console.log(`Server is listening on port ${PORT}`)
});
