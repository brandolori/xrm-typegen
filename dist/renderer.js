"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const fs_1 = require("fs");
const handlebars_1 = require("handlebars");
const path_1 = require("path");
const mapping = {
    "#Microsoft.Dynamics.CRM.LookupAttributeMetadata": "LookupAttribute",
    "#Microsoft.Dynamics.CRM.StringAttributeMetadata": "StringAttribute",
    "#Microsoft.Dynamics.CRM.MemoAttributeMetadata": "StringAttribute",
    "#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata": "DateAttribute",
    "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata": "NumberAttribute",
    "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata": "NumberAttribute",
    "#Microsoft.Dynamics.CRM.DoubleAttributeMetadata": "NumberAttribute",
    "#Microsoft.Dynamics.CRM.BigIntAttributeMetadata": "NumberAttribute",
    "#Microsoft.Dynamics.CRM.DecimalAttributeMetadata": "NumberAttribute",
    "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata": "BooleanAttribute",
    "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata": "OptionSetAttribute",
    "#Microsoft.Dynamics.CRM.StatusAttributeMetadata": "OptionSetAttribute",
    "#Microsoft.Dynamics.CRM.StateAttributeMetadata": "OptionSetAttribute"
};
const render = (attributes, name) => {
    const templateBuffer = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "..", "src", "template.hbs"));
    const template = (0, handlebars_1.compile)(templateBuffer.toString());
    // clean up the api response:
    const cleanedAttributes = attributes
        // remove invalid lines, being the ones that have enpty parameters or that are not yet mapped
        .filter(el => el['@odata.type'] && el.LogicalName && Object.keys(mapping).includes(el['@odata.type']))
        // "@" is not a valid character in handlebars, so we remove it
        .map(el => ({
        name: el.LogicalName,
        type: mapping[el['@odata.type']]
    }));
    const dts = template({
        attributes: cleanedAttributes,
        name
    });
    return dts;
};
exports.render = render;
exports.default = exports.render;
