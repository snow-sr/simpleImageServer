import express from "express";
const app: express.Application = express();
const port: number = 12589;

import fs from "fs/promises";
import fileUpload from "express-fileupload";
import path from "path";
const __dirname = path.resolve();
import { parseFileName } from "./parseFileName.js";

app.use(fileUpload());

function watchImages() {
  fs.readdir("./pictures").then((files) => {
    files.forEach((file) => {
      console.log(parseFileName(file));
      app.get(`/${parseFileName(file)}`, (req, res) => {
        res.sendFile(path.join(__dirname, "pictures", file));
      });
    });
  });
}

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(
    "Hello World! \n This is a simple image server that can be used directly from the terminal!"
  );
});

app.post("/upload", function (req, res) {
  let sampleFile: any;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + "/pictures/" + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err: string) {
    if (err) return res.status(500).send(err);
    watchImages();
    res.send("File uploaded!");
  });
});

watchImages();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
