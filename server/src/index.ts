import express, { type Request, type Response } from "express";
import multer from "multer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { decodeTextInImage, encodeTextInImage } from "./controllers/imageController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

declare global {
    namespace Express{
        interface Request{
            file?: Multer.File
        }
    }
}

const upload = multer({dest: "/tmp/uploads"}) // Use /tmp for serverless environments


const app = express()
app.use(express.json())


app.use(express.static(join(__dirname, "public")));

// Accept multipart image uploads for steganography operations.
app.post("/encode", upload.single("image"), encodeTextInImage)
app.post("/decode",  upload.single("image"), decodeTextInImage)


// Serve SPA entry file for direct browser access.
app.get("*", async(req: Request, res: Response)=>res.sendFile(join(__dirname, "public/index.html")))

const port = Number(process.env.PORT) || 5050

console.log(port)

app.listen(port, "0.0.0.0", ()=>console.log("Server started on Port", "127.0.0.1:" + port))

export default app;