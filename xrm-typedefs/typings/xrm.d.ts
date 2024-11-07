// https://docs.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference
export { }

declare global {
    const Xrm: {
        Navigation: Navigation
        WebApi: WebApi
        Utility: Utility
        App: App
        /** @deprecated use formContext instead */
        Page: any
    }

    type Navigation = {
        openAlertDialog: OpenAlertDialog
        openConfirmDialog: OpenConfirmDialog
        openForm: (entityFormOptions: EntityFormOptions, formParameters: any) => Promise<{ savedEntityReference: EntityReference[] | null }>
        navigateTo: (pageInput: PageInput, navigationOptions: NavigationOptions) => Promise<EntityReference[] | undefined>
    }
    type PageInput = {
        pageType: "entitylist"
        entityName: string
        viewId?: string
        viewType?: string
    } |
    {
        pageType: "entityrecord"
        entityName: string
        entityId?: string
        createFromEntity?: EntityReference
        data?: any
        formId?: string
        isCrossEntityNavigate?: boolean
        isOfflineSyncError?: boolean
        processId?: string
        processInstanceId?: string
        relationship?: any
        selectedStageId?: string
        tabName?: string
    } |
    {
        pageType: "dashboard"
        dashboardId: string
    } |
    {
        pageType: "webresource"
        webresourceName: string
        data?: string
    } |
    {
        pageType: "custom"
        name: string
        entityName?: string
        recordId?: string
    }

    type NavigationOptions = {
        /** Specify 1 to open inline, 2 to open in dialog */
        target: 1 | 2
        width: number | { value: number, unit: string }
        height: number | { value: number, unit: string }
        /** Specify 1 to open in the center, 2 to open on the side */
        position?: 1 | 2
        title?: string
    }

    type WebApi = WebApiImpl & {
        online: WebApiImpl
        offline: WebApiImpl
    }

    type WebApiImpl = {
        execute: (request: { getMetadata: () => any }) => Promise<{ headers: any, ok: boolean, status: number, statusText: string, url: string, json: () => Promise<any>, text: Promise<string> }>
        createRecord: (entityLogicalName: string, data: any) => Promise<{ entityType: string, id: string }>
        retrieveRecord: (entityLogicalName: string, id: string, options?: string) => Promise<{ [key: string]: any }>
        retrieveMultipleRecords: (entityLogicalName: string,
            options?: string,
            maxPageSize?: number,
            successCallback?: () => any,
            errorCallback?: () => any) => Promise<{ entities: any[] }>
        updateRecord: (entityLogicalName: string, id: string, data: any) => Promise<{ entityType: string, id: string }>
        deleteRecord: (entityLogicalName: string, id: string) => Promise<EntityReference>
    }

    type EntityReference = { entityType: string, id: string, name?: string }

    type Utility = {
        showProgressIndicator: (message: string) => void
        closeProgressIndicator: () => void
        getGlobalContext: () => GlobalContext
        getPageContext: () => PageContext
        getEntityMetadata: (entityName: string, attributes: string | string[]) => Promise<any>
        lookupObjects: (options: LookupOptions) => Promise<EntityReference[]>
    }

    type LookupOptions = {
        allowMultiSelect?: boolean
        defaultEntityType?: string
        defaultViewId?: string
        disableMru?: boolean
        entityTypes: string[]
        filters?: {
            filterXml: string
            entityLogicalName: string
        }[]
        searchText?: string
        viewIds?: string[]
    }

    type App = {
        addGlobalNotification: (options: GlobalNotificationOptions) => Promise<string>
        clearGlobalNotification: (id: string) => Promise<any>
    }

    type GlobalNotificationOptions = {
        level: 1 | 2 | 3 | 4
        message: string
        action?: {
            actionLabel: string,
            eventHandler: () => void
        }
        showCloseButton?: boolean
        type: 2
    }



    type OpenAlertDialog = (alertStrings: AlertStrings, alertOptions?: DialogOptions, closeCallback?: () => any, alertCallback?: () => any) => Promise<void>

    type OpenConfirmDialog = (confirmStrings: ConfirmStrings, confirmOptions?: DialogOptions, successCallback?: () => any, errorCallback?: () => any) => Promise<{ confirmed: boolean }>

    type EntityFormOptions = {
        entityName: string
        entityId?: string
        formId?: string
        cmdbar?: boolean
        createFromEntity?: { entityType: string, id: string, name?: string }
        height?: number
        width?: number
        navbar?: "on" | "off" | "entity"
        openInNewWindow?: boolean
        windowPosition?: 1 | 2
        relationship?: { attributeName: string, name: string, navigationPropertyName: string, relationshipType: 0 | 1, roleType: 1 | 2 }
        selectedStageId?: string
        useQuickCreateForm?: boolean
    }

    type UserSettings = {
        roles: {
            get: () => { id: string, name: string }[]
        }
        userId: string
        userName: string
        languageId: number
    }

    type GlobalContext = {
        client: Client
        userSettings: UserSettings
        getClientUrl: () => string
    }

    type PageContext = {
        pageType: "entityrecord"
        entityName: string
        entityId: string
        createFromEntity: EntityReference
        formId: string
    }

    type Client = {
        getClient: () => "Web" | "Outlook" | "Mobile"
        getClientState: () => "Online" | "Offline"
    }

    type AlertStrings = { confirmButtonLabel?: string, text: string, title?: string }
    type DialogOptions = { height?: number, width?: number }

    type ConfirmStrings = { cancelButtonLabel?: string, confirmButtonLabel?: string, subtitle?: string, text: string, title?: string }

}
