import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to get cart details
router.get('', userAuth, cartController.getBookFromCart);

//route to add book to cart
router.post('/add/book/:bookId', userAuth, cartController.addBookToCart);     //Here bookId we need to pass 

//route to remove from cart
router.post('/remove/book/:bookId',userAuth,cartController.removeBookFromCart)   //Here productID we neeed to pass


export default router;

