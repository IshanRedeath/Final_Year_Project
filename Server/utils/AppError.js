// PURPOSE : create a custom error class which can add Message adn status code
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // 4xx client error status as fail, 5xx server error
    this.isOperational = true; // by making this true, is will be used to check if the error is operational or not
    Error.captureStackTrace(this, this.constructor); // this will not appear in the stack trace
  }
}

module.exports = AppError;
