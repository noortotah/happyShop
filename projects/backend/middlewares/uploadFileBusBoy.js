var Busboy = require('busboy');
var path = require('path')
var fs = require('fs');
var Busboy = require('busboy');



module.exports = (req, res, next) => {
  let uploadingStart = false;
  let fileUploaded = false;
  const busboy = Busboy({ headers: req.headers});

  busboy.on('error', function(err){
    console.log(err);
  });



  busboy.on('field', function(fieldname, val) {
    req.body[fieldname] = val;
  });

  busboy.on('file', function (fieldname, file, filename, mimetype) {

    uploadingStart = true;
    const newFileName = filename.toLowerCase().split(' ').join('-') + '-' + Date.now() + path.extname(filename);

    fstream = fs.createWriteStream(__dirname + '/../images/' + newFileName);
    file.pipe(fstream);

    fstream.on('close', function () {
      req.body[fieldname] = 'images/' + newFileName;
      console.log("fileupload end");
      uploadingStart = false;
      fileUploaded = true;
      next();
    });
  });


  busboy.on('finish', function() {
    console.log('finish!');
    console.log('uploadingStart', uploadingStart);
    console.log('fileupload', fileUploaded);

    if(!uploadingStart && ! fileUploaded) {
      next();
    }

  });

  req.pipe(busboy);


}
