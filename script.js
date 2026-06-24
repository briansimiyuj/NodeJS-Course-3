import fs from "fs"

const readStream = fs.createReadStream("./files/lorem.txt", { encoding: "utf-8" }),
      writeStream = fs.createWriteStream("./files/new-lorem-2.txt")

readStream.on("data", chunk =>{

    writeStream.write(chunk)
    
})

readStream.pipe(writeStream)