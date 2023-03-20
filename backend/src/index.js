require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { lists } = require("./controllers");

app.use(cors());
app.use(express.json());

app.get("/lists", lists.getLists);

app.post("/lists", lists.postList);

app.put("/lists", lists.putList);

app.delete("/lists", lists.putList);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
