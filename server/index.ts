import type { Multer } from "multer";
import express, { type Request, type Response } from "express"
import { decodeTextInImage, encodeTextInImage } from "./controllers/imageController.js";
import multer from "multer";


declare global {
    namespace Express{
        interface Request{
            file?: Multer.File
        }
    }
}

const upload = multer({dest: "/uploads"})


const app = express()
app.use(express.json())


app.get("/", async(req: Request, res: Response)=>res.send("../dist/index.html"))

app.post("/encode", upload.single("image"), encodeTextInImage)
app.post("/decode",  upload.single("image"), decodeTextInImage)


const port = Number(process.env.PORT) ?? 3000

app.listen(port, "0.0.0.0", ()=>console.log("Server started on Port", port))