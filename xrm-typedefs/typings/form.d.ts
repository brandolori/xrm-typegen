// https://docs.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference
export { }

declare global {
    type ExecutionContext<TExtraArgs = void, TEntity extends AnyEntity = AnyEntity> = {
        getFormContext: () => FormContext<TEntity>
        getEventSource: () => any
        getEventArgs: () => TExtraArgs
        getDepth: () => number
    }

    type AnyEntity = {
        [key: string]: AnyAttribute
    }

    type FormContext<TEntity extends AnyEntity = AnyEntity> = {
        getAttribute: <TField extends keyof TEntity> (id: TField) => TEntity[TField]
        getControl: (<TField extends keyof TEntity> (id: TField) => Control) & (() => Control[])
        data: Data<TEntity>
        ui: Ui<TEntity>
    }

    type Control = {
        addOnLoad: (onLoad: (context: ExecutionContext) => void) => void
        getValue: () => string
        /** If set to true, the control will not be editable */
        setDisabled: (disabled: boolean) => void
        getDisabled: () => boolean
        /** If set to false, the control will not be shown */
        setVisible: (visible: boolean) => void
        getVisible: () => boolean
        setLabel: (label: string) => void
        setFocus: () => void
        getName: () => string
        addNotification: (options: ControlNotificationOptions) => void
        clearNotification: (id: string) => void
        getOptions: () => Option[]
        addOption: (option: Option, index?: number) => void
        removeOption: (value: number) => void
        clearOptions: () => void
        addCustomFilter: (filter: string, entityLogicalName?: string) => void
        addPreSearch: (onPreSearch: (context: ExecutionContext<void, any>) => void) => void
        removePreSearch: (onPreSearch: (executionContext: ExecutionContext) => void) => void
        getAttribute: () => Attribute
        addCustomView: (
            viewId: string,
            entityName: string,
            viewDisplayName: string,
            fetchXml: string,
            layoutXml: string,
            isDefault: boolean) => void
        getDefaultView: () => string
        setDefaultView: (viewId: string) => void
        setEntityTypes: (entityLogicalNames: string[]) => void
    }

    type Data<TEntity extends AnyEntity = AnyEntity> = {
        entity: EntityProperties<TEntity>
        process: ProcessProperties
        getIsDirty: () => boolean
        isValid: () => boolean
        refresh: (save?: boolean) => Promise<void>
        save: (saveOptions?: { saveMode?: number }) => Promise<void>
    }

    type EntityProperties<TEntity extends AnyEntity = AnyEntity> = {
        getIsDirty: () => boolean
        getDataXml: () => string
        getId: () => string
        addOnSave: (onSave: ExecutionContext<SaveEventArgs>) => void
        getEntityName: () => string
        getEntityReference: () => { entityType: string, id: string, name?: string }
        getPrimaryAttributeValue: () => string
        isValid: () => string
        removeOnSave: (onSave: (context: ExecutionContext<SaveEventArgs>) => void) => void
        save: (saveOption: "saveandclose" | "saveandnew") => void;
        attributes: { get: () => TEntity[keyof TEntity][]; }
    }

    type ProcessProperties = {
        addOnPreProcessStatusChange: (onPreChange: (context: ExecutionContext<any, any>) => void) => void
        removeOnPreProcessStatusChange: (onPreChange: (context: ExecutionContext<any, any>) => void) => void
        addOnProcessStatusChange: (onChange: (context: ExecutionContext<any, any>) => void) => void
        removeOnProcessStatusChange: (onChange: (context: ExecutionContext<any, any>) => void) => void;
        addOnPreStageChange: (onPreChange: (context: ExecutionContext<any, any>) => void) => void
        removeOnPreStageChange: (onPreChange: (context: ExecutionContext<any, any>) => void) => void
        addOnStageChange: (onChange: (context: ExecutionContext<any, any>) => void) => void
        removeOnStageChange: (onChange: (context: ExecutionContext<any, any>) => void) => void
        addOnStageSelected: (onSelected: (context: ExecutionContext<any, any>) => void) => void
        removeOnStageSelected: (onSelected: (context: ExecutionContext<any, any>) => void) => void

        getActiveProcess: () => Process
        setActiveProcess: (processId: string, callbackFunction: (status: "success" | "invalid") => void) => void
        getEnabledProcesses: (callbackFunction: (processes: any) => void) => void

        getActiveStage: () => Stage
        setActiveStage: (id: string, callback: (result: string) => void) => void

        getStatus: () => ProcessStatus
        setStatus: (status: ProcessStatus | "invalid", callback: (status: ProcessStatus | "invalid") => void) => void

        moveNext: (callbackFunction?: (status: "success" | "crossEntity" | "end" | "invalid" | "dirtyForm" | "stageGate") => void) => void
        movePrevious: (callbackFunction?: (status: "success" | "crossEntity" | "beginning" | "invalid" | "dirtyForm" | "stageGate" | "preventDefault") => void) => void
    }

    type Process = {
        getId: () => string
        getName: () => string
        getStages: () => { get: () => Stage[] }
        isRendered: () => boolean
    }

    type ProcessStatus = "active" | "aborted" | "finished"

    type Stage = {
        getCategory: () => { getValue: () => number }
        getEntityName: () => string
        getId: () => string
        getName: () => string
        getNavigationBehavior: () => { allowCreateNew: () => boolean }
        getStatus: () => "active" | "inactive"
        getSteps: () => Step[]
    }

    type Step = {
        getAttribute: () => string
        getName: () => string
        getProgress: () => number
        isRequired: () => boolean
        setProgress: (stepProgress: number, message: string) => "invalid" | "success"
    }

    type Ui<TEntity extends AnyEntity = AnyEntity> = {
        setFormNotification: (message: string, level: "ERROR" | "WARNING" | "INFO", uniqueId: string) => void
        clearFormNotification: (id: string) => void
        close: () => void
        /** 0: Undefined, 1: Create/QuickCreate, 2: Update, 3: Read Only, 4: Disabled, 6: Bulk Edit  */
        getFormType: () => number
        tabs: { get: (tabId: string) => Tab<TEntity> }
        refreshRibbon: (refreshAll?: boolean) => void
        addOnLoad: (onLoad: ExecutionContext<LoadEventArgs, TEntity>) => void
        removeOnLoad: (onLoad: ExecutionContext<LoadEventArgs, TEntity>) => void
        getViewPortHeight: () => number
        getViewPortWidth: () => number
        setFormEntityName: (name: string) => void
        quickForms: {
            get: (id: string | number) => QuickFormControl
        }
    }


    type QuickFormControl = {
        setDisabled: (disabled: boolean) => void
        getVisible: () => boolean
        /** If set to false, the control will not be shown */
        setVisible: (visible: boolean) => void
        setLabel: (label: string) => void
        setFocus: () => void
    }

    type TabContentType = "cardSections" | "singleComponent"
    type TabDisplayState = "expanded" | "collapsed"

    type Tab<TEntity extends AnyEntity = AnyEntity> = {
        sections: {
            get: (sectionId: string) => Section<TEntity>
        }
        getContentType: () => TabContentType
        getDisplayState: () => TabDisplayState
        getLabel: () => string
        getName: () => string
        getParent: Ui<TEntity>
        getVisible: () => boolean
        setLabel: (label: string) => void
        setVisible: (visible: boolean) => void
        addTabStateChange: (context: ExecutionContext<void, TEntity>) => void
        removeTabStateChange: (context: ExecutionContext<void, TEntity>) => void
        setContentType: (type: TabContentType) => void
        setDisplayState: (type: TabDisplayState) => void
        setFocus: () => void
    }

    type Section<TEntity extends AnyEntity = AnyEntity> = {
        controls: Control[]
        getLabel: () => string
        getName: () => string
        getParent: () => Tab<TEntity>
        getVisible: () => boolean
        setLabel: (label: string) => void
        setVisible: (visible: boolean) => void
    }

    type RequirementLevel = "none" | "required" | "recommended"

    type UserPriviledge = { canRead: boolean, canUpdate: boolean, canCreate: boolean }

    type ControlNotificationOptions = {
        uniqueId: string
        notificationLevel: "ERROR" | "RECOMMENDATION"
        messages: string[]
        actions?: {
            message: string,
            actions: (() => void)[]
        }[]
    }

    type SaveEventArgs = {
        preventDefault: () => void
        getSaveMode: () => number
        isDefaultPrevented: () => boolean
    }

    type LoadEventArgs = {
        getDataLoadState: () => number
    }

    type OnPreStageChangeArgs = {
        getDirection: () => "Next" | "Previous"
        getStage: () => Stage
        preventDefault: () => {}
    }

    type OnStageChangeArgs = {
        getDirection: () => "Next" | "Previous"
        getStage: () => Stage
        preventDefault: () => {}
    }
}
