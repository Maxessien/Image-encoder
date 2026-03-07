import type { Request, Response } from "express";
import { decodeImage, encodeImage } from "../utils/encoder.js";


const encodeTextInImage = async(req: Request, res: Response)=>{
    try {
        const {text} = req.body
        const buffer = encodeImage(req.file?.path ?? "", text)
        return res.send(buffer)
    } catch (err) {
        console.log(err)
        return res.status(500).json("Couldn't encode image")
    }
}

const decodeTextInImage = async (req:Request, res: Response) => {
    try {
        const text = decodeImage(req.file?.path ?? "")
        return res.status(200).json({text: text})
    } catch (err) {
        console.log(err)
        return res.status(500).json("Couldn't decode image")
    }
}

export {encodeTextInImage, decodeTextInImage}