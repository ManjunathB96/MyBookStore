import Wishlist from '../models/wishlist.model';
import * as BookService from '../services/book.service';

export const addBookToWishlist = async (userId, bookId) => {
const book = await BookService.getSingleBook(bookId);
  if (!book && book.quantity <= 1) {
    throw new Error('Book Not Available  or  Book Out of Stock');
  }

  const wishBook = await Wishlist.findOne({userId: userId,isPurchased: false});

  console.log("service wishlist details --->",wishBook);
  if (!wishBook) {
    const wishlistBook = await Wishlist.create({
      userId: userId,
      books: [
        {
          productID: book._id,
          description: book.description,
          bookName: book.bookName,
          author: book.author,
          price: book.price
        }
      ]
    });
    return wishlistBook;
  }
  let wishlistHasBook = false;
  for (let idx = 0; idx < wishBook.books.length; idx++) {
    if(wishBook.books[idx].productID == book._id){
      wishlistHasBook = true;
      break;
    }
  }
  let newWishlist;
  if(!wishlistHasBook){
    newWishlist = Wishlist.updateOne(
      {
        _id: wishBook._id
      },
      {
        $push: {
          books: {
            productID: book._id,
            description: book.description,
            bookName: book.bookName,
            author: book.author,
            price: book.price
          }
        }
      }
    );
  }
  return newWishlist;
};


//get all books present in wishlist
export const getwishlist = async(userId)=>{
  const books= await Wishlist.find({userId:userId})
  return books
}