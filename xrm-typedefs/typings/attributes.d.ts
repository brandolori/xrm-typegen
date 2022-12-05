// https://docs.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference
export { };

declare global
{
    type Attribute<T = any> = {
        getValue: () => T;
        setValue: (value: T) => void;
        addOnChange: (onChange: (context: ExecutionContext) => void) => void;
        removeOnChange: (onChange: (context: ExecutionContext) => void) => void;
        controls: Control[];
        setSubmitMode: (mode: "always" | "never" | "dirty") => void;
        getName: () => string;
        getRequiredLevel: () => RequirementLevel;
        setRequiredLevel: (requirementLevel: RequirementLevel) => void;
        getUserPriviledge: () => UserPriviledge;
        fireOnChange: () => void;
        getIsDirty: () => boolean;
    };

    type Option = {
        text: string;
        value: number;
    };

    type EntityLookup = {
        entityType: string,
        id: string,
        name: string;
    };

    type LookupAttributeOverrides = {
        getIsPartyList: () => boolean;
    };

    type NumberAttibuteOverrides = {
        getMax: () => number;
        getMin: () => number;
    };

    type OptionSetAttributeOverrides = {
        getOption: () => Option;
        getOptions: () => Option[];
    };

    type LookupAttribute = Attribute<EntityLookup[]> & LookupAttributeOverrides;

    type StringAttribute = Attribute<string>;

    type NumberAttribute = Attribute<number> & NumberAttibuteOverrides;

    type BooleanAttribute = Attribute<boolean>;

    type DateAttribute = Attribute<Date>;

    type OptionSetAttribute = Attribute<number> & OptionSetAttributeOverrides;

    type AnyAttribute = Attribute & Partial<NumberAttibuteOverrides> & Partial<OptionSetAttributeOverrides> & Partial<LookupAttributeOverrides>;

}
