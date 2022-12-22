import express from 'express';
import { createCustumer, getCustomers, deleteCustomer} from '../controllers/customerController.js';
const router = express.Router();


router.post('/customers', createCustumer)
      .get('/customers', getCustomers)
      .delete('/customers/:customerID', deleteCustomer)

    
export default router;