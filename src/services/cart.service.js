import Cart from '../models/cart.model';
import * as BookService from '../services/book.service';

//add book to cart
export const addBookToCart = async (userID, bookId) => {
  const book = await BookService.getSingleBook(bookId);
  if (!book) {
    throw new Error('Book not available');
  }
  if (book.quantity <= 1) {
    throw new Error('Book Out of Stock');
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
};
