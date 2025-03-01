//PURPOSE: To catch the error in the catch block and pass it to the next middleware function. reusability
module.exports = (fn) => {
  return (req, res, next) => {
    //the purpose of returning the fn instead of calling it is to catch the error in the catch block
    fn(req, res, next).catch(next);
  };
};
