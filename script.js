import fs from "fs"

fs.writeFile("./files/reply.txt", "This is a new file", err =>{

    if(err) throw err

    console.log("File has been written")

})

fs.appendFile("./files/reply.txt", "This is a new line", err =>{

    if(err) throw err

    console.log("File has been appended")
    
})