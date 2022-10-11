#!/usr/bin/env node
import { getCredentials } from "./credentials.js";
import { AuthenticationContext } from 'adal-node';
import { writeFileSync } from 'fs';
import { getEntityDefinition } from './queries.js';
import { render } from './renderer.js';
import initTypings from "./initTypings.js";
if (process.argv.length > 2 && process.argv[2] == "--init-typings") {
    await initTypings();
    process.exit(0);
}
const credentials = await getCredentials();
console.log('authenticating');
const authContext = new AuthenticationContext(credentials.tenent);
authContext.acquireTokenWithClientCredentials(credentials.url, credentials.clientid, credentials.secret, async (error, response) => {
    if (error) {
        console.error(`authentication error: ${error.message}`);
    }
    if (response.accessToken) {
        console.log('connection success');
        if (process.argv.length < 3) {
            console.log("entity name not passed. Stopping execution");
            return;
        }
        const entity = process.argv[2];
        console.log('getting form metadata');
        const entityDefinition = await getEntityDefinition(response, credentials.url, entity);
        const { DisplayName, Attributes, error } = entityDefinition;
        if (error) {
            console.log("error: ", error.message);
            return;
        }
        const noSpaceName = DisplayName.LocalizedLabels[0].Label.replace(" ", "");
        console.log("generating definition file");
        const content = render(Attributes, noSpaceName);
        const fileName = `./${noSpaceName}.d.ts`;
        console.log(`writing ${fileName}`);
        writeFileSync(fileName, content);
        console.log('Finished!');
    }
});
