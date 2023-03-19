const JSONdb = require("simple-json-db");
const { v4: uuidv4 } = require("uuid");

const storagePath = process.env.storagePath;

const db = new JSONdb(storagePath);


const getLists = async (_, res) => {
  try {

    const lists = db.JSON();

    res.send(lists);
  } catch (error) {

    res.send({ error });
  }
};

const getList = async (req, res) => {
  try {
    const { id } = req;

    const list = db.get(id);

    if (!list) return res.send(`No list was found with id: ${id}`);

    res.send(list);
  } catch (error) {

    res.send({ error });
  }
};

const postList = async (req, res) => {
  try {

    const { body } = req;

    const id = uuidv4();

    await db.set(id, { ...body, id });

    res.send({ id });
  } catch (error) {

    res.send({ error });
  }
};

const putList = async (req, res) => {
  try {

    const { body } = req;

    const id = body.id;

    await db.set(id, body);

    res.send({ id });
  } catch (error) {
    console.error("Faile to put list", error);
    res.send({ error });
  }
};

const deleteList = async (req, res) => {
  try {
    await db.delete(req.id);

    res.sendStatus(200);
  } catch (error) {
    console.error("Faile to put list", error);
    res.send({ error });
  }
};

module.exports = {
  getLists,
  getList,
  postList,
  putList,
  deleteList
};