const whiteList = ["http://localhost:3000",  "https://www.google.com"],
        corsOptions ={

            origin: (origin, callback) =>{
                
                if(whiteList.indexOf(origin) !== -1 || !origin){

                    callback(null, true)

                }else{

                    callback(new Error("Not allowed by CORS"))

                }

            },

            optionsSuccessStatus: 200   
            
        }

export default corsOptions