import express from "express"
import path from "path"
import { createNewEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../../controllers/employeeController.js"

const employeesRouter = express.Router(),
      data = {}

employeesRouter.route("/")
    .get(getAllEmployees)

    .post(createNewEmployee)

    .put(updateEmployee)

    .delete(deleteEmployee)

employeesRouter.route("/:id")
    .get(getEmployee) 

export default employeesRouter