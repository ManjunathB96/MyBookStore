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
    const data = await BookService.getAllBooks();
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
