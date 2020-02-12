const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const History = require('../models/history');
const Customer = require('../models/customer');
const config = require('../config/database');
const passport = require('passport');
const jwt = require('jsonwebtoken');


// Product
router.post('/product', (req, res) => {
        let newProduct = new Product({
            id: req.body.id,
            productName: req.body.productName,
            quantity: req.body.quantity,
            price: req.body.price

        })
        Product.addProduct(newProduct, (err, Product) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register Product' });
            } else {
                res.json({ success: true, msg: 'Product Registered' });
            }
        })
    })
    // History
router.post('/history', (req, res) => {
        let newHistory = new History({
            id: req.body.id,
            productName: req.body.productName,
            customerName: req.body.customerName,
            totalPrice: req.body.totalPrice,
            cash: req.body.cash,
            change: req.body.change,
            timeStamp: req.body.timeStamp

        })
        History.addHistory(newHistory, (err, Product) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register new History' });
            } else {
                res.json({ success: true, msg: 'History Registered' });
            }
        })
    })
    // Get All Product
router.get('/product', exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving products."
            });
        });
});
// Get All History
router.get('/history', exports.findAll = (req, res) => {
    History.find()
        .then(history => {
            res.send(history);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving the History."
            });
        });
});
// Get All Customer
router.get('/customer', exports.findAll = (req, res) => {
    Customer.find()
        .then(customers => {
            res.send(customers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving products."
            });
        });
});
// Update a product based on ID
router.put('/updateProduct', (req, res) => {
        Product.updateProductById(req.body, (err, product) => {
            if (err) throw err;
            if (!product) {
                return res.json({ success: false, msg: 'Product not found' });
            }
            if (product) {
                return res.json({ success: true, msg: 'Product Found' })
            }
        })
    })
    // Delete a product based on ID
router.put('/deleteProduct', (req, res) => {
        Product.DeleteProduct(req.body, (err, product) => {
            if (err) throw err;
            if (!product) {
                return res.json({ success: false, msg: 'Product not found' });
            } else {
                return res.json({ success: true, msg: 'Product found' });
            }
        })
    })
    // Delete a History based on ID
router.put('/deleteHistory', (req, res) => {
    History.DeleteHistory(req.body, (err, history) => {
        if (err) throw err;
        if (!history) {
            return res.json({ success: false, msg: 'Product not found' });
        } else {
            return res.json({ success: true, msg: 'Product found' });
        }
    })
})
module.exports = router;