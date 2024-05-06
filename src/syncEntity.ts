import { TokenResponse } from "adal-node"
import { writeFileSync } from "node:fs"
import { Settings } from "./credentials.js"
import { getEntityDefinition } from "./queries.js"
import render from "./renderer.js"

export default async (entity: string, token: TokenResponse, credentials: Settings) => {

    console.log('getting form metadata for entity', entity)

    const entityDefinition = await getEntityDefinition(token, credentials.url, entity)
    const { DisplayName, Attributes, error } = entityDefinition

    if (error) {
        throw new Error(error.message)
    }

    const sortedAttributes = Attributes.sort((a, b) => a.LogicalName.localeCompare(b.LogicalName))

    const noSpaceName = DisplayName.LocalizedLabels[0].Label
        .split(" ")
        .filter(el => el.length > 0)
        .map(el => el.substring(0, 1).toUpperCase() + el.substring(1))
        .join("")

    console.log("generating definition file")

    const content = render(sortedAttributes, noSpaceName)
    const fileName = `./typings/${noSpaceName}.d.ts`

    console.log(`writing ${fileName}`)

    writeFileSync(
        fileName,
        content,
    )

    console.log('Finished!')
}