import fetch from 'node-fetch';
const initHeader = (accessToken) => ({
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
});
export const getEntityDefinition = async (authToken, url, entity) => {
    const response = await fetch(`${url}/api/data/v9.0/EntityDefinitions(LogicalName='${entity}')`
        + "?$expand=Attributes($select=LogicalName)", {
        headers: initHeader(authToken.accessToken),
        method: 'GET',
    });
    return await response.json();
};
