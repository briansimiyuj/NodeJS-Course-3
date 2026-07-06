import fsPromises from "fs/promises"
import dotenv from "dotenv"
import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"
import path, { dirname, join } from "path"
import { fileURLToPath } from "url"

dotenv.config()

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

        const accessToken = JWT.sign(

            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "120s" }

        ),
        refreshToken = JWT.sign(

            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }

        )

        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username),
              currentUser = { ...foundUser, refreshToken }

        userDB.setUsers([...otherUsers, currentUser])

        await fsPromises.writeFile(usersFilePath, JSON.stringify(userDB.users, null, 2))

        res.cookie("JWT", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })

        res.json({ accessToken })

    }else{

        res.sendStatus(401)

    }

}

export { handleSignIn }