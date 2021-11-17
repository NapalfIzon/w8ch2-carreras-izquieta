const express = require("express");
const {
  getAllTuits,
  getTuitById,
  addTuit,
  addLike,
} = require("../controllers/tuitContollers");

const router = express.Router();

router.get("/", getAllTuits);
router.get("/:idTuit", getTuitById);
router.post("/", addTuit);
router.patch("/", addLike);

module.exports = router;
