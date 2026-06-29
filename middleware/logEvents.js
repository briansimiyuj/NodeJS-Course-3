import { format }  from "date-fns"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import fsPromises from "fs/promises"

const logEvents = async(message, logName) =>{

    const dateTime = `${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")}`,
          logItem = `${dateTime}\t${uuidv4()}\t${message}\n`
    
    console.log(logItem)

    try{

        await fsPromises.mkdir("./logs", { recursive: true }) 

    
        await fsPromises.appendFile(`./logs/${logName}.log`, `${logItem}\n`)
    
    }catch(e){
    
        console.error(e)
    
    }

}

export default logEvents