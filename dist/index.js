#!/usr/bin/env node
import { getSettings, saveSettings } from "./credentials.js";
import { AuthenticationContext } from 'adal-node';
import syncEntity from "./syncEntity.js";
import { copy } from "fs-extra";
if (process.argv.length > 2 && process.argv[2] == "--init") {
    await copy(new URL("../xrm-typedefs", import.meta.url).pathname.substring(1), ".");
    console.log("success!");
    process.exit(0);
}
const settings = await getSettings();
console.log('authenticating');
const authContext = new AuthenticationContext(settings.tenent);
authContext.acquireTokenWithClientCredentials(settings.url, settings.clientid, settings.secret, async (error, response) => {
    if (error) {
        throw new Error(`authentication error: ${error.message}`);
    }
    if (response.accessToken) {
        console.log('connection success');
        // sync only the required things
        const toSync = process.argv.length < 3
            ? settings.synchronizedEntities
            : [process.argv[2]];
        for (const entity of toSync) {
            await syncEntity(entity, response, settings);
        }
        // if we just successfully synchronized with a new entity, add it to the settings file
        if (process.argv.length > 2) {
            if (!settings.synchronizedEntities.includes(process.argv[2])) {
                settings.synchronizedEntities.push(process.argv[2]);
                saveSettings(settings);
            }
        }
    }
});
