const mongoose = require('mongoose');
const config = require('../config/database');

// Customer Schema
const customerSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true

    },
    middleName: {
        type: String,
        required: true

    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
});


const Customer = module.exports = mongoose.model('Customer', customerSchema);

module.exports.getCustomerByFirstName = function(firstName, callback) {
    const query = { firstName: firstName }
    Customer.findOne(query, callback);
}
module.exports.addCustomer = function(newCustomer, callback) {
    newCustomer.save(callback);
}

module.exports.updateCustomerById = function(data, callback) {
    console.log(data);
    Customer.updateOne({
            id: data.id
        }, {
            $set: {
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                email: data.email,
                age: data.age
            }
        },
        callback
    )
}

module.exports.DeleteCustomer = function(data, callback) {
    Customer.deleteOne({ id: data.id }, {}, callback);
}