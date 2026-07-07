import dotenv from "dotenv"
import JWT from "jsonwebtoken"
import fsPromises from "fs/promises"
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

const handleRefreshToken = (req, res) =>{

    const cookies = req.cookies 

    if(!cookies?.JWT) return res.sendStatus(401)

    console.log(cookies.JWT)

    const refreshToken = cookies.JWT,
          foundUser = userDB.users.find(person => person.refreshToken === refreshToken)

    if(!foundUser) return res.sendStatus(403)

    JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) =>{

        if(err || foundUser.username !== decoded.username) return res.sendStatus(403)

        const accessToken = JWT.sign(

            { "username": decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "120s" }

        )

        res.json({ accessToken })   

    })
    

}

export { handleRefreshToken }