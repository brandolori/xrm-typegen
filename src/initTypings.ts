import { copy } from "fs-extra"

export default () => {
    copy(new URL("../xrm-typedefs", import.meta.url), ".", (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log("success!")
        }
    })
}