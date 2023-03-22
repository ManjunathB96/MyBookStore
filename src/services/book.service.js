import Book from '../models/book.model';

//to get all books
export const getAllBooks = async () => {
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
