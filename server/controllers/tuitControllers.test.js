const Tuit = require("../../database/models/tuit");
const { getAllTuits, addTuit } = require("./tuitContollers");

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
