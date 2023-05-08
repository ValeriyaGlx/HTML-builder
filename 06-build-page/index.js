const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.writeFile(path.join(__dirname, "project-dist/style.css"), "", (err) => {
  if (err) throw err;
});

fs.writeFile(path.join(__dirname, "project-dist/index.html"), "", (err) => {
  if (err) throw err;
});

//get assets

async function getAssets(src, dist) {
  await fs.promises.mkdir(dist, { recursive: true }, (err) => {
    if (err) throw err;
  });

  await fs.promises.readdir(src).then(async (files) => {
    for (let file of files) {
      const fileCopy = path.resolve(dist, file);
      file = path.resolve(src, file);

      const stats = await fs.promises.stat(file);

      if (stats.isFile()) {
        await fs.promises.copyFile(file, fileCopy);
      } else if (stats.isDirectory()) {
        await fs.promises.mkdir(fileCopy, { recursive: true });
        await getAssets(file, fileCopy);
      }
    }
  });
}

getAssets(
  path.resolve(__dirname, "assets"),
  path.resolve(path.resolve(__dirname, "project-dist"), "assets")
);

//get html components
async function getHTML(folder) {
  let template = await fs.promises.readFile(
    path.resolve(__dirname, "template.html")
  );
  template = template.toString();

  const components = template.match(/(?<=\{\{).+(?=\}\})/g);

  for (let component of components) {
    const element = await fs.promises.readFile(
      path.resolve(__dirname, "components", component + ".html")
    );
    template = template.replace(`{{${component}}}`, element);
  }

  await fs.promises.writeFile(path.resolve(folder, "index.html"), template);
}

getHTML(path.resolve(__dirname, "project-dist"));

//copy css

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
      path.join(__dirname, "project-dist", "style.css"),
      cont
    );
  });
