import employees from "../public/model/employees.json" with { type: "json" }

const getAllEmployees = (req, res) =>{
    
    res.json(employees)
    
}

const getEmployee = (req, res) =>{
    
    res.json({ "_id": req.params.id })

}

const createNewEmployee = (req, res) =>{

    res.json({
        
        "firstName": req.body.firstName,
        "lastName": req.body.lastName

    })

}

const updateEmployee = (req, res) =>{

    res.json({

        "firstName": req.body.firstName,
        "lastName": req.body.lastName
        
    })

}

const deleteEmployee = ((req, res) =>{
        
    res.json({ "_id": req.body.id })

})

export { getAllEmployees, getEmployee, createNewEmployee, updateEmployee, deleteEmployee }