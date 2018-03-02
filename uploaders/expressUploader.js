const uploader = require("express-fileuploader");

//Setting up the upload directory and the base url for image link
uploader.use(
  new uploader.LocalStrategy({
    uploadPath: "/uploads",
    baseUrl: "http://127.0.0.1:8000/uploads/"
  })
);

function uploadFile(req, res, next){
  uploader.upload("local", req.files["images"], function(err, files){
    if(err){
      return next(err);
    }

    res.send(JSON.stringify(files));
  });
}

module.exports = {
  uploadFile
}