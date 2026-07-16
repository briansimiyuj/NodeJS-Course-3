import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../public/model/User.js"

const handleSignIn = async(req, res) =>{

    const { username, password } = req.body,
          cookie = req.cookies  

    if(!username || !password) return res.status(400).json({ "message": "Username and password are required." })

    const foundUser = await User.findOne({ username: username })

    if(!foundUser) return res.sendStatus(401)

    const match = await bcrypt.compare(password, foundUser.password)

    if(!match) return res.sendStatus(401)

    try{
    
        const roles = Object.values(foundUser.roles).filter(Boolean)

        const accessToken = JWT.sign(

            { "UserInfo": { "username": foundUser.username, "roles": roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "120s" }

        ),
        newRefreshToken = JWT.sign(

            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }

        ),
        newRefreshTokenArray = !cookie?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter(rt => rt !== cookie.jwt)

        if(cookie?.jwt){
            
            res.clearCookie("jwt", { 
                httpOnly: true, 
                sameSite: "None", 
                secure: true
            })

        }

        const results  = await User.findOneAndUpdate(

            { username },
            { refreshToken: [...newRefreshTokenArray, newRefreshToken]},
            { new: true }

        )

        console.log(results)

        res.cookie("jwt", newRefreshToken, { 
            httpOnly: true, 
            sameSite: "None", 
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000             
        })

        res.json({ accessToken })
    
    }catch(err){
    
        res.status(500).json({ "message": err.message })
    
    }

}

export { handleSignIn }