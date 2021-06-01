"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const Client_1 = require("./client/Client");
const path_1 = require("path");
const BaseCommand_1 = require("./commands/baseCommand/BaseCommand");
const BaseEvent_1 = require("./events/baseEvent/BaseEvent");
const WebSocket_1 = require("./websocket/WebSocket");
BaseCommand_1.BaseCommand.register(path_1.join(__dirname, "commands"));
BaseEvent_1.BaseEvent.register(path_1.join(__dirname, "events"));
Client_1.client.on("ready", () => {
    new WebSocket_1.WebSocket();
    Client_1.client.api.applications(Client_1.client.user.id).commands.post({
        data: {
            name: "ping",
            description: "Gets your ping to TTS Bot",
        },
    });
    Client_1.client.ws.on("INTERACTION_CREATE", async (interaction) => {
        if (interaction.data.name === "ping") {
            Client_1.client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Your ping is ${Client_1.client.ws.ping}ms`,
                        allowed_mentions: { parse: [] },
                    },
                },
            });
        }
    });
});
//# sourceMappingURL=index.js.map