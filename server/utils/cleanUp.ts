import { unlink } from "fs/promises"

const cleanUpStorage = async(path: string)=>{
    try {
        await unlink(path)
    } catch (err) {
        console.error("Error deleting file:", err)
    }
}

export {cleanUpStorage}