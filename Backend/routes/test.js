import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.send("Server found!");
  } catch (err) {
    console.log("Failed to reached server!");
  }
});

export default router;
