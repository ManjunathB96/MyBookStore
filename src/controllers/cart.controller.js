import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';


/**
 * Controller to add book to cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addBookToCart = async (req, res, next) => {
  try {
    const data = await CartService.addBookToCart(req.body.userID, req.params.bookId);
    if(data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Cart created successfully'
      });
    }else{
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: 'Cart is not created'
          }); 
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
  }
};


