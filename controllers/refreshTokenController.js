import jwt from "jsonwebtoken"
import fsPromises from "fs/promises"
import path, { dirname, join } from "path"
import { fileURLToPath } from "url"

const __fileName = fileURLToPath(import.meta.url),
      __dirName = path.dirname(__fileName),
      usersFilePath = join(__dirName, "../public/model/employees.json")

const userDB ={

    users: JSON.parse(await fsPromises.readFile(usersFilePath, "utf-8")),
    setUsers: function(data){ this.users = data }

}

const handleRefreshToken = async(req, res) =>{

    const cookies = req.cookies 

    if(!cookies?.jwt) return res.sendStatus(401)

    console.log(cookies.jwt)

    const refreshToken = cookies.jwt,
          freshUsers = JSON.parse(await fsPromises.readFile(usersFilePath, "utf-8")),
          foundUser = freshUsers.find(person => person.refreshToken === refreshToken)

    if(!foundUser) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) =>{

        if(err || foundUser.username !== decoded.username) return res.sendStatus(403)

        const roles = Object.values(foundUser.roles)

        const accessToken = jwt.sign(

            { "UserInfo": { "username": decoded.username, "roles": roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "120s" }

        )

        res.json({ accessToken })   

    })
    

}

export { handleRefreshToken }