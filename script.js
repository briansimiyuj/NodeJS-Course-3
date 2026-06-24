import fs from "fs"

fs.writeFile("./files/reply.txt", "This is a new file", err =>{

    if(err) throw err

    console.log("File has been written")

})