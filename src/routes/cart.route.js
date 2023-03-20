import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();



//route to add book to cart
router.post('/add_to_cart/:bookId', userAuth, cartController.addBookToCart);

//route to get cart details
router.get('', userAuth, cartController.getBookFromCart);

export default router;