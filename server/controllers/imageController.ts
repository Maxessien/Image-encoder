import type { Request, Response } from "express";
import { decodeImage, encodeImage } from "../utils/encoder.js";


const encodeTextInImage = async(req: Request, res: Response)=>{
    try {
        console.log("Encoding...")
        const {text} = req.body
        const buffer = await encodeImage(req.file?.path ?? "", text)
        res.set("Content-Type", "image/png")
        return res.send(buffer)
    } catch (err) {
        console.log(err)
        return res.status(500).json("Couldn't encode image")
    }
}

const decodeTextInImage = async (req:Request, res: Response) => {
    try {
        console.log("Decoding...")
        const text = await decodeImage(req.file?.path ?? "")
        return res.status(200).json({text: text})
    } catch (err) {
        console.log(err)
        return res.status(500).json("Couldn't decode image")
    }
}

export {encodeTextInImage, decodeTextInImage}