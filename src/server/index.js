import express from "express";
import path from "path";

// configs
const HOST = "127.0.0.1";
const PORT = 3000;
const BASE_URL = `http://${HOST}:${PORT}`;

const app = express();

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.redirect(BASE_URL);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on: ${BASE_URL}`);
});
