const fetch = require("node-fetch");
const { version } = require("../package.json");

setInterval(() => {
    fetch("https://registry.npmjs.com/axeroni").then(r => r.json().then(registry => {
        const { latest } = registry["dist-tags"];

        if (latest === version) {
            console.log(`Axeroni version up to date: ${latest}`);
            process.exit(0);
        }

        console.log("Axeroni Version not up to date");
        console.log(`Axeroni Local Version: ${version}`);
        console.log(`Axeroni Registry Version: ${latest}`);
    }))
}, 100);