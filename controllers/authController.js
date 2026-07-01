import fsPromises from "fs/promises"
import bcrypt from "bcrypt"
import path, { dirname, join } from "path"
import { fileURLToPath } from "url"

const __fileName = fileURLToPath(import.meta.url),
      __dirName = path.dirname(__fileName),
      usersFilePath = join(__dirName, "../public/model/employees.json")

const userDB ={

    users: JSON.parse(await fsPromises.readFile(usersFilePath, "utf-8")),
    setUsers: function(data){ this.users = data }

}

const handleSignIn = async(req, res) =>{

    const { username, password } = req.body

    if(!username || !password) return res.status(400).json({ "message": "Username and password are required." })

    const foundUser = userDB.users.find(person => person.username === username)

    if(!foundUser) return res.sendStatus(401)

    const match = await bcrypt.compare(password, foundUser.password)

    if(match){

        res.json({ "success": `User ${username} signed in!` })

    }else{

        res.sendStatus(401)

    }

}

export { handleSignIn }