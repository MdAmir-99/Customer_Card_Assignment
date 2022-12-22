import customerModel from '../models/customerModel.js';
import { isValidField, isValidBody } from '../validations/globalValidation.js';
import { isValidName, isValidNumber, isValidDate, isValidEmail } from '../validations/customerValidation.js';
import { v4 as uuidv4 } from 'uuid';

const createCustumer = async ( req, res ) =>
{
    try
    {
        const data = req.body

        const { firstName, lastName, mobileNumber, DOB, emailID, address } = data;
        let { customerID } = data;

        customerID = uuidv4();

        if ( !isValidBody( data ) ) return res.status( 400 ).send( { status: false, message: "Please Enter Mandatory Details !" } )

        // <----------Name Validations-------------->

        if ( !firstName || !isValidName( firstName ) ) return res.status( 400 ).send( { status: false, message: "Please Enter Valid FirstName !" } );

        if ( !lastName || !isValidName( lastName ) ) return res.status( 400 ).send( { status: false, message: "Please Enter Valid LastName !" } );

        // <---------Mobile && Email Validation-------->

        if ( !mobileNumber || !isValidNumber( mobileNumber ) ) return res.status( 400 ).send( { status: false, message: "Please Enter Valid Mobile Number !" } );

        if ( !emailID || !isValidEmail( emailID ) ) return res.status( 400 ).send( { status: false, message: "Please Enter Valid Email ID !" } );

        const isExistData = await customerModel.findOne( { $or: [ { emailID }, { mobileNumber } ] } )

        if ( isExistData ) return res.status( 403 ).send( { status: false, message: "MobileNumber or Email is already registerd !" } )

        // <-----------DOB Validation-------------->
        if ( !DOB || !isValidDate( DOB ) ) return res.status( 400 ).send( { status: false, message: 'Please Enter a Valid DOB in DD-MM-YYYY format !' } )

        // <---------address Validation--------->
        if ( !address ) return res.status( 400 ).send( { status: false, message: "please Enter a valid address !" } )

        const passData = { firstName, lastName, mobileNumber, DOB, emailID, address, customerID }

        const customerData = await customerModel.create( passData );

        return res.status( 201 ).send( { status: true, data: customerData, message: "customer registered successfully !" } )



    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } );
    }
}

const getCustomers = async ( req, res ) =>
{
    try
    {

        const customersData = await customerModel.find( { status: 'active' } );

        if ( customersData.length === 0 )
            return res.status( 400 ).send( { status: false, message: "No Record Found !" } )

        return res.status( 200 ).send( { status: true, data: customersData } );

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } );
    }
}

const deleteCustomer = async ( req, res ) =>
{
    try
    {

        const { customerID } = req.params;

        const updateStatus = 'inactive';

        const isCustomerExist = await customerModel.findOne( { $and: [ { customerID }, { status: 'active' } ] } )

        if ( !isCustomerExist )
            return res.status( 404 ).send( { status: false, message: `No Customer Found with this ${ customerID } ID !` } )

        const deleteCustomer = await customerModel.findOneAndUpdate( { customerID }, { $set: { status: updateStatus } }, { new: true } );

        return res.status( 200 ).send( { status: true, message: "Data Deleted Successfully ! ", data: deleteCustomer } );

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } );
    }

}

export { createCustumer, getCustomers, deleteCustomer }