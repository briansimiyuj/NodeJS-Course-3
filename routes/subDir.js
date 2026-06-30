import express from "express"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const router = express.Router(),
            __fileName = fileURLToPath(import.meta.url),
            __dirName = dirname(__fileName)

router.get("/", (req, res) =>{

    res.sendFile(path.join(__dirName, "../views/subdir/index.html"))
     
})

router.get("/test", (req, res) =>{

    res.sendFile(path.join(__dirName, "../views/subdir/test.html"))
    
})

export default router