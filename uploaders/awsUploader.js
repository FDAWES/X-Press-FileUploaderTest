const AWS = require("aws-sdk");
const fs = require("fs");

var s3 = new AWS.S3();

function uploadFile(req, res, next){
  console.log("Attempting to upload file to AWS...")
  const currentFile = req.files["images"];
  var lastIndex = currentFile.path.lastIndexOf("/");
  var newName = currentFile.path.substring(lastIndex + 1);

  //My Storage Bucket is setup as a configuration variable
  //For this I used the .env file for the development environment
  console.log("Bucket Name", process.env.BUCKET_NAME);

  var data = {
    Bucket: process.env.BUCKET_NAME,
    Key: newName,
    Body: fs.createReadStream(currentFile.path),
    ContentType: currentFile.type
  };

  s3.putObject(data, function(err, data) {
    if (err){
      console.log("Error uploading File to AWS", err)
      return next(error);
    }
    else{
      console.log(`${newName} has been successfully uploaded!`);

      s3.getSignedUrl("getObject", {
        Bucket: process.env.BUCKET_NAME,
        Key: newName
      }, (err, url) => {
        if(err){
          return next(err);
        }
        console.log("DATA", url);
        res.json(url);
      })
      
    }
  });
}

module.exports = {
  uploadFile
};