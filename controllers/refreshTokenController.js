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

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, decoded) =>{

        if(err){

            foundUser.refreshToken = [...newRefreshTokenArray]

            const result = await foundUser.save()

            console.log(result)

        }

        if(err || foundUser.username !== decoded.username) return res.sendStatus(403)

        const roles = Object.values(foundUser.roles)

        const accessToken = jwt.sign(

            { "UserInfo": { "username": decoded.username, "roles": roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "120s" }

        )

        const newRefreshToken = JWT.sign(
        
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }

        )

        await User.findOneAndUpdate(

            { username },
            { refreshToken: [...newRefreshTokenArray, newRefreshToken]},
            { new: true }

        )

        res.cookie("jwt", newRefreshToken, { 
            httpOnly: true, 
            sameSite: "None", 
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000             
        })

        res.json({ accessToken })   

    })
    

}

export { handleRefreshToken }