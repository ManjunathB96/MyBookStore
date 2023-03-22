import HttpStatus from 'http-status-codes';
import * as  WishlistService from '../services/wishlist.service'



/**
 * Controller to add book to wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const addBookToWishlist = async (req, res, next) => {
  console.log("wishlist  controller satrted");
 
  console.log("controller book id --->",req.params.bookId);
  console.log("controller user id --->",req.body.userId);
  try {
    const data = await WishlistService.addBookToWishlist(
      req.body.userId,
      req.params.bookId
    );
    console.log("controller data details --->",data);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Book is added to wishlist'
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'Already exixts inside wishlist'
      });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};



/**
 * Controller to get book from wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const getwishlist = async (req, res, next) => {
  try {
    const data = await WishlistService.getwishlist(req.body.userId);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Book fetched successsfully from wishlist'
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'Failed to fetch  wishlist'
      });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};



/**
 * Controller to add book to wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const removeBookFromWishlist = async (req, res, next) => {
  console.log("wishlist  controller satrted");
 
  try {
    const data = await WishlistService.removeBookFromWishlist(req.body.userId,req.params.bookId);
    console.log("controller data details --->",data);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Book is removed from wishlist'
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'Failed to remove book from wishlist'
      });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};