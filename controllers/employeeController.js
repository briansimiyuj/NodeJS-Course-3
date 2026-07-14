import Employee from "../public/model/Employee.js"

const getAllEmployees = (req, res) =>{
    
    res.json(employees)
    
}

const getEmployee = (req, res) =>{
    
    const employee = data.employees.find(employee => employee._id === parseInt(req.body.id))

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

const updateEmployee = (req, res) =>{

    const employee = data.employees.find(employee => employee._id === parseInt(req.body.id))

    if(!employee){
        
        return res.status(400).json({ "message": `Employee ${req.body.id} not found` })

    }

    if(req.body.firstName){

        employee.firstName = req.body.firstName

    }

    if(req.body.lastName){

        employee.lastName = req.body.lastName

    }

    const filteredArray = data.employees.filter(employee => employee._id !== parseInt(req.body.id)),
          unsortedArray = [...filteredArray, employee]

    data.setEmployees(unsortedArray.sort((a, b) => a._id > b._id ? 1 : a._id < b._id ? -1 : 0))

    res.json(data.employees)

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