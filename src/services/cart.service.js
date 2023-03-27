import Cart from '../models/cart.model';
import * as BookService from '../services/book.service';

//adding book to cart
export const addBookToCart = async (userID, bookId) => {
  const book = await BookService.getSingleBook(bookId);
  if (!book && book.quantity <= 1) {
    throw new Error('Book Not Available  or  Book Out of Stock');
  }
  let cart = await Cart.findOne({ userId: userID, isPurchased: false });

  if (!cart) {
    cart = await Cart.create({
      userId: userID,
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

    newCart = Cart.updateOne({ _id: cart._id }, { $inc: bookObj });
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
  const data = await Cart.findOne({ userId: userID, isPurchased: false });
  return data;
};

//remove book from cart
export const removeBookFromCart = async (userID,bookId,isAllBooks = false) => {
  const book = await BookService.getSingleBook(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  console.log('book details', book);
  var cart = await Cart.findOne({ userId: userID });
  console.log('Book present in cart ==--->', cart);
  if (!cart) {
    throw new Error('cart is not available');
  }
  let bookExisting = false;

  let idx;
  console.log('details', cart.books);
  for (idx = 0; idx < cart.books.length; idx++) {
    if (cart.books[idx].productID == bookId) {
      bookExisting = true;
      break;
    }
  }
  let newCart;
  if (bookExisting) {
    console.log('idx  --->', idx);
    if (
      cart.books[idx].quantity == 1 ||
      cart.books[idx].quantity == 0 ||
      isAllBooks
    ) {
      newCart = Cart.updateOne(
        { _id: cart._id },
        {
          $pull: {
            books: {
              productID: book.id
            }
          },
          $inc: {
            cartTotal: -(book.price * cart.books[idx].quantity)
          }
        }
      );
    } else {
      const bookObj = {};
      bookObj['books.' + idx + '.quantity'] = -1;
      bookObj['cartTotal'] = -book.price;
      newCart = Cart.updateOne({ _id: cart._id }, { $inc: bookObj });
    }
  }
  return newCart;
};

// Purchase By Id from cart
export const purchaseBookById = async (_id, userId) => {
  const myPurchase = await Cart.findByIdAndUpdate({
    _id: _id,
    userId: userId,
    isPurchased: true
  });
  if (!myPurchase) {
    throw new Error('Enter valid userId');
  }
  return myPurchase;
};
