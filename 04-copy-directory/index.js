const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "files-copy"), {recursive: true} , (err) => {
  if (err) throw err;
});

fs.promises
  .readdir(path.join(__dirname, "files"),(err) => {
    if (err) throw err;
  })
  .then((files) => {
    for (let file of files) {
      fs.copyFile(
        path.join(__dirname, "files", file),
        path.join(__dirname, "files-copy", file),
        (err) => {
          if (err) throw err;
          console.log("File successfully copied");
        }
      );
    }
  });
