#!/usr/bin/env node

import { getCredentials } from "./credentials"
import { AuthenticationContext, TokenResponse } from 'adal-node'
import { writeFileSync } from 'fs'
import { getEntityDefinition } from './queries'
import { render } from './renderer'

const main = async () => {
    const credentials = await getCredentials()

    console.log('authenticating')
    const authContext = new AuthenticationContext(credentials.tenent)

    authContext.acquireTokenWithClientCredentials(
        credentials.url,
        credentials.clientid,
        credentials.secret,
        async (error, response) => {
            if (error) {
                console.error(`Error: ${error.message}`)
            }
            if ((response as TokenResponse).accessToken) {
                console.log('connection success')
                if (process.argv.length < 3) {
                    console.log("entity name not passed. Stopping execution")
                    return
                }
                const entity = process.argv[2]

                console.log('getting form metadata')
                const { Attributes, DisplayName } = await getEntityDefinition((response as TokenResponse), credentials.url, entity)

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
        },
    )
}


main()