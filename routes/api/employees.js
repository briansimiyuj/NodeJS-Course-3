import express from "express"
import path from "path"
import employees from "../../public/data/employees.json" with { type: "json" }

const employeesRouter = express.Router(),
      data = {}

employeesRouter.route("/")
    .get((req, res) =>{
    
       res.json(employees)
    
    })

    .post((req, res) =>{

        res.json({
            
            "firstName": req.body.firstName,
            "lastName": req.body.lastName

        })

    })

    .put((req, res) =>{

        res.json({

            "firstName": req.body.firstName,
            "lastName": req.body.lastName
            
        })

    })

    .delete((req, res) =>{
        
        res.json({ "_id": req.body.id })

    })

employeesRouter.route("/:id")
    .get((req, res) =>{
    
       res.json({ "_id": req.params.id })
    
    }) 

export default employeesRouter