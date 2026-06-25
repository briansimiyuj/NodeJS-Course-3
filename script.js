import logEvents from "./logEvents.js"
import EventEmitter from "events"

const emitter = new EventEmitter()

emitter.on("log", message => logEvents(message))

setTimeout(() =>{

    emitter.emit("log", "log event emitted")
    
}, 2000)