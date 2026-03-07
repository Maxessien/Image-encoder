import express, { type Request, type Response } from "express";
import multer from "multer";
import { join } from "path";
import { decodeTextInImage, encodeTextInImage } from "./controllers/imageController.js";


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


app.use(express.static(join(process.cwd(), "../client/dist")));

// Serve SPA entry file for direct browser access.
app.get("/", async(req: Request, res: Response)=>res.sendFile(join(process.cwd(), "../client/dist/index.html")))

// Accept multipart image uploads for steganography operations.
app.post("/encode", upload.single("image"), encodeTextInImage)
app.post("/decode",  upload.single("image"), decodeTextInImage)


const port = Number(process.env.PORT) || 5050

console.log(port)

app.listen(port, "0.0.0.0", ()=>console.log("Server started on Port", port))