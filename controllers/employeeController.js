import employeesData from "../public/model/employees.json" with { type: "json" }

let employees = employeesData

const data ={

    employees: employees,
    setEmployees: newData => employees = newData

}

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

const createNewEmployee = (req, res) =>{

    const newEmployee ={

        "_id": data.employees[data.employees.length - 1]._id + 1,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName

    }

    if(!newEmployee.firstName || !newEmployee.lastName){

        return res.status(400).json({ "message": "First name and last name are required." })

    }

    data.setEmployees([...data.employees, newEmployee])

    res.json(data.employees)

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