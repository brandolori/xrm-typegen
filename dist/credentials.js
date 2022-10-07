"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentials = void 0;
const fs_1 = require("fs");
const readline_1 = __importDefault(require("readline"));
const filePath = "xrm-typegen-config.json";
const getCredentials = async () => {
    try {
        return JSON.parse((0, fs_1.readFileSync)(filePath).toString());
    }
    catch (Exception) {
        return await generateCredentials();
    }
};
exports.getCredentials = getCredentials;
const promiseQuestion = (question) => new Promise((res, rej) => {
    const rl = readline_1.default.createInterface(process.stdin, process.stdout);
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
    (0, fs_1.writeFileSync)(filePath, JSON.stringify(obj));
    return obj;
};
