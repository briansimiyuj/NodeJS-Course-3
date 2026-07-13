import mongoose from "mongoose"

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    
    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    }

})

const Employee = mongoose.model("Employee", employeeSchema)

export default Employee