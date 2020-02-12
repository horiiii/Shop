const mongoose = require('mongoose');
const config = require('../config/database');

// Product Schema
const productSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true

    },
    quantity: {
        type: Number,
        required: true

    },
    price: {
        type: Number,
        required: true
    }
});


const Product = module.exports = mongoose.model('Product', productSchema);

module.exports.getProductById = function(id, callback) {
    Product.findById(id, callback);
}
module.exports.getProductByProductName = function(productName, callback) {
    const query = { productName: productName }
    Product.findOne(query, callback);
}
module.exports.addProduct = function(newProduct, callback) {
    newProduct.save(callback);

}
module.exports.updateProductById = function(data, callback) {
    console.log(data);
    Product.updateOne({
            id: data.id
        }, {
            $set: {
                productName: data.productName,
                quantity: data.quantity,
                price: data.price,
            }
        },
        callback
    )
}

module.exports.DeleteProduct = function(data, callback) {
    Product.deleteOne({ id: data.id }, {}, callback);
}