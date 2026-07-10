import express from "express"
import path from "path"
import { createNewEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../../controllers/employeeController.js"
import verifyRoles from "../../middleware/verifyRoles.js"
import { rolesList } from "../../config/rolesList.js"

const employeesRouter = express.Router(),
      data = {}

employeesRouter.route("/")
    .get(getAllEmployees)

    .post(verifyRoles(rolesList.Admin, rolesList.Editor), createNewEmployee)

    .put(verifyRoles(rolesList.Admin, rolesList.Editor), updateEmployee)

    .delete(verifyRoles(rolesList.Admin), deleteEmployee)

employeesRouter.route("/:id")
    .get(getEmployee) 

export default employeesRouter