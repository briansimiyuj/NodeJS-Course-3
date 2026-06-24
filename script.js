import fs from "fs"

fs.writeFile("./files/reply.txt", "This is a new file", err =>{

    if(err) throw err

    console.log("File has been written")

    fs.appendFile("./files/reply.txt", "\n\n This is a new line", err =>{

        if(err) throw err

        console.log("File has been appended")

        fs.rename("./files/reply.txt", "./files/replied.txt", err =>{

            if(err) throw err

            console.log("File has been renamed")
            
        })
        
    })

})