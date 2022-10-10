// https://docs.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference
export { };

type Override<T, U> = Omit<T, keyof U> & U;

declare global
{
    type Option = {
        text: string;
        value: number;
    };

    type Attribute<T = any> = {
        getValue: () => T;
        setValue: (value: T) => void;
        addOnChange: (onChange: (context: ExecutionContext) => void) => void;
        controls: Control[];
        setSubmitMode: (mode: "always" | "never" | "dirty") => void;
        getName: () => string;
        getRequiredLevel: () => RequirementLevel;
        setRequiredLevel: (requirementLevel: RequirementLevel) => void;
        getUserPriviledge: () => UserPriviledge;
        fireOnChange: () => void;
        getIsDirty: () => boolean;
    };


    type LookupAttribute = Override<Attribute<EntityLookup[]>, {
        getIsPartyList: () => boolean;
    }>;

    type StringAttribute = Attribute<string>;

    type NumberAttribute = Override<Attribute<number>, {
        getMax: () => number;
        getMin: () => number;
    }>;

    type BooleanAttribute = Attribute<boolean>;

    type DateAttribute = Attribute<Date>;

    type OptionSetAttribute = Override<Attribute<number>, {
        getOption: () => Option;
        getOptions: () => Option[];
    }>;

    type EntityLookup = {
        entityType: string,
        id: string,
        name: string;
    };
}
