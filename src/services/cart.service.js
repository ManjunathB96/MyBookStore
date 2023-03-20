import Cart from '../models/cart.model';
import * as BookService from '../services/book.service';

//adding book to cart
export const addBookToCart = async (userID, bookId) => {
  const book = await BookService.getSingleBook(bookId);
  if (!book && book.quantity <= 1) {
    throw new Error('Book Not Available  or  Book Out of Stock');
  }
  let cart = await Cart.findOne({ userID: userID, isPurchased: false });
  if (!cart) {
    cart = await Cart.create({
      userID: userID,
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
      cartTotal: book.price
    });
    return cart;
  }

  var isBookPresent = false;
  let idx;
  for (idx = 0; idx < cart.books.length; idx++) {
    if (cart.books[idx].productID == book._id) {
      isBookPresent = true;
      break;
    }
  }
  console.log('isBookPresent', isBookPresent);

  let newCart;
  if (isBookPresent) {
    const bookObj = {};
    bookObj['books.' + idx + '.quantity'] = 1;
    bookObj['cartTotal'] = book.price;
   
    newCart = Cart.updateOne(
      { _id: cart._id },
      {
        // $set: {books:{
        //     productID: book._id,
        //     description: book.description,
        //     bookName: book.bookName,
        //     author: book.author,
        //     quantity:1,
        //     price: book.price
        //   }
        // },

        $inc: bookObj

        // $inc: {
        //     cartTotal: book.price
        //   }
      }
    );
  } else {
    newCart = Cart.updateOne(
      { _id: cart._id },
      {
        $push: {
          books: {
            productID: book._id,
            description: book.description,
            bookName: book.bookName,
            author: book.author,
            quantity: 1,
            price: book.price
          }
        },
        $inc: {
          cartTotal: book.price
        }
      }
    );
  }
  return newCart;
};

//get user cart
export const getBookFromCart = async (userID) => {
  const data = await Cart.findOne({ userID: userID, isPurchased: false });
  return data;
};
