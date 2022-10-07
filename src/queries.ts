import { TokenResponse } from 'adal-node';
import fetch from 'node-fetch';
import { Attribute } from 'renderer';

const initHeader = (accessToken: string) => ({
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
});

type EntityDefinition = { Attributes: Attribute[], DisplayName: { LocalizedLabels: { Label: string }[] } }

export const getEntityDefinition = async (
    authToken: TokenResponse,
    url: string,
    entity: string,
): Promise<EntityDefinition> => {
    const response = await fetch(
        `${url}/api/data/v9.0/EntityDefinitions(LogicalName='${entity}')`
        + "?$expand=Attributes($select=LogicalName)",
        {
            headers: initHeader(authToken.accessToken),
            method: 'GET',
        },
    );
    const json = await response.json();
    return json;

};