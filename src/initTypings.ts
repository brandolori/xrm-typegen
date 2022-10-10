import { copy } from "fs-extra"
import { join } from "path"

export default () => {
    copy(join(__dirname, "..", "xrm-typedefs"), ".", (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log("success!")
        }
    })
}