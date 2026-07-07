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

const handleLogout = async(req, res) =>{

    const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(204) 

    const refreshToken = cookies.jwt,
          foundUser = userDB.users.find(person => person.refreshToken === refreshToken)

    if(!foundUser){

        res.clearCookie("jwt", refreshToken, { 
            httpOnly: true, 
            sameSite: "None", 
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000             
        })

        return res.sendStatus(204)

    }

    const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken),
          currentUser = { ...foundUser, refreshToken: "" }

    userDB.setUsers([...otherUsers, currentUser])

    await fsPromises.writeFile(usersFilePath, JSON.stringify(userDB.users)) 

    res.clearCookie("jwt", refreshToken, { 
        httpOnly: true, 
        sameSite: "None", 
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000             
    })

    res.sendStatus(204)

}

export default handleLogout