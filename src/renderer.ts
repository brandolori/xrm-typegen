import { readFileSync } from 'fs';
import { compile } from 'handlebars';

export type Attribute = {
    "@odata.type": string,
    "LogicalName": string,
}

const mapping: any = {
    "#Microsoft.Dynamics.CRM.LookupAttributeMetadata": "LookupAttribute",
    "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata": "LookupAttribute",
    "#Microsoft.Dynamics.CRM.StringAttributeMetadata": "StringAttribute",
    "#Microsoft.Dynamics.CRM.MemoAttributeMetadata": "StringAttribute",
    "#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata": "DateAttribute",
    "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata": "NumberAttribute",
    "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata": "NumberAttribute",
    "#Microsoft.Dynamics.CRM.DoubleAttributeMetadata": "NumberAttribute",
    "#Microsoft.Dynamics.CRM.BigIntAttributeMetadata": "NumberAttribute",
    "#Microsoft.Dynamics.CRM.DecimalAttributeMetadata": "NumberAttribute",
    "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata": "BooleanAttribute",
    "#Microsoft.Dynamics.CRM.StatusAttributeMetadata": "OptionSetAttribute",
    "#Microsoft.Dynamics.CRM.StateAttributeMetadata": "OptionSetAttribute"
}

export const render = (attributes: Attribute[], name: string): string => {

    const templateBuffer = readFileSync(`${__dirname}/template.hbs`);
    const template = compile(templateBuffer.toString());

    const cleanedAttributes = attributes
        .filter(el => el['@odata.type'] && el.LogicalName && Object.keys(mapping).includes(el['@odata.type']))
        .map(el => ({
            name: el.LogicalName,
            type: mapping[el['@odata.type']]
        }))

    const dts = template({
        attributes: cleanedAttributes,
        name
    });
    return dts;
};

export default render;
