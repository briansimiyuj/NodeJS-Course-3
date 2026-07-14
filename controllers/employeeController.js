import Employee from "../public/model/Employee.js"

const getAllEmployees = async(req, res) =>{

    const employees = await Employee.find()
                        .sort({ _id: -1 })
    
    res.json(employees)
    
}

const getEmployee = async(req, res) =>{
    
    const employee = await Employee.findOne({ _id: req.params.id })

    if(!employee){

        return res.status(400).json({ "message": `Employee ${req.body.id} not found` })

    }

    res.json(employee)

}

const createNewEmployee = async(req, res) =>{

    const newEmployee = new Employee({

        "firstName": req.body.firstName,
        "lastName": req.body.lastName

    })

    if(!newEmployee.firstName || !newEmployee.lastName){

        return res.status(400).json({ "message": "First name and last name are required." })

    }

    await newEmployee.save()    
            .then(result => res.redirect("/"))
            .catch(err => console.log(err))

}

const updateEmployee = async(req, res) =>{

    const employee = await Employee.findOne({ _id: req.params.id })

    if(!employee){
        
        return res.status(400).json({ "message": `Employee ${req.body.id} not found` })

    }

    if(req.body.firstName){

        employee.firstName = req.body.firstName

    }

    if(req.body.lastName){

        employee.lastName = req.body.lastName

    }

    const ID = req.params.id,
          updatedEmployee = await Employee.findByIdAndUpdate(ID, employee, { new: true })

    if(!updatedEmployee) return res.status(400).json({ "message": `Employee ${req.body.id} not found` })

    res.json(updatedEmployee)

}

const deleteEmployee = ((req, res) =>{
        
    const employee = data.employees.find(employee => employee._id === parseInt(req.body.id))

    if(!employee){

        return res.status(400).json({ "message": `Employee ${req.body.id} not found` })

    }

    const filteredArray = data.employees.filter(employee => employee._id !== parseInt(req.body.id))

    data.setEmployees(...filteredArray)

    res.json(data.employees)

})

export { getAllEmployees, getEmployee, createNewEmployee, updateEmployee, deleteEmployee }