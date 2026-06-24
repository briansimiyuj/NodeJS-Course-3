import fs from "fs"

if(!fs.existsSync("newFolder")){

    fs.mkdir("newFolder", err =>{

        if(err) throw err

        console.log("Folder Created")

    })

}

if(fs.existsSync("newFolder")){

    fs.rmdir("newFolder", err =>{

        if(err) throw err

        console.log("Folder Deleted")

    })

}