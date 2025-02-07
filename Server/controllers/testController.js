const multer = require("multer");
const Test = require("../models/tests/testModal");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "test/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];

    cb(null, `user-${req.body.name}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload only images.", false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadImage = upload.single("image");

exports.postTestUsers = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    //const { name, age } = req.body;
    const newTest = await Test.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newTest,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
