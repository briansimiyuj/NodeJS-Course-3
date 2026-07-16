import jwt from "jsonwebtoken"
import User from "../public/model/User.js"

const handleRefreshToken = async(req, res) =>{

    const cookies = req.cookies 

    if(!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt
    
    res.clearCookie("jwt", refreshToken, { 
        httpOnly: true, 
        sameSite: "None", 
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000             
    })
    
    const foundUser = await User.findOne({ refreshToken }).exec()

    if(!foundUser){

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, decoded) =>{

            if(err) return res.sendStatus(403)

            const hackedUser = await User.findOne({ username: decoded.username }).exec()

            hackedUser.refreshToken = []

            const result = await hackedUser.save()

            console.log(result)

        })
        
        return res.sendStatus(403)

    }

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