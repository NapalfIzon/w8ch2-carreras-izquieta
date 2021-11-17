const Tuit = require("../../database/models/tuit");
const {
  getAllTuits,
  addTuit,
  getTuitById,
  deleteTuitById,
  addLike,
} = require("./tuitContollers");

jest.mock("../../database/models/tuit");

describe("Given a getAllTuits function", () => {
  describe("When it's invoked", () => {
    test("Then it should respond with an array of tuits", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const req = null;
      const tuits = [
        {
          title: "tuit1",
        },
        {
          title: "tuit2",
        },
      ];

      Tuit.find = jest.fn().mockResolvedValue(tuits);
      await getAllTuits(req, res);

      expect(res.json).toHaveBeenCalledWith(tuits);
    });
  });

  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke next with the error 400 and message", async () => {
      const req = null;
      const next = jest.fn();
      const res = null;
      const error = new Error("Cannot search users");
      error.code = 400;
      Tuit.find = jest.fn().mockRejectedValue(error);

      await getAllTuits(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot search tuits"
      );
    });
  });
});

describe("Given a addTuit function", () => {
  describe("When it's invoked", () => {
    test("Then it should respond with the new tuit", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const req = {
        body: {
          title: "tuit1",
        },
      };
      const tuit = {
        title: "tuit1",
      };

      Tuit.create = jest.fn().mockResolvedValue(tuit);
      await addTuit(req, res);

      expect(res.json).toHaveBeenCalledWith(tuit);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke next with the error 400 and message", async () => {
      const req = null;
      const next = jest.fn();
      const res = null;
      const error = new Error();
      error.code = 400;

      Tuit.create = jest.fn().mockRejectedValue(error);
      await addTuit(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot add the tuit."
      );
    });
  });
});

describe("Given a getTuitById function", () => {
  describe("When it receives a req with an id, res and tuit exists", () => {
    test("Then it should respond with the tuit in the res.json", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const req = { params: { idTuit: "6185993022dd92661d3cfca6" } };
      const tuit = {
        title: "tuit1",
      };
      Tuit.findById = jest.fn().mockResolvedValue(tuit);

      await getTuitById(req, res);

      expect(res.json).toHaveBeenCalledWith(tuit);
    });
  });
  describe("When it receives a req with an id and there are NO tuits matching id", () => {
    test("Then it should invoke next with the error 404 and message", async () => {
      const req = { params: { idTuit: "6185993022dd92661d3cfca6" } };
      const next = jest.fn();
      const res = null;
      Tuit.findById = jest.fn().mockResolvedValue(null);
      const error = new Error("Searched tuit not found");
      error.code = 404;

      await getTuitById(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
  describe("When it's invoked and findById returns error", () => {
    test("Then it should invoke next with the error 400 and message", async () => {
      const req = { params: { idTuit: "6185993022dd92661d3cfca6" } };
      const next = jest.fn();
      const res = null;
      Tuit.findById = jest.fn().mockRejectedValue(new Error());
      const error = new Error("Cannot search the tuit");
      error.code = 400;

      await getTuitById(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});

describe("Given a deleteTuitById function", () => {
  describe("When it receives a req with an id, res and tuit exists", () => {
    test("Then it should respond with the deleted tuit in the res.json", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const req = { params: { idTuit: "6185993022dd92661d3cfca6" } };
      const tuit = {
        title: "tuit1",
      };
      Tuit.findByIdAndDelete = jest.fn().mockResolvedValue(tuit);

      await deleteTuitById(req, res);

      expect(res.json).toHaveBeenCalledWith(tuit);
    });
  });
  describe("When it receives a req with an id and there are NO tuits matching id", () => {
    test("Then it should invoke next with the error 404 and message", async () => {
      const req = { params: { idTuit: "6185993022dd92661d3cfca6" } };
      const next = jest.fn();
      const res = null;
      Tuit.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      const error = new Error("Tuit to delete not found");
      error.code = 404;

      await deleteTuitById(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
  describe("When it's invoked and findByIdAndDelete returns error", () => {
    test("Then it should invoke next with the error 400 and message", async () => {
      const req = { params: { idTuit: "6185993022dd92661d3cfca6" } };
      const next = jest.fn();
      const res = null;
      Tuit.findByIdAndDelete = jest.fn().mockRejectedValue(new Error());
      const error = new Error("Cannot delete the tuit");
      error.code = 400;

      await deleteTuitById(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});

describe("Given a addLike function", () => {
  describe("When it receives a req with an id, res and tuit exists", () => {
    test("Then it should respond with the tuit in the res.json", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const req = { params: { idTuit: "6185993022dd92661d3cfca6" } };
      const tuit = {
        title: "tuit1",
        likes: 0,
        save: jest.fn(),
      };

      Tuit.findById = jest.fn().mockResolvedValue(tuit);

      await addLike(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tuit);
      expect(res.json.mock.calls[0][0]).toHaveProperty("likes", 1);
    });
  });
  describe("When it receives a req with an id and there are NO tuits matching id", () => {
    test("Then it should invoke next with the error 404 and message", async () => {
      const req = { params: { idTuit: "6185993022dd92661d3cfca6" } };
      const next = jest.fn();
      const res = null;
      Tuit.findById = jest.fn().mockResolvedValue(null);
      const error = new Error("Tuit not found");
      error.code = 404;

      await addLike(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
  describe("When it's invoked and findById returns error", () => {
    test("Then it should invoke next with the error 400 and message", async () => {
      const req = { params: { idTuit: "6185993022dd92661d3cfca6" } };
      const next = jest.fn();
      const res = null;
      Tuit.findById = jest.fn().mockRejectedValue(new Error());
      const error = new Error("Cannot search the tuit");
      error.code = 400;

      await addLike(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});
