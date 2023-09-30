import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const root = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.get("/",(req, res) => {
    res.sendFile(root + "/index.html");
});

app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});