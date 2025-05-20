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
    const sortedAttributes = Attributes.sort((a, b) => a.LogicalName.localeCompare(b.LogicalName));
    const noSpaceName = DisplayName.LocalizedLabels[0].Label
        .split(/[\s-]+/) // splits on spaces or hyphens
        .filter(el => el.length > 0)
        .map(el => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase()) // capitalize
        .join('');
    console.log("generating definition file");
    const content = render(sortedAttributes, noSpaceName);
    const fileName = `./typings/${noSpaceName}.d.ts`;
    console.log(`writing ${fileName}`);
    writeFileSync(fileName, content);
    console.log('Finished!');
};
