import User from "../public/model/User.js"

const handleLogout = async(req, res) =>{

    const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(204) 

    const refreshToken = cookies.jwt,
          foundUser = await User.findOne({ refreshToken })

    if(!foundUser){

        res.clearCookie("jwt", { 
            httpOnly: true, 
            sameSite: "None", 
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000             
        })

        return res.sendStatus(204)

    }

    const results = await User.findOneAndUpdate(

        { _id: foundUser._id },
        { refreshToken: foundUser.refreshToken.filter(rt => rt !== refreshToken) },
        { new: true }

    )

    console.log('results:', results)

    console.log("Token removed:", !results.refreshToken.includes(refreshToken))


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