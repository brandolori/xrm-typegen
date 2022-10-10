"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
exports.default = () => {
    (0, fs_extra_1.copy)((0, path_1.join)(__dirname, "..", "xrm-typedefs"), ".", (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("success!");
        }
    });
};
