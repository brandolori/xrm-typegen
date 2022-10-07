"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntityDefinition = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const initHeader = (accessToken) => ({
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
});
const getEntityDefinition = async (authToken, url, entity) => {
    const response = await node_fetch_1.default(`${url}/api/data/v9.0/EntityDefinitions(LogicalName='${entity}')`
        + "?$expand=Attributes($select=LogicalName)", {
        headers: initHeader(authToken.accessToken),
        method: 'GET',
    });
    return await response.json();
};
exports.getEntityDefinition = getEntityDefinition;
//# sourceMappingURL=queries.js.map