import HttpStatus from 'http-status-codes';
import * as CustomerService from '../services/customer.service';



/**
 * Controller to get a single customer
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCustomer = async (req, res, next) => {
  try {
    const data = await CustomerService.getCustomer(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Customer fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to add costomer detailes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addCustomerDetails = async (req, res, next) => {
  try {
    const data = await CustomerService.addCustomerDetails(req.body);
    console.log('customer details ----->', data);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Customer details added successfully'
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'Failed to add customer details'
      });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};