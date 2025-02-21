const User = require("../models/users/userModel");
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined!",
    });
  }
};
exports.postUser = async (req, res) => {
  //   try{
  // const newuser = req.body
  // const
  //   }catch{
  //   }
};
