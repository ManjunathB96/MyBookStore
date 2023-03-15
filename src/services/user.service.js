import User from '../models/user.model';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';


//create new user : using user model
export const newRegistration = async (body) => {
  if (body.password !== body.confirm_password) {
    throw new Error(
      'Password not matching re-enter password and confirm password'
    );
  }
  const result = await User.findOne({ email: body.email });
  console.log('result servise ', result);
  if (result == null) {
    const saltRounds = 10;
    const hashpassword = bcrypt.hashSync(body.password, saltRounds);
    body.password = hashpassword;
    const data = await User.create(body);
    console.log('service data ==>', data);

    return data;
  } else {
    throw new Error('User already registered');
  }
};