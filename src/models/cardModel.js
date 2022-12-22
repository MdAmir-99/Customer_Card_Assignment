import mongoose from 'mongoose';
// const ObjectId = mongoose.Schema.Types.ObjectId;

const cardSchema = new mongoose.Schema({
    cardNumber : {
        type : String,
        required : true
    },
    cardType : {
        type : String,
        enum : ["regular", "special"]
    },
    customerName : {
        type : String,
        required : true 
    },
    status : {
        type : String,
        enum : ["active", "inactive"],
        default : "active"
    },
    vision : {
        type : String,
        required : true,
    },
    customerID : {
        type : String,
        ref : "customer",
        required : true
    }
}, {timestamps : true})

export default mongoose.model("card", cardSchema);
