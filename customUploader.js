const fs = require("fs");
const path = require('path');

function uploadFile(req, res, next){
  const newFile = req.files["images"];

  copyFile(newFile, res, next);
}

function copyFile(newFile, res, next){
  // Read the file
  const tempPath = newFile.path;

  fs.readFile(tempPath, function (err, data) {
    if (err) return next(err);

    console.log('File read!');

    //get the random filename assigned by multiparty
    const lastIndex = tempPath.lastIndexOf("/");
    const newFileName = tempPath.substring(lastIndex + 1);
    
    const imageUrl = `uploads/${newFileName}`;
    
    const newPath = path.join(__dirname, imageUrl);
    // Write the file
    fs.writeFile(newPath, data, function (err) {
        if (err) {
          console.log(err);
          return next(err);
        }
        
        console.log('File written!');
        res.json(imageUrl);

        // Delete the file
      fs.unlink(tempPath, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
    });

    
  });
}

module.exports = {
  uploadFile
};