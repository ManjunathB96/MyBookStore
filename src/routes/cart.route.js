import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get cart details
router.get('', userAuth, cartController.getBookFromCart);

//route to add book to cart
router.post('/add_book/:bookId', userAuth, cartController.addBookToCart);     //Here bookId we need to pass 

//route to remove from cart
router.post('/remove_book/:bookId',userAuth,cartController.removeBookFromCart)   //Here productID we neeed to pass

//route to purchase cart books
router.post('/purchase/:_id', userAuth, cartController.purchaseBookById);         //here CartId is required

export default router;

