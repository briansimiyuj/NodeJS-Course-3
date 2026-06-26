import logEvents from "./logEvents.js"
import EventEmitter from "events"
import http from "http"
import path from "path"
import fs from "fs"
import express from "express"

const emitter = new EventEmitter(),
      PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) =>{

    res.send('Hello World')
    
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))