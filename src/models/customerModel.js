import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    mobileNumber : {
        type : String,
        required : true
    },
    DOB : {
        type : String,
        required : true
    },
    emailID : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String,
        required : true
    },
    customerID : {
        type : String,
        required : true,
        unique : true
    },
    status : {
        type : String,
        default : 'active'
    }
}, {timestamps : true})

export default mongoose.model("customer", customerSchema);