import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

var router = express.Router();


//route to create a new user
router.post('', newUserValidator, userController.newRegistration);

//route to login user
router.post('/login',userController.login);

export default router;
