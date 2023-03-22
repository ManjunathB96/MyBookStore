import express from 'express'
import { userAuth } from '../middlewares/auth.middleware';
import * as wishlistController from '../controllers/wishlist.controller'
const router=express.Router();


//route to get wishlist
router.get('',userAuth,wishlistController.getwishlist)


//route to add book to wishlist
router.post('/add_book/:bookId',userAuth,wishlistController.addBookToWishlist)  //Here bookId we need to pass


//route to add book to wishlist
router.post('/remove_book/:bookId',userAuth,wishlistController.removeBookFromWishlist)    //Here ProductID we need to pass

export default router;

