const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

exports.uploadFile = (fieldName) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: "uploads",
        public_id: Date.now() + "-" + file.originalname,
      };
    },
  });

  const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG)$/)) {
      req.fileValidationError = {
        message: "Only image files are allowed!",
      };
      return cb(new Error("Only image files are allowed!"), false);
    }

    cb(null, true);
  };

  const maxSize = 10 * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(fieldName);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: `Max file sized exceeded (${maxSize} MB)`,
          });
        }

        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).send({
            message: `Only single file allowed`,
          });
        }

        return res.status(400).send(err);
      }

      if (!req.file) {
        return res.status(400).send({
          message: "Please select a file to upload",
        });
      }

      return next();
    });
  };
};
