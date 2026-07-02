import express from "express";
const app = express();

export default app.use((err, req, res, next) => {
  console.log(err);

  res.send(500).json({
    status: false,
    message: err.message || "Internal Server Error",
  });
});
