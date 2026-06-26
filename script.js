import logEvents from "./logEvents.js"
import EventEmitter from "events"
import http from "http"
import path from "path"
import fs from "fs"

const emitter = new EventEmitter(),
      PORT = process.env.PORT || 3000

const serveFile = async(filePath, contentType, response) =>{

    try{

        const rawData = await fs.promises.readFile(filePath, "utf-8")

        response.writeHead(200, { "Content-Type": contentType })

        response.end(rawData)

    }catch(err){

        console.log(err)

        response.statusCode = 500 

        response.end()

    }

}

const server = http.createServer((req, res) =>{

    const extension = path.extname(req.url)

    let contentType

    switch(extension){
        
        case ".css":

            contentType = "text/css"

        break

        case ".js":

            contentType = "text/javascript" 

        break   

        case ".json":

            contentType = "application/json"

        break

        case ".jpg":
 
            contentType = "image/jpeg"

        break

        case ".png":

            contentType = "image/png"

        break

        case ".txt":

            contentType = "text/plain"

        break

        default:

            contentType = "text/html"

    }

    let filePath = 
        contentType === "text/html" && req.url === "/" ? "views/index.html" :
        contentType === "text/html" && req.url.slice(-1) === "/" ? `views${req.url.slice(0, -1)}.html` :
        contentType === "text/html" ? `views${req.url}` : contentType === "text/html" ? `views${req.url}.html` : `.${req.url}`

    if(!extension && req.url.slice(-1) !== "/") filePath += ".html"

    const fileExists = fs.existsSync(filePath)

    if(fileExists){

        serveFile(filePath, contentType, res)

    }else{

        switch(path.parse(filePath).base){

            case "old-page.html":

                res.writeHead(301, { "Location": "/new-page.html" })

                res.end()

            break

            case "www-page.html":

                res.writeHead(301, { "Location": "/" })

            break

            default:

                serveFile("views/404.html", "text/html", res)

        }

    }

    emitter.emit("log", `${req.url} ${req.method}`)

    console.log(req.url, req.method, res.statusCode)

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))