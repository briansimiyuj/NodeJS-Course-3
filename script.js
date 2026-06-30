import { logger, logEvents } from "./middleware/logEvents.js"
import EventEmitter from "events"
import cors from "cors"
import http from "http"
import path, { dirname, join } from "path"
import fs from "fs"
import express from "express"
import { fileURLToPath } from "url"
import errorHandler from "./middleware/errorHandler.js"
import router from "./routes/subDir.js"
import rootRouter from "./routes/root.js"
import employeesRouter from "./routes/api/employees.js"

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

app.use("/subdir", router)

app.use("/", rootRouter)

app.use("/employees", employeesRouter)

app.use((req, res) =>{

    res.status(404).sendFile(join(__dirName, "views/404.html"))

})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))