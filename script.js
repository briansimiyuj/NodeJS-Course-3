import { logger, logEvents } from "./middleware/logEvents.js"
import EventEmitter from "events"
import cors from "cors"
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

app.use(logger)

const whiteList = ["http://localhost:3000",  "https://www.google.com"],
        corsOptions ={

            origin: (origin, callback) =>{
                
                if(whiteList.indexOf(origin) !== -1 || !origin){

                    callback(null, true)

                }else{

                    callback(new Error("Not allowed by CORS"))

                }

            },

            optionsSuccessStatus: 200   
            
        }

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(express.static(join(__dirName, "public")))

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

app.use((err, req, res, next) =>{

    console.error(err.stack)

    res.status(500).send(err.message)
    
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))