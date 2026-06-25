import logEvents from "./logEvents.js"
import EventEmitter from "events"
import http from "http"
import path from "path"

const emitter = new EventEmitter(),
      PORT = process.env.PORT || 3000

const server = http.createServer((req, res) =>{

    res.writeHead(200, {"Content-Type": "text/html"})

    res.end(`<h1>Hello World</h1>`)

    console.log(`Request method: ${req.method}, Request URL: ${req.url}`)

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))