const mongoose = require('mongoose');
const config = require('../config/database');

// Customer Schema
const historySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    productName: {
        type: Array,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    cash: {
        type: Number,
        required: true
    },
    change: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    }
});


const History = module.exports = mongoose.model('History', historySchema);

module.exports.addHistory = function(newHistory, callback) {
    newHistory.save(callback);
}

// module.exports.updateHistoryById = function(data, callback) {
//     console.log(data);
//     History.updateOne({
//             id: data.id
//         }, {
//             $set: {
//                 firstName: data.firstName,
//                 middleName: data.middleName,
//                 lastName: data.lastName,
//                 email: data.email,
//                 age: data.age
//             }
//         },
//         callback
//     )
// }

module.exports.DeleteHistory = function(data, callback) {
    History.deleteOne({ id: data.id }, {}, callback);
}