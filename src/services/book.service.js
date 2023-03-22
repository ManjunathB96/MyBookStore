import Book from '../models/book.model';

export const getAllBooks = async (req) => {
  let { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 5;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;

  const data = await Book.find().limit(limit).skip(skip);
  //or
  // const data = await Book.find({},{},{limit:limit,skip:skip})

  if (!data) {
    throw new Error('Fetching  all books failed!');
  } else {
    return data;
  }
};

//to get single  book
export const getSingleBook = async (_id) => {
  const data = await Book.findById(_id);

  if (!data) {
    throw new Error('Book is not available for this Id');
  } else {
    return data;
  }
};
