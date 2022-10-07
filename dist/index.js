#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adal_node_1 = require("adal-node");
const commander_1 = require("commander");
const fs_1 = require("fs");
const queries_1 = require("./queries");
const renderer_1 = require("./renderer");
commander_1.program
    .version(require('../package.json').version)
    .name('xrm-typegen')
    .requiredOption('-u, --url <url>', `Dynamics Url. e.g. https://myorg.crm11.dynamics.com/`)
    .requiredOption('-t, --tenent <tenent>', `AD authority. e.g. https://login.windows.net/myorg.onmicrosoft.com`)
    .option('-n, --username <username>', `Username`)
    .option('-p, --password <password>', `Password`)
    .option('-s, --secret <secret>', 'OAuth Client Secret')
    .option('-c, --clientid <clientid>', 'OAuth Client Id')
    .option('-e, --entity <entity>', 'The entity to create the typings for')
    .addHelpText('afterAll', "e.g. xrm-typegen --url https://myorg.crm11.dynamics.com/ --tenent https://login.windows.net/myorg.onmicrosoft.com --entity account --clientid myclientid --secret mysecret");
commander_1.program.parse();
const options = commander_1.program.opts();
const Main = async (authToken) => {
    console.log('getting form metadata');
    const { Attributes, DisplayName } = await queries_1.getEntityDefinition(authToken, options.url, options.entity);
    const noSpaceName = DisplayName.LocalizedLabels[0].Label.replace(" ", "");
    const capitalizedName = noSpaceName.substring(0, 1).toUpperCase() + noSpaceName.substring(1);
    const content = renderer_1.render(Attributes, capitalizedName);
    const fileName = `./${capitalizedName}.d.ts`;
    console.log(`writing ${fileName}`);
    fs_1.writeFileSync(fileName, content);
    console.log('Finished!');
};
console.log('authenticating');
const authContext = new adal_node_1.AuthenticationContext(options.tenent);
if (options.password) {
    authContext.acquireTokenWithUsernamePassword(options.url, options.username, options.password, options.clientid, (error, response) => {
        if (error) {
            console.error(`Error: ${error.message}`);
        }
        if (response.accessToken) {
            Main(response);
        }
    });
}
else if (options.secret) {
    authContext.acquireTokenWithClientCredentials(options.url, options.clientid, options.secret, (error, response) => {
        if (error) {
            console.error(`Error: ${error.message}`);
        }
        if (response.accessToken) {
            Main(response);
        }
    });
}
//# sourceMappingURL=index.js.map