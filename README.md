## Problem Statement: Create two API’s which can perform the specified CRUD operations.The project structure should have models, middlewares, controllers and services. Write MongoDB queries to fetch, update, add or delete data from the specified collections. You can assume that the collections already exist in the database and just define the project structure. 

# Customer API
 1. Get all customers List with status ACTIVE [GET]
 2. Delete customer. [DELETE]
 3. Create new customer [POST]

# Card API 
 1. Get all Card List[GET] 
 2. Create new card [POST] 

# Customer collection Structure-:

    firstName : {type : String, required : true},
    lastName : { type : String, required : true},
    mobileNumber : { type : String, required : true},
    DOB : { type : String, required : true},
    emailID : { type : String, required : true, unique : true},
    address : { type : String, required : true},
    customerID : { type : String, required : true, unique : true},
    status : { type : String, default : 'active'}


# Card collection Structure-:

    cardNumber : { type : String, required : true},
    cardType : { type : String, enum : ["regular", "special"]},
    customerName : { type : String, required : true },
    status : { type : String, enum : ["active", "inactive"], default : "active"},
    vision : { type : String, required : true },
    customerID : { type : String, ref : "customer", required : true}

# for successful reponse structure should be

    {
        status : true,
        data : {},
        message : ""
    }

# for Error response structure should be

     {
        status : false,
        message : ""
    }

# [GET] cards response

    
{
  "status": true,
  "message": "Card Found Successfully",
  "data": [
    {
      "_id": "63a4adacc8799be0c0e27fd5",
      "cardNumber": "CRN_0",
      "cardType": "regular",
      "customerName": "Customer Name",
      "status": "active",
      "vision": "Demo Vision",
      "customerID": "2d0e5967-6f83-465e-9f58-09c2fb1b2a9f",
      "createdAt": "2022-12-22T19:19:08.082Z",
      "updatedAt": "2022-12-22T19:19:08.082Z",
      "__v": 0,
      "customer_docs": [
        {
          "firstName": "Customer",
          "lastName": "Name",
          "mobileNumber": "9999999999",
          "DOB": "01-01-1999",
          "emailID": "admin@gmail.com",
          "address": "Demo address",
          "status": "active"
        }
      ]
    }
  ]
}
    