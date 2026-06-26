import logEvents from "./logEvents.js"
import EventEmitter from "events"
import http from "http"
import path, { dirname, join } from "path"
import fs from "fs"
import express from "express"
import { fileURLToPath } from "url"

const emitter = new EventEmitter(),
      PORT = process.env.PORT || 3000,
      __fileName = fileURLToPath(import.meta.url),
      __dirName = dirname(__fileName)

const app = express()

app.get("/", (req, res) =>{

    res.sendFile(join(__dirName, "views/index.html"))
    
})

app.get(["/new-page", "/new-page.html"], (req, res) =>{

    res.sendFile(join(__dirName, "views/new-page.html"))

})

app.get(["/old-page", "/old-page.html"], (req, res) =>{

    res.redirect(301, '/new-page')

})

app.use((req, res) =>{

    res.status(404).sendFile(join(__dirName, "views/404.html"))

})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))