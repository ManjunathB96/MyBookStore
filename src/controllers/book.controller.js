import HttpStatus from 'http-status-codes';

import * as BookService from '../services/book.service';

/**
 * Controller to get all books available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 * */
export const getAllBooks = async (req, res, next) => {
  try {
    const data = await BookService.getAllBooks(req);
    console.log('getAllBooks__', data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All books fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to search a book based on title
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const searchBook= async (req,res,next) =>{
  console.log("search book req",req.query.bookName);
  try {
    const data = await BookService.searchBook(req)
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
}



// Sort book high to low
export const sortBooks = async (req, res, next) => {
  try {
    const data = await BookService.sortBooks(req);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Books is sorted'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};


/**
 * Controller to get a single book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getSingleBook = async (req, res, next) => {
  try {
    const data = await BookService.getSingleBook(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};




/**
 * Controller for book review
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 * */
export const customerReview = async (req, res, next) => {
  try {
    const data = await BookService.customerReview(req.params.bookId,req.body);
    console.log('customerReview controller --->', data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Review  successfully added'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};



