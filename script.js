import { logger, logEvents } from "./middleware/logEvents.js"
import EventEmitter from "events"
import cors from "cors"
import http from "http"
import path, { dirname, join } from "path"
import fs from "fs"
import express from "express"
import { fileURLToPath } from "url"
import errorHandler from "./middleware/errorHandler.js"
import rootRouter from "./routes/root.js"
import employeesRouter from "./routes/api/employees.js"
import corsOptions from "./config/corsOptions.js"
import registerRouter from "./routes/register.js"
import authRouter from "./routes/auth.js"
import verifyJWT from "./middleware/verifyJWT.js"

const emitter = new EventEmitter(),
      PORT = process.env.PORT || 3000,
      __fileName = fileURLToPath(import.meta.url),
      __dirName = dirname(__fileName)

const app = express()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(express.static(join(__dirName, "public")))

app.use("/", rootRouter)

app.use("/register", registerRouter)

app.use("/auth", authRouter)

app.use(verifyJWT)

app.use("/employees", employeesRouter)

app.use((req, res) =>{

    res.status(404).sendFile(join(__dirName, "views/404.html"))

})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))