import fsPromises from "fs/promises"

const fileOps = async() =>{

    try{
    
        const data = await fsPromises.readFile("./files/starter.txt", "utf8")

        await fsPromises.unlink("./files/starter.txt")

        await fsPromises.writeFile("./files/promiseWrite.txt", "Jesus is the King of kings")

        await fsPromises.appendFile("./files/promiseWrite.txt", "\nJesus is the Lord of lords")

        await fsPromises.rename("./files/promiseWrite.txt", "./files/promiseRename.txt")

        const newData = await fsPromises.readFile("./files/promiseRename.txt", "utf8")

        console.log(newData)
    
    }catch(e){
    
        console.log(e)
    
    }

}

fileOps()