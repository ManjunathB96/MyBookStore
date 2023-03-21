import {Schema,model} from 'mongoose'


const wishlistSchema = new Schema({
    userId: {
        type: String
      },
      books: [
        {
          productID: {
            type: String
          },
          description: {
            type: String
          },
          bookName: {
            type: String
          },
          bookImage: {
            type: String
          },
          author: {
            type: String
          },
          price: {
            type: Number
          }
        }
      ],
      isPurchased: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: true
    }
  );
  
  export default model('Wishlist', wishlistSchema);
  