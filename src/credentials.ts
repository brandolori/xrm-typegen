import { readFileSync, writeFileSync } from "node:fs"
import Readline from "node:readline"

export type Settings = {
    url: string
    tenent: string
    clientid: string
    secret: string
    synchronizedEntities: string[]
}

const filePath = "xrm-typegen-config.json"

export const getSettings = async () => {
    try {
        return JSON.parse(readFileSync(filePath).toString()) as Settings
    } catch (Exception) {
        return await generateSettings()
    }
}

export const saveSettings = (settings: Settings) => {
    writeFileSync(filePath, JSON.stringify(settings))
}

const promiseQuestion = (question: string) => new Promise<string>((res, rej) => {
    const rl = Readline.createInterface(process.stdin, process.stdout)
    rl.question(question, (answ: string) => {
        rl.close()
        res(answ)
    })
})

const generateSettings = async () => {

    const obj: Settings = {
        clientid: await promiseQuestion("Insert clientid: "),
        secret: await promiseQuestion("Insert secret: "),
        tenent: await promiseQuestion("Insert tenent: "),
        url: await promiseQuestion("Insert url: "),
        synchronizedEntities: []
    }

    saveSettings(obj)

    return obj

}