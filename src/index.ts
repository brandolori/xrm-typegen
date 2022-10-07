#!/usr/bin/env node

import { AuthenticationContext, TokenResponse } from 'adal-node';
import { program } from 'commander';
import { writeFileSync } from 'fs';
import { terms } from './terms';
import { getEntityDefinition } from './queries';
import { render } from './renderer';

program.version(require('../package.json').version).name('xrmtypesgen');

program
    .requiredOption('-u, --url <url>', `${terms.d365} Url. e.g. https://myorg.crm11.dynamics.com/`)
    .option('-n, --username <username>', `Username for ${terms.d365}`)
    .option('-p, --password <password>', `Password for ${terms.d365}`)
    .option('--secret <secret>', 'OAuth Client Secret')
    .requiredOption(
        '-t, --tenent <tenent>',
        `${terms.AAD} authority. e.g. https://login.windows.net/myorg.onmicrosoft.com`,
    )
    .option('-c, --clientid <clientid>', 'OAuth Client Id', '51f81489-12ee-4a9e-aaae-a2591f45987d')
    .option('-e, --entity <entities>', 'The entity to create the typings for')

program.addHelpText(
    'afterAll',
    "e.g. xrm-typegen --url https://myorg.crm11.dynamics.com/ --tenent https://login.windows.net/myorg.onmicrosoft.com --entity account --clientid myclientid --secret mysecret"
);

program.parse();
const options = program.opts();

const Main = async (authToken: TokenResponse) => {
    console.log('getting form metadata');

    const { Attributes, DisplayName } = await getEntityDefinition(authToken, options.url, options.entities);

    const noSpaceName = DisplayName.LocalizedLabels[0].Label.replace(" ", "")
    const capitalizedName = noSpaceName.substring(0, 1).toUpperCase() + noSpaceName.substring(1)

    const content = render(Attributes, capitalizedName)

    writeFileSync(
        `./${capitalizedName}.d.ts`,
        content,
    );

    console.log('Finished!');
};

console.log('authenticating');
const authContext = new AuthenticationContext(options.tenent);
if (options.password) {
    authContext.acquireTokenWithUsernamePassword(
        options.url,
        options.username,
        options.password,
        options.clientid,
        (error, response) => {
            if (error) {
                console.error(`Error: ${error.message}`);
            }
            if ((response as TokenResponse).accessToken) {
                Main(response as TokenResponse);
            }
        },
    );
} else if (options.secret) {
    authContext.acquireTokenWithClientCredentials(
        options.url,
        options.clientid,
        options.secret,
        (error, response) => {
            if (error) {
                console.error(`Error: ${error.message}`);
            }
            if ((response as TokenResponse).accessToken) {
                Main(response as TokenResponse);
            }
        },
    );
}
