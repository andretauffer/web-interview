require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { lists } = require("./controllers");

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/lists", lists.getLists);

app.post("/lists", lists.postList);

app.put("/lists", lists.putList);

app.delete("/lists", lists.putList);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
