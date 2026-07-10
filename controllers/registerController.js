import express from "express"
import fsPromises from "fs/promises"
import path, { dirname, join } from "path"
import bcrypt from "bcrypt"
import users from "../public/model/employees.json" with { type: "json" }
import { fileURLToPath } from "url"

const __fileName = fileURLToPath(import.meta.url),
      __dirName = path.dirname(__fileName),
      usersFilePath = join(__dirName, "../public/model/employees.json")

const userDB ={

    users: JSON.parse(await fsPromises.readFile(usersFilePath, "utf-8")),
    setUsers: function(data){ this.users = data }

}


const handleNewUser = async(req, res) =>{

    const { username, password } = req.body

    if(!username || !password) return res.status(400).json({ "message": "Username and password are required." })

    const duplicate = userDB.users.find(person => person.username === username)

    if(duplicate) return res.sendStatus(409) 

    try{
    
        const hashedPassword = await bcrypt.hash(password, 10)  
        
        const newUser ={ 
            "username": username, 
            "password": hashedPassword,
            "roles": { "User": 2001 } 
        }

        userDB.setUsers([...userDB.users, newUser])

        await fsPromises.writeFile(

            usersFilePath,
            JSON.stringify(userDB.users)

        )

        console.log(userDB.users)

        res.status(201).json({ "success": `New user ${username} created!` })

    }catch(e){
    
        res.status(500).json({ "message": e.message })
    
    }

}

export { handleNewUser }