const express = require("express");
const {
  getAllTuits,
  getTuitById,
  addTuit,
  addLike,
  deleteTuitById,
} = require("../controllers/tuitContollers");

const router = express.Router();

router.get("/", getAllTuits);
router.get("/:idTuit", getTuitById);
router.post("/", addTuit);
router.patch("/:idTuit", addLike);
router.delete("/:idTuit", deleteTuitById);

module.exports = router;
