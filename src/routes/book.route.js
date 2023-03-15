import express from 'express';
const router = express.Router();
import * as bookController from '../controllers/book.controller';
import { userAuth } from "../middlewares/auth.middleware";


//route to get all books
router.get('',userAuth,bookController.getAllBooks);

//route to get a single book by id
router.get('/:_id',userAuth,bookController.getSingleBook);


export default router;





