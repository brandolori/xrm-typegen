// https://docs.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference

type Attribute<T = any> = {
    getValue: () => T
    setValue: (value: T) => void
    addOnChange: (onChange: (context: ExecutionContext<void, any>) => void) => void
    removeOnChange: (onChange: (context: ExecutionContext<void, any>) => void) => void
    controls: { get: () => Control[] }
    setSubmitMode: (mode: "always" | "never" | "dirty") => void
    getName: () => string
    getRequiredLevel: () => RequirementLevel
    setRequiredLevel: (requirementLevel: RequirementLevel) => void
    getUserPriviledge: () => UserPriviledge
    fireOnChange: () => void
    getIsDirty: () => boolean
}

type Option = {
    text: string
    value: number
}

type EntityLookup = {
    entityType: string,
    id: string,
    name: string
}

type CrmFile = {
    fileName: string,
    fileSize: number,
    fileUrl: string
}

type LookupAttributeOverrides = {
    getIsPartyList: () => boolean
}

type NumberAttibuteOverrides = {
    getMax: () => number
    getMin: () => number
}

type OptionSetAttributeOverrides = {
    getOption: () => Option
    getOptions: () => Option[]
    getInitialValue: () => number
}

type LookupAttribute = Attribute<EntityLookup[]> & LookupAttributeOverrides

type StringAttribute = Attribute<string>

type NumberAttribute = Attribute<number> & NumberAttibuteOverrides

type BooleanAttribute = Attribute<boolean>

type DateAttribute = Attribute<Date>

type FileAttribute = Attribute<CrmFile>

type OptionSetAttribute = Attribute<number> & OptionSetAttributeOverrides

type AnyAttribute = Attribute & Partial<NumberAttibuteOverrides> & Partial<OptionSetAttributeOverrides> & Partial<LookupAttributeOverrides>
