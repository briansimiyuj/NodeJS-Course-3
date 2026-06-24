import fs from "fs"

fs.mkdir("newFolder", err =>{

    if(err) throw err

    console.log("Folder Created")

})