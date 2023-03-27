import Book from '../models/book.model';
import * as BookService from '../services/book.service';

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
export const searchBook = async (req) => {
  const search = req.query.bookName;
  console.log('service -->', search);
  const isNumber = !isNaN(search);
  let searchObj;
  if (isNumber) {
    searchObj = {
      price: { $lte: search }
    };
  } else {
    searchObj = {
      $or: [
        { bookName: { $regex: '.*' + search + '.*', $options: 'i' } },
        { author: { $regex: '.*' + search + '.*', $options: 'i' } }
      ]
    };
  }
  const bookData = await Book.find(searchObj);
  console.log('book data', bookData);
  return bookData;
};

export const sortBooks = async (req) => {
  console.log('sort data --->', req.query);
  let sortObj = {
    [req.query.sort_key]: req.query.order == 'asc' ? 1 : -1
  };
  const data = await Book.find().sort(sortObj);

  if (!data) {
    throw new Error('Failed to sort');
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

//to get all  notes
export const customerReview = async (bookId, body) => {
  const book = await BookService.getSingleBook(bookId);
  if (!book) {
    throw new Error('Book Not Available ');
  }
  let books = await Book.findOne({ _id: bookId });
  if (!books) {
    books = await Book.create({
      userId: body.userId,
      books: [
        {
          productID: book._id,
          description: book.description,
          bookName: book.bookName,
          author: book.author,
          quantity: 1,
          price: book.price
        }
      ],
      cartTotal: book.price,
      ratings: [
        {
          userId: body.userId,
          description: body.description,
          ratings: body.ratings
        }
      ]
    });
    return books;
  }
  var isReviewExist = false;
  let idx;
  for (idx = 0; idx < books.ratings.length; idx++) {
    if (books.ratings[idx].userId == body.userId) {
      isReviewExist = true;
      break;
    }
  }

  let newbookRating;
  if (isReviewExist) {
    newbookRating = Book.updateOne(
      { _id: books._id },
      {
        $set: {
          ratings: {
            userId: body.userId,
            description: body.description,
            ratings: body.ratings
          }
        }
      }
    );
  } else {
    newbookRating = Book.updateOne(
      { _id: books._id },
      {
        $push: {
          ratings: {
            userId: body.userId,
            description: body.description,
            ratings: body.ratings
          }
        }
      }
    );
  }
  return newbookRating;
};
