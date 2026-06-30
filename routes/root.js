import path, { join, dirname } from "path"
import express from "express"
import { fileURLToPath } from "url"


const rootRouter = express.Router(),
        fileName = fileURLToPath(import.meta.url),
      __dirName = dirname(fileName)

rootRouter.get("/", (req, res) =>{

    res.sendFile(join(__dirName, "../views/index.html"))

})

export default rootRouter