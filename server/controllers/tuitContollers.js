const debug = require("debug")("tuitah:serverControllers");

const getAllTuits = async (req, res, next) => {
  try {
    debug("getalltuits");
  } catch (error) {
    next(error);
  }
};

const getTuitById = async (req, res, next) => {
  const { idTuit } = req.params;
  try {
    debug(`gettuitbyid --> ${idTuit}`);
  } catch (error) {
    next(error);
  }
};

const addTuit = async (req, res, next) => {
  try {
    debug("addTuit");
  } catch (error) {
    next(error);
  }
};

const addLike = async (req, res, next) => {
  try {
    debug("addLike");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTuits,
  getTuitById,
  addTuit,
  addLike,
};
