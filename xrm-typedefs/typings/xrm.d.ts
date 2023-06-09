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
        openForm: (entityFormOptions: EntityFormOptions, formParameters: any) => Promise<{ savedEntityReference: { entityType: string, id: string, name: string }[] | null }>
        navigateTo: (pageInput: any, navigationOptions: any) => Promise<any>
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
        deleteRecord: (entityLogicalName: string, id: string) => Promise<{ entityType: string, id: string, name: string }>
    }

    type Utility = {
        showProgressIndicator: (message: string) => void
        closeProgressIndicator: () => void
        getGlobalContext: () => GlobalContext
        getPageContext: () => PageContext
        getEntityMetadata: (entityName: string, attributes: string | string[]) => Promise<any>
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
        input: {
            pageType: "entityrecord"
            entityName: string
            entityId: string
            createFromEntity: EntityLookup
            formId: string
        }
    }

    type Client = {
        getClient: () => "Web" | "Outlook" | "Mobile"
        getClientState: () => "Online" | "Offline"
    }

    type AlertStrings = { confirmButtonLabel?: string, text: string, title?: string }
    type DialogOptions = { height?: number, width?: number }

    type ConfirmStrings = { cancelButtonLabel?: string, confirmButtonLabel?: string, subtitle?: string, text: string, title?: string }

}
