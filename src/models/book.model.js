import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    description: {
      type: String
    },
    discountPrice: {
      type: Number
    },
    bookImage: {
      type: String
    },
    admin_user_id: {
      type: String
    },
    bookName: {
      type: String
    },
    author: {
      type: String
    },
    quantity: {
      type: Number
    },
    price: {
      type: Number
    }
  },
  {
    timestamps: true,
    // collection: 'Book',
    // versionKey: false // to remove the "__v" :0 in response from db
  }
);

export default model('Books', bookSchema);


/**
 * 
 * _id
6214803b05253301a4fda584
description
"A visually stunning and comprehensive guide to the hit BBC series, She…"
discountPrice
450
bookImage
"http://books.google.com/books/publisher/content?id=FRboAwAAQBAJ&prints…"
admin_user_id
"616fdcc474dbc1000e41e655"
bookName
"Sherlock: Chronicles"
author
"Steve Tribe"
quantity
-5
price
800
createdAt
2022-01-10T12:06:34.065+00:00
updatedAt
2022-02-24T14:17:33.515+00:00
__v
0
 */
















// import { Schema, model } from 'mongoose';

// const bookSchema = new Schema({
//   description: {
//     type: String
//   },
//   discountPrice: {
//     type: Number
//   },
//   bookImage: {
//     type: String
//   },
//   bookName: {
//     type: String
//   },
//   author: {
//     type: String
//   },
//   quantity: {
//     type: Number,
//     default: 1
//   },
//   price: {
//     type: Number
//   }
// });

// export default model('Book', bookSchema, 'books');
