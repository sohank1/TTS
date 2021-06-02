const fetch = require("node-fetch");
const { version } = require("../package.json");

setInterval(() => {
    fetch("https://registry.npmjs.com/crustina").then(r => r.json().then(registry => {
        const { latest } = registry["dist-tags"];

        // If registry version is more than or equal to local version we are up to date
        if (Number(latest[0]) >= Number(version[0])) {
            console.log(`Crustina version up to date: ${latest}`);
            process.exit(0);
        }

        console.log("Crustina Version not up to date");
        console.log(`Crustina Local Version: ${version}`);
        console.log(`Crustina Registry Version: ${latest}`);
    }))
}, 100);
