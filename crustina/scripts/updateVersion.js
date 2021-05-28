const fs = require("fs").promises;
const pkj = require("../package.json");

pkj.version = `1.0.${(Number(pkj.version[pkj.version.length - 1]) + 1).toString()}`;
fs.writeFile("./package.json", JSON.stringify(pkj, null, 2));