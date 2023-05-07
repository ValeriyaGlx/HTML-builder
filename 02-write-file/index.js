const fs = require("fs");
const path = require("path");

const { stdin, stdout } = process;

fs.writeFile(path.join(__dirname, "text.txt"), "", (err) => {
  if (err) throw err;
});

stdout.write("Hello! Enter text, please.\n");

stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    stdout.write("Thank You! Good luck :)");
    process.exit();
  }
  fs.appendFile(path.join(__dirname, "text.txt"), data, (err) => {
    if (err) throw err;
  });
});

process.on('SIGINT', ()=> {
    stdout.write("Thank You! Good luck :)");
    process.exit();
} )
