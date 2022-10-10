#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const credentials_1 = require("./credentials");
const adal_node_1 = require("adal-node");
const fs_1 = require("fs");
const queries_1 = require("./queries");
const renderer_1 = require("./renderer");
const main = async () => {
    const credentials = await (0, credentials_1.getCredentials)();
    console.log('authenticating');
    const authContext = new adal_node_1.AuthenticationContext(credentials.tenent);
    authContext.acquireTokenWithClientCredentials(credentials.url, credentials.clientid, credentials.secret, async (error, response) => {
        if (error) {
            console.error(`Error: ${error.message}`);
        }
        if (response.accessToken) {
            console.log('connection success');
            if (process.argv.length < 3) {
                console.log("entity name not passed. Stopping execution");
                return;
            }
            const entity = process.argv[2];
            console.log('getting form metadata');
            const { Attributes, DisplayName } = await (0, queries_1.getEntityDefinition)(response, credentials.url, entity);
            const noSpaceName = DisplayName.LocalizedLabels[0].Label.replace(" ", "");
            const capitalizedName = noSpaceName.substring(0, 1).toUpperCase() + noSpaceName.substring(1);
            const content = (0, renderer_1.render)(Attributes, capitalizedName);
            const fileName = `./${capitalizedName}.d.ts`;
            console.log(`writing ${fileName}`);
            (0, fs_1.writeFileSync)(fileName, content);
            console.log('Finished!');
        }
    });
};
main();
