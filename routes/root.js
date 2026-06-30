import path, { join, dirname } from "path"
import express from "express"
import { fileURLToPath } from "url"


const rootRouter = express.Router(),
        fileName = fileURLToPath(import.meta.url),
      __dirName = dirname(fileName)

rootRouter.get("/", (req, res) =>{

    res.sendFile(join(__dirName, "../views/index.html"))

})

rootRouter.get(["/new-page", "/new-page.html"], (req, res) =>{

    res.sendFile(join(__dirName, "../views/new-page.html"))

})

rootRouter.get(["/old-page", "/old-page.html"], (req, res) =>{

    res.redirect(301, '/new-page')

})

export default rootRouter