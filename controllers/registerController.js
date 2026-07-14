import bcrypt from "bcrypt"
import User from "../public/model/User.js"

const handleNewUser = async(req, res) =>{

    const { username, password, roles } = req.body

    if(!username || !password) return res.status(400).json({ "message": "Username and password are required." })

    const duplicate = await User.findOne({ "username": username }).exec()

    if(duplicate) return res.sendStatus(409) 

    try{
    
        const hashedPassword = await bcrypt.hash(password, 10)  
        
        const userData ={

            "username": username,
            "password": hashedPassword

        }

        if(roles) userData.roles = roles

        const newUser = await User.create(userData)

        res.status(201).json({

            "success": `New user ${newUser.username} created!`,
            "user":{

                "username": newUser.username,
                "roles": newUser.roles

            }

        })

    }catch(e){
    
        res.status(500).json({ "message": e.message })
    
    }

}

export { handleNewUser }