import { readFileSync, writeFileSync } from "node:fs";
import Readline from "node:readline";
const filePath = "./typings/xrm-typegen-config.json";
export const getSettings = async () => {
    try {
        return JSON.parse(readFileSync(filePath).toString());
    }
    catch (Exception) {
        return await generateSettings();
    }
};
export const saveSettings = (settings) => {
    writeFileSync(filePath, JSON.stringify(settings));
};
const promiseQuestion = (question) => new Promise((res, rej) => {
    const rl = Readline.createInterface(process.stdin, process.stdout);
    rl.question(question, (answ) => {
        rl.close();
        res(answ);
    });
});
const generateSettings = async () => {
    const obj = {
        clientid: await promiseQuestion("Insert clientid: "),
        secret: await promiseQuestion("Insert secret: "),
        tenent: await promiseQuestion("Insert tenent: "),
        url: await promiseQuestion("Insert url: "),
        synchronizedEntities: []
    };
    saveSettings(obj);
    return obj;
};
