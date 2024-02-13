class ErrorHandler extends Error {
  constructor(message, code, status) {
    super(message);
    this.name = "Error Handler Response";
    this.code = code;
    this.status = status
  }
}

const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(err.code >= 500 ? 500 : err.code).json({
    name: err.name,
    status: err.status,
    code: err.code,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
    ErrorHandler, errorHandlerMiddleware
}
