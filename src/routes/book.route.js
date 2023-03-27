import express from 'express';
const router = express.Router();

import * as bookController from '../controllers/book.controller';
import { userAuth } from "../middlewares/auth.middleware";


//route to get all books
router.get('',userAuth,bookController.getAllBooks);


//route to search book
router.get('/search_book',userAuth,bookController.searchBook);


// sort book High to low
router.get('/sorting', userAuth, bookController.sortBooks);

//route to get a single book by id
router.get('/:_id',userAuth,bookController.getSingleBook);


//route for rating book
router.post('/customer_rating/:bookId',userAuth,bookController.customerReview)

export default router;





