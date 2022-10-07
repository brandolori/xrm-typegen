#!/usr/bin/env node

import { AuthenticationContext, TokenResponse } from 'adal-node'
import { program } from 'commander'
import { writeFileSync } from 'fs'
import { getEntityDefinition } from './queries'
import { render } from './renderer'

program
    .version(require('../package.json').version)
    .name('xrmtypesgen')

    .requiredOption('-u, --url <url>', `Dynamics Url. e.g. https://myorg.crm11.dynamics.com/`)
    .requiredOption('-t, --tenent <tenent>', `AD authority. e.g. https://login.windows.net/myorg.onmicrosoft.com`)
    .option('-n, --username <username>', `Username`)
    .option('-p, --password <password>', `Password`)
    .option('-s, --secret <secret>', 'OAuth Client Secret')
    .option('-c, --clientid <clientid>', 'OAuth Client Id')
    .option('-e, --entity <entities>', 'The entity to create the typings for')

    .addHelpText(
        'afterAll',
        "e.g. xrm-typegen --url https://myorg.crm11.dynamics.com/ --tenent https://login.windows.net/myorg.onmicrosoft.com --entity account --clientid myclientid --secret mysecret"
    )

program.parse()
const options = program.opts()

const Main = async (authToken: TokenResponse) => {
    console.log('getting form metadata')

    const { Attributes, DisplayName } = await getEntityDefinition(authToken, options.url, options.entities)

    const noSpaceName = DisplayName.LocalizedLabels[0].Label.replace(" ", "")
    const capitalizedName = noSpaceName.substring(0, 1).toUpperCase() + noSpaceName.substring(1)

    const content = render(Attributes, capitalizedName)

    const fileName = `./${capitalizedName}.d.ts`

    console.log(`writing ${fileName}`)
    writeFileSync(
        fileName,
        content,
    )

    console.log('Finished!')
}

console.log('authenticating')
const authContext = new AuthenticationContext(options.tenent)
if (options.password) {
    authContext.acquireTokenWithUsernamePassword(
        options.url,
        options.username,
        options.password,
        options.clientid,
        (error, response) => {
            if (error) {
                console.error(`Error: ${error.message}`)
            }
            if ((response as TokenResponse).accessToken) {
                Main(response as TokenResponse)
            }
        },
    )
} else if (options.secret) {
    authContext.acquireTokenWithClientCredentials(
        options.url,
        options.clientid,
        options.secret,
        (error, response) => {
            if (error) {
                console.error(`Error: ${error.message}`)
            }
            if ((response as TokenResponse).accessToken) {
                Main(response as TokenResponse)
            }
        },
    )
}
