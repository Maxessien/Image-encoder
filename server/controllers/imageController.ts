import type { Request, Response } from "express";
import { decodeImage, encodeImage } from "../utils/encoder.js";
import { cleanUpStorage } from "../utils/cleanUp.js";


const encodeTextInImage = async(req: Request, res: Response)=>{
    try {
        const {text} = req.body
        const buffer = await encodeImage(req.file?.path ?? "", text)
        if (req.file?.path.trim()) cleanUpStorage(req.file?.path)
        res.set("Content-Type", "image/png")
        return res.send(buffer)
    } catch (err) {
        console.log(err)
        return res.status(500).json("Couldn't encode image")
    }
}

const decodeTextInImage = async (req:Request, res: Response) => {
    try {
        const text = await decodeImage(req.file?.path ?? "")
        if (req.file?.path.trim()) cleanUpStorage(req.file?.path)
        return res.status(200).json({text: text})
    } catch (err) {
        console.log((err as Error).message)
        return res.status(500).json({message: (err as Error).message ?? "Couldn't decode image"})
    }
}

export {encodeTextInImage, decodeTextInImage}