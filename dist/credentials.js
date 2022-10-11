import { readFileSync, writeFileSync } from "fs";
import Readline from "readline";
const filePath = "xrm-typegen-config.json";
export const getCredentials = async () => {
    try {
        return JSON.parse(readFileSync(filePath).toString());
    }
    catch (Exception) {
        return await generateCredentials();
    }
};
const promiseQuestion = (question) => new Promise((res, rej) => {
    const rl = Readline.createInterface(process.stdin, process.stdout);
    rl.question(question, (answ) => {
        rl.close();
        res(answ);
    });
});
const generateCredentials = async () => {
    const obj = {
        clientid: await promiseQuestion("Insert clientid: "),
        secret: await promiseQuestion("Insert secret: "),
        tenent: await promiseQuestion("Insert tenent: "),
        url: await promiseQuestion("Insert url: "),
    };
    writeFileSync(filePath, JSON.stringify(obj));
    return obj;
};
