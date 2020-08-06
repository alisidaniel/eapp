const util = require("util");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(`${__dirname}../../assets/uploads`));
    },
    filename: (req, file, callback) => {
      const match = ["image/png", "image/jpeg"];
  
      if (match.indexOf(file.mimetype) === -1) {
        var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
        return callback(message, null);
      }

      const filenewname = file.originalname.replace(/\s/g, '');
      var filename = `${Date.now()}-product-${filenewname}`;
      callback(null, filename);
    }
  });
  
  var uploadFiles = multer({ storage: storage }).array("imageFile", 4);
  var uploadFilesMiddleware = util.promisify(uploadFiles);
  
module.exports = uploadFilesMiddleware;