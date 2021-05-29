const fs = require("fs").promises;
const pkj = require("../package.json");

pkj.version = `${(Number(pkj.version[0]) + 1).toString()}.0.0`;
fs.writeFile("./package.json", JSON.stringify(pkj, null, 2));

console.log(`Updated Axeroni Version: ${pkj.version}`);
