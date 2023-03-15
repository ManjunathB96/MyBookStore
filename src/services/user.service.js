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

//login :the user info will get from email
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  console.log(data);
  if (data) {
    const isMatch = bcrypt.compareSync(body.password, data.password);
    if (isMatch) {
      const token = jwt.sign(
        { email: data.email, id: data._id },
        process.env.SECRET_KEY
      );
      return token;
    } else {
      throw new Error('Invalid Password');
    }
  } else {
    throw new Error('Invalid Email');
  }
};

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJiZWxhZ2F2aTYxMjNAZ21haWwuY29tIiwiaWQiOiI2NDEwNGEyYjhjNmQyNjQ4YTA3MGNjZGIiLCJpYXQiOjE2Nzg4NDQ2MDV9.ttcU5n2RuxVI-_X_lLL0qm1Sfjt2FZQb4IGOqmX_jwU
*/