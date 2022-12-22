import express from 'express';
import { createCard, getCard } from '../controllers/cardController.js';
const router = express.Router();


router.post('/:customerID', createCard)
      .get('/', getCard)
      

    
export default router;