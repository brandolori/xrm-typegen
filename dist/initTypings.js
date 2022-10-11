import { copy } from "fs-extra";
export default async () => {
    await copy(new URL("../xrm-typedefs", import.meta.url).pathname.substring(1), ".");
    console.log("success!");
};
