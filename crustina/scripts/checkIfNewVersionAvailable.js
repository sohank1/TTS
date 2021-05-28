const fetch = require("node-fetch");
const { version } = require("../package.json");

setInterval(() => {
    fetch("https://registry.npmjs.com/crustina").then(r => r.json().then(registry => {
        const { latest } = registry["dist-tags"];

        if (latest === version) {
            console.log(`Crustina version up to date: ${latest}`);
            process.exit(0);
        }

        console.log("Crustina Version not up to date");
        console.log(`Crustina Local Version: ${version}`);
        console.log(`Crustina Registry Version: ${latest}`);
    }))
}, 100);