import { Schema, model } from 'mongoose';

const addressSchema = new Schema(
  {
    userId: {
      type: String
    },
    address: [
      {
        fullName: {
          type: String
        },
        phoneNumber: {
          type: Number
        },
        type: {
          type: String
        },
        address: {
          type: String
        },
        pinCode: {
          type: Number
        },
        city: {
          type: String
        },
        state: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Address', addressSchema);
