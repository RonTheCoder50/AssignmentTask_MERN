import express from "express";
const app = express();

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    status: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
