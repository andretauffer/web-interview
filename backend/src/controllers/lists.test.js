process.env.storagePath = "./__mocks__/storage.json";

const JSONdb = require("simple-json-db");

const db = new JSONdb(process.env.storagePath);

const mockData = {
  "0000000001": {
    "id": "0000000001",
    "title": "First List",
    "todos": [
      "First todo of first list!"
    ]
  },
  "0000000002": {
    "id": "0000000002",
    "title": "Second List",
    "todos": [
      "First todo of second list!"
    ]
  }
};

describe("the api endpoints", () => {
  let lists;

  beforeAll(async () => {
    const promises = Object.keys(mockData).map(listId => db.set(listId, mockData[listId]));
    await Promise.all(promises);

    lists = require("./lists");

  });

  afterAll(async () => {
    const lists = db.JSON();
    const promises = Object.keys(lists).map(listId => db.delete(listId));
    await Promise.all(promises);
  });

  describe("the getLists function", () => {

    it("should return a list of todos", async () => {
      let resp = "";

      const res = {
        send: (r) => resp = r
      };

      await lists.getLists({}, res);

      expect(resp).toEqual(
        expect.objectContaining({
          "0000000001": expect.objectContaining({ "id": "0000000001" }),
          "0000000002": expect.objectContaining({ "id": "0000000002" })
        })
      );
    });

  });
  describe("the getList function", () => {

    it("should return a todo list by id", async () => {
      let resp = "";

      const res = {
        send: (r) => resp = r
      };

      const req = { id: "0000000001" };

      await lists.getList(req, res);

      expect(resp).toEqual(
        expect.objectContaining({ "id": "0000000001" })
      );
    });

    it("should return a message indicating there is no such id in the database", async () => {
      let resp = "";

      const res = {
        send: (r) => resp = r
      };

      const req = { id: "notThere" };

      await lists.getList(req, res);

      expect(resp).toEqual(`No list was found with id: ${req.id}`);
    });

  });

  describe("the postList function", () => {

    it("should successfully post the list ", async () => {
      let resp = "";

      const res = {
        send: (r) => resp = r,
        sendStatus: (r) => resp = r
      };

      const req = {
        body: {
          "title": "Test List",
          "todos": [
            "Todo in test list!"
          ]
        }
      };

      await lists.postList(req, res);

      expect(typeof resp.id).toEqual("string");

      await lists.getList({ id: resp.id }, res);

      expect(resp).toEqual(
        expect.objectContaining({
          id: resp.id,
        })
      );
    });

  });

  describe("the putList function", () => {

    it("should successfully overwrite the list ", async () => {
      let resp = "";

      const id = "0000000001";

      const res = {
        send: (r) => resp = r,
        sendStatus: (r) => resp = r
      };

      const req = {
        body: {
          "title": "Test List",
          "todos": [
            "Todo in a different list!"
          ],
          id: id
        }
      };

      await lists.putList(req, res);

      expect(typeof resp.id).toEqual("string");

      await lists.getList({ id }, res);

      expect(resp).toEqual(req.body);
    });

  });

  describe("the deleteList function", () => {

    it("should successfully delete the list ", async () => {
      let resp = "";

      const id = "0000000001";

      const res = {
        send: (r) => resp = r,
        sendStatus: (r) => resp = r
      };

      const req = {
        id: id
      };

      await lists.deleteList(req, res);

      expect(resp).toEqual(200);

      await lists.getList({ id }, res);

      expect(resp).toEqual(`No list was found with id: ${id}`);
    });

  });
})