import { readFileSync } from 'fs'
import { compile } from 'handlebars'
import { Attribute } from './queries'

const mapping: any = {
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
}

export const render = (attributes: Attribute[], name: string): string => {

    const templateBuffer = readFileSync(`${__dirname}/template.hbs`)
    const template = compile(templateBuffer.toString())

    // clean up the api response:
    const cleanedAttributes = attributes
        // remove invalid lines, being the ones that have enpty parameters or that are not yet mapped
        .filter(el => el['@odata.type'] && el.LogicalName && Object.keys(mapping).includes(el['@odata.type']))
        // "@" is not a valid character in handlebars, so we remove it
        .map(el => ({
            name: el.LogicalName,
            type: mapping[el['@odata.type']]
        }))

    const dts = template({
        attributes: cleanedAttributes,
        name
    })
    return dts
}

export default render
