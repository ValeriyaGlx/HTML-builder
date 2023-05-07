const fs = require("fs");
const path = require("path");

fs.writeFile(path.join(__dirname, "project-dist/bundle.css"), "", (err) => {
  if (err) throw err;
});

fs.promises
  .readdir(path.join(__dirname, "styles"), { withFileTypes: true })
  .then(async (files) => {
    let cont;
    for (let file of files) {
      const expantion = path.extname(file.name);

      if (file.isFile() && expantion === ".css") {
        const stream = await fs.promises.readFile(
          path.join(__dirname, "styles", file.name),
          { encoding: "utf8" }
        );
        cont += stream;
      }
    }
    fs.promises.writeFile(
      path.join(__dirname, "project-dist", "bundle.css"),
      cont
    );
  });
