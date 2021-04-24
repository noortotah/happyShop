

const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
  destination: (request, file, callback)=> {
    console.log('in destination')
    isValid = MIME_TYPE_MAP[file.mimetype];
    error = new Error('Invalid Mime type');

    if (isValid) {
      error = null;
    }
    return callback(error, "images");
  },
  filename: (request, file, callback) => {
    console.log('in filename')
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    console.log('in filename', name + '-' + Date.now() + '.' + ext)
    return callback(null, name + '-' + Date.now() + '.' + ext);
  }
});


module.exports =  multer({ storage: storage});
