import cardModel from '../models/cardModel.js';
import customerModel from '../models/customerModel.js';
import { isValidEnum } from '../validations/cardValidation.js';

const createCard = async ( req, res ) =>
{

    try
    {
        const id = req.params.customerID
        const { cardType, vision } = req.body;
        let cardNumber;
        let customerName;

        // <-------cardName Validation AutoIncreament--------->
        const baseNumber = 'CRN';
        const number = await cardModel.find( { customerID: id } ).count();

        let isCardExist = false;

        number === 0 ? cardNumber = `${ baseNumber }_${ number }` : isCardExist = true;

        if ( isCardExist )
            return res.status( 403 ).send( { status: false, message: "Card Already Added into your Account !" } )


        // <---------CardType Validations--------->
        if ( !cardType || !isValidEnum( cardType ) )
            return res.status( 400 ).send( { status: false, message: "Please Select Valid Card Type regular/special !" } )

        // <----------DB Call for getting customerName----------->
        const customerData = await customerModel.aggregate( [
            { $match: { customerID: id, status: 'active' } },
            { $project: { firstName: 1, lastName: 1, _id: 0 } }
        ] );


        if ( customerData.length === 0 )
            return res.status( 400 ).send( { status: false, message: `This ${ id } CustomerID is Invalid !` } )

        customerName = `${ customerData[ 0 ]?.firstName } ${ customerData[ 0 ]?.lastName }`;

        const customerID = id.toString();

        if ( !vision )
            return response.status( 400 ).send( { status: false, message: "Please Enter Vision !" } )

        const passData = { customerName, cardNumber, customerID, cardType, vision };


        const insertCard = await cardModel.create( passData );

        return res.status( 201 ).send( { status: true, message: "Card Added successfully !", data: insertCard } )

    } catch ( error )
    {

        return res.status( 500 ).send( { status: false, message: error.message } );

    }
}

const getCard = async ( req, res ) =>
{

    try
    {
        // <-----------Join Two Collection and Getting Data Using Aggregation------------->
        const cardList = await cardModel.aggregate( [
            { $match: { status: 'active' } },
            {
                $lookup: {
                    from: "customers",
                    localField: "customerID",
                    foreignField: "customerID",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                firstName: 1,
                                lastName: 1,
                                mobileNumber: 1,
                                DOB: 1,
                                emailID: 1,
                                address: 1,
                                status: 1
                            }
                        }
                    ],
                    as: "customer_docs"
                }
            },
            { $sort: { customerName: 1 } }
        ] );

        if ( cardList.length === 0 )
            return res.status( 404 ).send( { status: false, message: "No Card Found !" } )

        return res.status( 200 ).send( { status: true, message: "Card Found Successfully", data: cardList } );

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } );
    }
}

export { createCard, getCard };