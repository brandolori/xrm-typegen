// https://docs.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference
export { };

type Override<T, U> = Omit<T, keyof U> & U;


type NumberAttibuteOverrides = {
    getMax: () => number;
    getMin: () => number;
};

type OptionSetAttributeOverrides = {
    getOption: () => Option;
    getOptions: () => Option[];
};

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

    type LookupAttribute = Override<Attribute<EntityLookup[]>, {
        getIsPartyList: () => boolean;
    }>;

    type StringAttribute = Attribute<string>;

    type NumberAttribute = Override<Attribute<number>, NumberAttibuteOverrides>;

    type BooleanAttribute = Attribute<boolean>;

    type DateAttribute = Attribute<Date>;

    type OptionSetAttribute = Override<Attribute<number>, OptionSetAttributeOverrides>;

    type AnyAttribute = Attribute & NumberAttibuteOverrides & OptionSetAttributeOverrides;

    type EntityLookup = {
        entityType: string,
        id: string,
        name: string;
    };
}
