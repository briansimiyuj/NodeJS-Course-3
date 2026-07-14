import express from "express"
import path from "path"
import { createNewEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../../controllers/employeeController.js"
import verifyJWT from "../../middleware/verifyJWT.js"
import verifyRoles from "../../middleware/verifyRoles.js"
import { rolesList } from "../../config/rolesList.js"

const employeesRouter = express.Router(),
      data = {}

employeesRouter.route("/")
    .get(getAllEmployees)

    .post(verifyJWT, verifyRoles(rolesList.Admin, rolesList.Editor), createNewEmployee)

    .delete(verifyJWT, verifyRoles(rolesList.Admin), deleteEmployee)

employeesRouter.route("/:id")
    .get(getEmployee) 
    .put(verifyJWT, verifyRoles(rolesList.Admin, rolesList.Editor), updateEmployee)

export default employeesRouter