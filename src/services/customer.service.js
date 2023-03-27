import Customer from '../models/customer.model';


export const addCustomerDetails = async (body) => {
  let customer = await getCustomer(body.userId);
  if(!customer){
    customer = await Customer.create({
      userId: body.userId,
      address: [{
        fullName: body.fullName,
        phoneNumber: body.phoneNumber,
        type: body.type,
        address: body.address,
        pinCode: body.pinCode,
        city: body.city,
        state: body.state,
      }]
    });
    return customer;
  }
  let newCustomer;
  if(body.addressIdx >= 0){
    const updateExistingAddress = {};
    updateExistingAddress[`address.${body.addressIdx}.fullName`] = body.fullName;
    updateExistingAddress[`address.${body.addressIdx}.phoneNumber`] = body.phoneNumber;
    updateExistingAddress[`address.${body.addressIdx}.type`] = body.type;
    updateExistingAddress[`address.${body.addressIdx}.address`] = body.address;
    updateExistingAddress[`address.${body.addressIdx}.pinCode`] = body.pinCode;
    updateExistingAddress[`address.${body.addressIdx}.city`] = body.city;
    updateExistingAddress[`address.${body.addressIdx}.state`] = body.state;
   
    newCustomer = await Customer.updateOne( { _id: customer._id }, {
        $set: updateExistingAddress
      });
  }else{
    newCustomer = await Customer.updateOne({_id: customer._id},{
        $push: {
          address: {
            fullName: body.fullName,
            phoneNumber: body.phoneNumber,
            type: body.type,
            address: body.address, 
            pinCode: body.pinCode,
            city: body.city,
            state: body.state,
          }
        }
      }
    );
  }
  return newCustomer;
};

//get single customer
export const getCustomer = async (userId) => {
  const data = await Customer.findOne({userId:userId});
  return data;
};