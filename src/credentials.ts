import { readFileSync, writeFileSync } from "fs"
import Readline from "readline"

export type Credentials = {
    url: string
    tenent: string
    clientid: string
    secret: string
}

const filePath = "xrm-typegen-config.json"

export const getCredentials = async () => {
    try {

        return JSON.parse(readFileSync(filePath).toString()) as Credentials
    } catch (Exception) {
        return await generateCredentials()
    }
}

const promiseQuestion = (question: string) => new Promise<string>((res, rej) => {
    const rl = Readline.createInterface(process.stdin, process.stdout)
    rl.question(question, (answ: string) => {
        rl.close()
        res(answ)
    })
})

const generateCredentials = async () => {

    const obj: Credentials = {
        clientid: await promiseQuestion("Insert clientid: "),
        secret: await promiseQuestion("Insert secret: "),
        tenent: await promiseQuestion("Insert tenent: "),
        url: await promiseQuestion("Insert url: "),
    }

    writeFileSync(filePath, JSON.stringify(obj))

    return obj

}