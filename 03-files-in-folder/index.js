const fs = require("fs");
const path = require("path");

fs.promises
  .readdir(path.join(__dirname, "secret-folder"), { withFileTypes: true })

  .then((filenames) => {
    for (let filename of filenames) {
      if (filename.isFile()) {
        const name = path.basename(filename.name, path.extname(filename.name));
        const expantion = path.extname(filename.name);

        fs.promises
          .stat(path.join(__dirname, "secret-folder", filename.name))
          .then((filename) => console.log(`${name} - ${expantion} - ${filename.size/2000}kb`));
      }
    }
  })

