//THIS APP USES EXPRESS-FILEUPLOAD PACKAGE

var express = require('express');
var multipart = require('multiparty');
var path = require("path");
const fileUpload = require("express-fileupload");
 
var app = express();
app.use("/upload/image", fileUpload());
 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
 
app.post('/upload/image', function(req, res) {
  console.log(req.files);

  if(req.files){
    var imageFile = req.files.images;
    
    console.log(imageFile);

    imageFile.mv(`./uploads/${imageFile.name}`)
    .then(function(file) {
      return res.send('File uploaded!');
    }).catch(error => {
      console.log("ERROR: ", error);
      return res.status(500).send(error);
    });
  }
  else{
    return res.status(400).send("No file was uploaded. Try again!");
  }

  
  // var form = new multipart.Form({
  //   uploadDir: path.join(__dirname, "/images"),
  //   autoFiles: true
  // });

  // form.parse(req, (err, fields, files) =>{
  //   console.log("Blah***********", files['images'][0].path);
  //   uploader.upload('local', files['images'][0].path, function(err, files) {
  //     console.log("BLAH2 ********************", files)
  //     if (err) {
  //       return next(err);
  //     }
  //     res.send(JSON.stringify(files));
  //   });
  // });
});
 
app.listen(8000);