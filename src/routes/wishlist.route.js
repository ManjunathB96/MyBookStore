import express from 'express'
import { userAuth } from '../middlewares/auth.middleware';
import * as wishlistController from '../controllers/wishlist.controller'
const router=express.Router();


//route to add book to wishlist
router.post('/add/book/:bookId',userAuth,wishlistController.addBookToWishlist)


//route to get wishlist
router.get('',userAuth,wishlistController.getwishlist)

export default router;

