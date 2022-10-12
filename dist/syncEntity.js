import { writeFileSync } from "node:fs";
import { getEntityDefinition } from "./queries.js";
import render from "./renderer.js";
export default async (entity, token, credentials) => {
    console.log('getting form metadata for entity', entity);
    const entityDefinition = await getEntityDefinition(token, credentials.url, entity);
    const { DisplayName, Attributes, error } = entityDefinition;
    if (error) {
        throw new Error(error.message);
    }
    const noSpaceName = DisplayName.LocalizedLabels[0].Label.replace(" ", "");
    console.log("generating definition file");
    const content = render(Attributes, noSpaceName);
    const fileName = `./${noSpaceName}.d.ts`;
    console.log(`writing ${fileName}`);
    writeFileSync(fileName, content);
    console.log('Finished!');
};