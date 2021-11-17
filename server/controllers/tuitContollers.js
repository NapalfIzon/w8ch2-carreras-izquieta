const debug = require("debug")("tuitah:serverControllers");
const Tuit = require("../../database/models/tuit");

const getAllTuits = async (req, res, next) => {
  try {
    const tuits = await Tuit.find();
    res.json(tuits);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot search tuits";
    next(error);
  }
};

const getTuitById = async (req, res, next) => {
  const { idTuit } = req.params;
  try {
    const tuit = await Tuit.findById(idTuit);
    if (tuit) {
      res.json(tuit);
    } else {
      const error = new Error("Searched tuit not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Cannot search the tuit";
    next(error);
  }
};

const addTuit = async (req, res, next) => {
  try {
    const tuit = await Tuit.create(req.body);
    res.json(tuit);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot add the tuit.";
    next(error);
  }
};

const addLike = async (req, res, next) => {
  try {
    const { idTuit } = req.params;
    const tuit = await Tuit.findById(idTuit);
    if (tuit) {
      tuit.likes += 1;
      await tuit.save();
      res.status(200).json(tuit);
    } else {
      const error = new Error("Tuit not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.message = "Cannot search the tuit";
    error.code = 400;
    next(error);
  }
};

module.exports = {
  getAllTuits,
  getTuitById,
  addTuit,
  addLike,
};
