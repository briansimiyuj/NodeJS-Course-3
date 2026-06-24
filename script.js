import fs from "fs"

const readStream = fs.createReadStream("./files/lorem.txt", { encoding: "utf-8" }),
      writeStream = fs.createWriteStream("./files/new-lorem.txt")

readStream.on("data", chunk =>{

    writeStream.write(chunk)
    
})