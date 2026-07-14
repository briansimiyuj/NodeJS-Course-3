import User from "../public/model/User.js"

const handleLogout = async(req, res) =>{

    const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(204) 

    const refreshToken = cookies.jwt,
          foundUser = await User.findOne({ refreshToken })

    if(!foundUser){

        res.clearCookie("jwt", refreshToken, { 
            httpOnly: true, 
            sameSite: "None", 
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000             
        })

        return res.sendStatus(204)

    }

    await User.findOneAndUpdate(

        { refreshToken },
        { refreshToken: "" }

    )

    res.clearCookie("jwt", refreshToken, { 
        httpOnly: true, 
        sameSite: "None", 
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000             
    })

    console.log('User has been logged out')

    res.sendStatus(204)

}

export default handleLogout