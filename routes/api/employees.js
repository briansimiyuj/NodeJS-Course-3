import express from "express"
import path from "path"
import { createNewEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../../controllers/employeeController.js"
import verifyJWT from "../../middleware/verifyJWT.js"

const employeesRouter = express.Router(),
      data = {}

employeesRouter.route("/")
    .get(verifyJWT, getAllEmployees)

    .post(createNewEmployee)

    .put(updateEmployee)

    .delete(deleteEmployee)

employeesRouter.route("/:id")
    .get(getEmployee) 

export default employeesRouter