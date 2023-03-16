import Book from '../models/book.model';

//to get all  notes
export const getAllBooks = async () => {
  const data = await Book.find();
 

  if (!data) {
    throw new Error('Fetching  all books failed!');
  } else {
    return data;
  }
};

export const getSingleBook = async (_id) => {
  const data = await Book.findById(_id);

  if (!data) {
    throw new Error('Book is not available for this Id');
  } else {
    return data;
  }
};


